import { NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET() {
    try {
        // Count all users who are registered as "Donor"
        const donorCount = await User.countDocuments({ role: "donor" });

        return NextResponse.json({
            count: donorCount,
            success: true
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}