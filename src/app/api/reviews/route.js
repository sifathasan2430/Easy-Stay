import dbConnect from "@/lib/dbConnect";
import { Review } from "@/models/review.models";

// GET: Fetch reviews by propertyId
// export async function GET(req) {
//     try {
//         await dbConnect();

//         const url = new URL(req.url);
//         const propertyId = url.searchParams.get("propertyId");

//         if (!propertyId) {
//             return new Response(JSON.stringify({ error: "propertyId is required" }), { status: 400 });
//         }

//         const reviews = await Review.find({ propertyId })
//             .populate("userId", "fullName email")
//             .sort({ createdAt: -1 });

//         // Map reviews to include userName if populated
//         const formattedReviews = reviews.map((r) => ({
//             _id: r._id,
//             propertyId: r.propertyId,
//             bookingId: r.bookingId,
//             userId: r.userId?._id,
//             userName: r.userId?.fullName || "Anonymous",
//             rating: r.rating,
//             comment: r.comment,
//             photos: r.photos || [],
//             adminReply: r.adminReply || "",
//             createdAt: r.createdAt,
//         }));

//         return new Response(JSON.stringify(formattedReviews), {
//             status: 200,
//             headers: { "Content-Type": "application/json" }
//         });
//     } catch (err) {
//         console.error("GET /reviews error:", err);
//         return new Response(JSON.stringify({ error: "Failed to fetch reviews" }), { status: 500 });
//     }
// }

// GET: Fetch reviews by propertyId + average rating
export async function GET(req) {
    try {
        await dbConnect();

        const url = new URL(req.url);
        const propertyId = url.searchParams.get("propertyId");

        if (!propertyId) {
            return new Response(JSON.stringify({ error: "propertyId is required" }), { status: 400 });
        }

       // Fetch only verified reviews
        const reviews = await Review.find({ propertyId, verified: true })
            .populate("userId", "fullName email")
            .sort({ createdAt: -1 });

        // Calculate average rating
        const averageRating =
            reviews.length > 0
                ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
                : 0;

        // Map reviews to include userName if populated
        const formattedReviews = reviews.map((r) => ({
            _id: r._id,
            propertyId: r.propertyId,
            bookingId: r.bookingId,
            userId: r.userId?._id,
            userName: r.userId?.fullName || "Anonymous",
            rating: r.rating,
            comment: r.comment,
            photos: r.photos || [],
            adminReply: r.adminReply || "",
            createdAt: r.createdAt,
            verified: r.verified,
        }));

        return new Response(
            JSON.stringify({
                reviews: formattedReviews,
                averageRating: Number(averageRating.toFixed(1)), // round to 1 decimal
                reviewCount: reviews.length
            }),
            {
                status: 200,
                headers: { "Content-Type": "application/json" },
            }
        );
    } catch (err) {
        console.error("GET /reviews error:", err);
        return new Response(JSON.stringify({ error: "Failed to fetch reviews" }), { status: 500 });
    }
}


// POST: Add a review
export async function POST(req) {
    try {
        await dbConnect();
        const { propertyId, bookingId, userId, rating, comment, photos,verified } = await req.json();

        if (!propertyId || !userId || !rating || !comment) {
            return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
        }

        const review = await Review.create({
            propertyId,
            bookingId,
            userId,
            rating,
            comment,
            photos: photos || [],
            verified: verified || false,
        });

        return new Response(JSON.stringify({ message: "Review added", review }), { status: 201 });
    } catch (err) {
        console.error("POST /reviews error:", err);
        return new Response(JSON.stringify({ error: "Failed to add review" }), { status: 500 });
    }
}
