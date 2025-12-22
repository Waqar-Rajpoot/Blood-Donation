import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";

connect();

// Fetch all unverified donors
export async function GET() {
    try {
        const unverifiedDonors = await User.find({ 
            role: "donor", 
            isVerified: false 
        }).select("-password").sort({ createdAt: -1 });

        return NextResponse.json(unverifiedDonors);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// Update verification status
export async function PATCH(request: NextRequest) {
    try {
        const { userId, status } = await request.json();
        
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { isVerified: status },
            { new: true }
        );

        return NextResponse.json({ 
            message: "User status updated", 
            user: updatedUser 
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}