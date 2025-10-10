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
    const radiusInMiles = 100; // Search radius set to 15 miles (adjust as needed)

    
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
