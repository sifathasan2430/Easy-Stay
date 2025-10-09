// /app/api/property/all/route.js
import dbConnect from "@/lib/dbConnect";
import { Property } from "@/models/propertie.models";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();

    // Fetch all properties
    const allProperties = await Property.find()
      .sort({ createdAt: -1 }) // newest first
      .populate("hostId", "name email") // optional: populate host info
      .populate("amenities");           // optional: populate amenities

    return NextResponse.json({
      status: "success",
      total: allProperties.length,
      data: allProperties,
    }, { status: 200 });

  } catch (error) {
    console.error("GET /api/properties/all error:", error);
    return NextResponse.json({
      status: "error",
      message: "Failed to fetch properties",
    }, { status: 500 });
  }
}
