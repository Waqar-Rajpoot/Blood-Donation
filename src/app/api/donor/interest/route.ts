import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { NextResponse, NextRequest } from "next/server";
import Request from "@/models/requestModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { requestId } = await request.json();

        // Add the logged-in donor to the potentialDonors array
        const updatedRequest = await Request.findByIdAndUpdate(
            requestId,
            { $addToSet: { potentialDonors: session.user.id } },
            { new: true }
        );

        return NextResponse.json({ 
            message: "Interest logged! The hospital can now see your profile.",
            data: updatedRequest,
            success: true 
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}