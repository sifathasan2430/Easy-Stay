import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { Booking } from "../../../models/booking.models";

export async function GET(request,{params}) {
  try {
    await dbConnect();
     const queries=request.nextUrl.searchParams
     const limit=parseInt(queries.get('limit'))
     const skip=parseInt(queries.get('skip') )
     const analytics=queries.get('analytics')
     
    const id = queries.get('id')
    
    
   if (id){
      const userBooking = await Booking.find({userId:id})
      if (!userBooking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }
      return NextResponse.json({data:userBooking}, { status: 200 });
   }
  

   
 
   
    const statusCount=await Booking.aggregate([
      
  {
    $group: {
      _id:"$status",
      count: {
     $sum:1
      }
    }
  },
  {
    $project: {
      status:"$_id",
     count:1,
      _id:0
    }
  }

    ])
    const monthlyRevenue=await Booking.aggregate([
  {
    $match: {
      status: { $in: ["completed", "confirmed"] }
    }
  },
  {
    $addFields: {
      monthNumber: { $month: "$createdAt" }, // numeric month
      monthName: {
        $dateToString: { format: "%B", date: "$createdAt" } // e.g. January, February
      }
    }
  },
  {
    $group: {
      _id: {
        monthNumber: "$monthNumber",
        monthName: "$monthName"
      },
      totalRevenue: { $sum: "$totalPrice" }
    }
  },
  {
    $project: {
      _id: 0,
      month: "$_id.monthName",
      monthNumber: "$_id.monthNumber",
      totalRevenue: 1
    }
  },
  {
    $sort: {
      monthNumber: 1 
    }
  }
])

    if (limit || skip){
      const total=await Booking.countDocuments()
      const bookings=await Booking.find().sort({createdAt:-1}).skip(skip).limit(limit)
        
      return NextResponse.json({data:bookings,total:total,statData:statusCount}, { status: 200 });
    }

  if (analytics){
      const total=await Booking.countDocuments()
      const bookings=await Booking.find().sort({createdAt:-1})
        
      return NextResponse.json({total:total,statData:statusCount,monthlyRevenueData:monthlyRevenue}, { status: 200 });
    }


    const bookings = await Booking.find().sort({ createdAt: -1 }); // latest first
    return NextResponse.json({data:bookings}, { status: 200 });
  } catch (error) {
    console.error("GET /bookings error:", error);
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
  }
}

export async function POST(req) {
  console.log('hit')
  try {
    const body = await req.json(); // <-- parse JSON body
    const { propertyId, userId, checkInDate, checkOutDate, guests, totalPrice,payment_status } = body;

    // Validate required fields manually (optional)
    if (!propertyId || !userId || !checkInDate || !checkOutDate || !totalPrice) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newBooking = await Booking.create({
      propertyId,
      userId,
      checkInDate,
      checkOutDate,
      guests: guests || 1,
      totalPrice,
      status: "pending",
      payment_status :payment_status ||"unpaid"
    });

    return NextResponse.json(
      { message: "Booking created", booking: newBooking },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /bookings error:", error);
    return NextResponse.json(
      { error: "Failed to create booking", details: error.message },
      { status: 500 }
    );
  }
}


