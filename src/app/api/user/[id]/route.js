import dbConnect from "@/lib/dbConnect";
import User from "@/models/user.models";
import { NextResponse } from "next/server";

// ✅ GET user by ID
export async function GET(request, { params }) {
  await dbConnect();

  const resolvedParams = await params;
  const { id } = resolvedParams;

  try {
    const user = await User.findById(id).select("-password -verifyCode -verifyCodeExpiry");
    if (!user) {
      return NextResponse.json({ status: "fail", error: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ status: "success", data: user }, { status: 200 });
  } catch (error) {
    console.error("GET user error:", error);
    return NextResponse.json({ status: "fail", error: error.message }, { status: 500 });
  }
}

// ✅ PATCH user by ID
export async function PATCH(request, { params }) {
  await dbConnect();

  const { id } = params;

  try {
    const body = await request.json();

    // Prevent sensitive fields update
    delete body.password;
    delete body.username;
    delete body.email;

    // Validate required fields
    const requiredFields = ["fullName", "phoneNumber", "gender", "preferredLanguages", "currentCity", "address"];
    for (const field of requiredFields) {
      if (!body[field] || (Array.isArray(body[field]) && body[field].length === 0)) {
        return NextResponse.json({ status: "fail", error: `Field "${field}" is required` }, { status: 400 });
      }
    }

    // Ensure preferredLanguages is an array
    if (!Array.isArray(body.preferredLanguages)) {
      body.preferredLanguages = [body.preferredLanguages];
    }

    // Update user by assigning fields manually
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ status: "fail", error: "User not found" }, { status: 404 });
    }

    user.fullName = body.fullName;
    user.phoneNumber = body.phoneNumber;
    user.gender = body.gender;
    user.preferredLanguages = body.preferredLanguages;
    user.currentCity = body.currentCity;
    user.address = body.address;
    user.profilePhoto = body.profilePhoto || user.profilePhoto;

    const updatedUser = await user.save(); // runValidators will run here

    return NextResponse.json({ status: "success", data: updatedUser }, { status: 200 });
  } catch (error) {
    console.error("PATCH user error:", error);
    return NextResponse.json({ status: "fail", error: error.message }, { status: 500 });
  }
}



// ✅ DELETE user by ID
export async function DELETE(request, { params }) {
  await dbConnect();

  const resolvedParams = await params;
  const { id } = resolvedParams;

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return NextResponse.json({ status: "fail", error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ status: "success", message: "User deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("DELETE user error:", error);
    return NextResponse.json({ status: "fail", error: error.message }, { status: 500 });
  }
}
