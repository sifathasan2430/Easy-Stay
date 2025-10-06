import dbConnect from '@/lib/dbConnect';
import { Property } from '@/models/propertie.models';
import '@/models/index'
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';





export async function POST(request) {
    await dbConnect()
    try {
        const reqBody = await request.json();
           const user=await Property.create(reqBody)
        // const newUser=new Property(reqBody)
        // const response=await newUser.save()
      
        return NextResponse.json({ status: 'success', message:'Property created successfully',user }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ status: 'error', message: error.message }, { status: 400 });
    }
}
export async function GET(request) {
  await dbConnect();

  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") || "";
  const roomType = searchParams.get("roomType");
  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 6;

  const query = {
    ...(search && { city: { $regex: search, $options: "i" } }),
    ...(roomType && { roomType }),
  };

  const properties = await Property.find(query)
    .populate("hostId", "email")
    .populate("amenities")
    .skip((page - 1) * limit)
    .limit(limit);

  return NextResponse.json({ status: "success", data: properties });
}