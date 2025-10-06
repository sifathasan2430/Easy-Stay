import dbConnect from "@/lib/dbConnect";
import { Review } from "@/models/review.models";

// GET: Fetch reviews by propertyId
export async function GET(req) {
    try {
        await dbConnect();

        const url = new URL(req.url);
        const propertyId = url.searchParams.get("propertyId");

        if (!propertyId) {
            return new Response(JSON.stringify({ error: "propertyId is required" }), { status: 400 });
        }

        const reviews = await Review.find({ propertyId })
            .populate("userId", "name email") // optional: get user's name/email
            .sort({ createdAt: -1 });

        // Map reviews to include userName if populated
        const formattedReviews = reviews.map((r) => ({
            _id: r._id,
            propertyId: r.propertyId,
            bookingId: r.bookingId,
            userId: r.userId?._id,
            userName: r.userId?.name || "Anonymous",
            rating: r.rating,
            comment: r.comment,
            photos: r.photos || [],
            adminReply: r.adminReply || "",
            createdAt: r.createdAt,
        }));

        return new Response(JSON.stringify(formattedReviews), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });
    } catch (err) {
        console.error("GET /reviews error:", err);
        return new Response(JSON.stringify({ error: "Failed to fetch reviews" }), { status: 500 });
    }
}

// POST: Add a review
export async function POST(req) {
    try {
        await dbConnect();
        const { propertyId, bookingId, userId, rating, comment, photos } = await req.json();

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
        });

        return new Response(JSON.stringify({ message: "Review added", review }), { status: 201 });
    } catch (err) {
        console.error("POST /reviews error:", err);
        return new Response(JSON.stringify({ error: "Failed to add review" }), { status: 500 });
    }
}
