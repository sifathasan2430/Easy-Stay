import dbConnect from '@/lib/dbConnect';
import { Property } from '@/models/propertie.models';
import '@/models/index'
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';





export async function POST(request) {
    await dbConnect()
    try {
        const reqBody = await request.json();
        
        const newUser=new Property(reqBody)
        const response=await newUser.save()
      
        return NextResponse.json({ status: 'success', message:'Property created successfully',response }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ status: 'error', message: error.message }, { status: 400 });
    }
}
export async function GET(request,{params}) {
  await dbConnect();
  try {
       
    const { searchParams } = new URL(request.url);
 const hostId = searchParams.get("host")
 console.log(hostId)
 let properties
  if (hostId) {
      // Get properties for one host
     properties = await Property.find( {hostId} ).populate("hostId", "email").populate("amenities");
     
       
        
       
    } else {
      // Get all properties
    properties = await Property.find()
        .populate("hostId", "email")
        .populate("amenities");
    }
    

    return NextResponse.json(
      { status: "success", data: properties },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { status: "error", message: error.message },
      { status: 400 }
    );
  }
}