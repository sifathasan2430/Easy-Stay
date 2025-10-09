import dbConnect from '@/lib/dbConnect';
import { Property } from '@/models/propertie.models';
import '@/models/index'
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

// Removed 'next' import as it was unused and might cause issues.

export async function POST(request) {
    await dbConnect()
    try {
        const reqBody = await request.json();
        const user=await Property.create(reqBody)
        return NextResponse.json({ status: 'success', message:'Property created successfully',user }, { status: 201 });
    } catch (error) {
        // Log the error for debugging on the server side
        console.error("POST Error:", error.message);
        return NextResponse.json({ status: 'error', message: error.message }, { status: 400 });
    }
}

export async function GET(request) {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    
    // --- 1. Extract All Parameters (including location params) ---
    const search = searchParams.get("search") || "";
    const roomType = searchParams.get("roomType");
    const mostReviewed = searchParams.get("mostReviewed"); 
    const latitude = searchParams.get("latitude");
    const longitude = searchParams.get("longitude");
    
    // Pagination
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "8", 10); 
    const skipValue = (page - 1) * limit;
    const radiusInMiles = 15; // Search radius set to 15 miles (adjust as needed)

    
    // --- 2. Handle 'mostReviewed' Override (User's existing logic) ---
    if (mostReviewed) {
        const properties = await Property.find()
            .populate("hostId", "email")
            .populate("amenities")
            .sort({ reviews: -1 }) // Sort by reviews in descending order
            .limit(8);
        
        const total = await Property.countDocuments(); // Get total count for pagination info
        return NextResponse.json({ status: "success", data: properties, total });
    }
    
    // --- 3. Conditional Query Building: Geospatial vs. Standard ---

    let properties = [];
    let totalCount = 0;
    
    if (latitude && longitude) {
        // Case A: Geospatial Search (Uses Aggregation)
        
        // Match stage for filtering (like roomType) before skip/limit
        let matchCriteria = {};
        if (roomType) {
            matchCriteria.roomType = roomType;
        }

        const pipeline = [
            {
                $geoNear: {
                    near: { 
                        type: "Point", 
                        // MongoDB GeoJSON coordinates are [longitude, latitude]
                        coordinates: [parseFloat(longitude), parseFloat(latitude)] 
                    },
                    distanceField: "distance", // Output distance in meters
                    // maxDistance in meters (1 mile ≈ 1609.34 meters)
                    maxDistance: radiusInMiles * 1609.34, 
                    spherical: true,
                    // Apply filters directly to $geoNear query if needed, or use $match after
                    query: matchCriteria // Applying roomType filter here
                }
            },
            // Count total matching documents before pagination
            { $group: { _id: null, total: { $sum: 1 }, results: { $push: "$$ROOT" } } },
            // Deconstruct the group result to separate total and paged results
            { $unwind: "$results" }, 
            
            // --- Pagination ---
            { $skip: skipValue },
            { $limit: limit },

            // --- Manual Population ($lookup) ---
            // Populate hostId (assuming collection name 'users')
            {
                $lookup: {
                    from: 'users', 
                    localField: 'results.hostId',
                    foreignField: '_id',
                    as: 'results.hostId'
                }
            },
            // Unwind hostId
            { $unwind: { path: "$results.hostId", preserveNullAndEmptyArrays: true } },
            
            // Populate amenities (assuming collection name 'amenities')
            {
                $lookup: {
                    from: 'amenities', 
                    localField: 'results.amenities',
                    foreignField: '_id',
                    as: 'results.amenities'
                }
            },
            
            // Project the results back into a clean structure
            { $replaceRoot: { newRoot: "$results" } }
        ];

        
        const aggregationResult = await Property.aggregate(pipeline);
        
        // Re-run a simple count query for accurate total, as the aggregation above is complex
        // This is a common practice to get accurate total counts in GeoNear scenarios
        const countPipeline = [
            {
                $geoNear: {
                    near: { 
                        type: "Point", 
                        coordinates: [parseFloat(longitude), parseFloat(latitude)] 
                    },
                    distanceField: "distance", 
                    maxDistance: radiusInMiles * 1609.34, 
                    spherical: true,
                    query: matchCriteria
                }
            },
            { $count: "total" }
        ];

        const totalResult = await Property.aggregate(countPipeline);
        totalCount = totalResult.length > 0 ? totalResult[0].total : 0;
        properties = aggregationResult;

    } else {
        
        
        let findCriteria = {};

        if (search) {
            const searchRegex = new RegExp(search, 'i'); // Case-insensitive regex
            // Search across multiple relevant fields: city, address, title
            findCriteria.$or = [
                { city: searchRegex },
                { address: searchRegex },
                { title: searchRegex }
            ];
        }

        if (roomType) {
            // Apply roomType filter to standard search criteria
            findCriteria.roomType = roomType;
        }
        
        // 1. Get total count
        totalCount = await Property.countDocuments(findCriteria);
        
        // 2. Get paged results
        properties = await Property.find(findCriteria)
            .sort({ createdAt: -1 }) // Default sort by newest first
            .skip(skipValue)
            .limit(limit)
            .populate("hostId", "email") 
            .populate("amenities"); 
    }
    
    
    return NextResponse.json({ 
        status: "success", 
        data: properties,
        total: totalCount,
        page,
        limit
    });
}
