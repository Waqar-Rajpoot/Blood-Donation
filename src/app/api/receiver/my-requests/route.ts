import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import Request from "@/models/requestModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        // Fetch requests and populate the potentialDonors details 
        // so the hospital can see names and numbers
        const requests = await Request.find({ userId: session.user.id })
            .populate("potentialDonors", "username phoneNumber bloodGroup")
            .sort({ createdAt: -1 });

        return NextResponse.json({ requests });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}