import { connect } from "@/dbConfig/dbConfig";
import { authOptions } from "@/lib/auth";
import User from "@/models/userModel";
import { getServerSession } from "next-auth";
import { NextResponse, NextRequest } from "next/server";

// Fetch all unverified donors
export async function GET() {
  try {
    await connect();
    const unverifiedDonors = await User.find({
      role: "donor",
      isVerified: false,
    })
      .select("-password")
      .sort({ createdAt: -1 });

    return NextResponse.json(unverifiedDonors);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Update verification status
export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (
      !session ||
      !session.user ||
      !session.user.role ||
      session.user.role !== "admin"
    ) {
      return NextResponse.json(
        { error: "Unauthorized: Admin access required" },
        { status: 403 }
      );
    }
    await connect();
    const { userId, status } = await request.json();

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { isVerified: status },
      { new: true }
    );

    return NextResponse.json({
      message: "User status updated",
      user: updatedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
