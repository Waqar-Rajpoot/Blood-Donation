import { NextRequest, NextResponse } from "next/server";
import Request from "@/models/requestModel";
import { connect } from "@/dbConfig/dbConfig";

export async function GET(request: NextRequest) {
    try {
        // 1. Database Connection Check
        await connect();

        // 2. Extract and Validate Query Parameters
        const { searchParams } = new URL(request.url);
        const bloodGroup = searchParams.get("bloodGroup");

        if (!bloodGroup) {
            return NextResponse.json(
                { error: "Blood group is required to find matching alerts." },
                { status: 400 }
            );
        }

        // 3. Define valid blood groups for safety
        const validGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
        if (!validGroups.includes(bloodGroup.toUpperCase())) {
            return NextResponse.json(
                { error: "Invalid blood group format provided." },
                { status: 400 }
            );
        }

        // 4. Fetch Requests with specific query
        // We ensure we only find 'Pending' requests for the specific group
        const requests = await Request.find({
            status: "Pending",
            bloodGroup: bloodGroup.toUpperCase() 
        })
        .select("-__v") // Exclude internal versioning field
        .sort({ createdAt: -1 })
        .lean(); // Use lean() for faster read-only performance

        // 5. Check if results exist (Optional: You can just return an empty array)
        if (!requests || requests.length === 0) {
            return NextResponse.json({ 
                requests: [], 
                message: `No active requests found for ${bloodGroup}` 
            }, { status: 200 });
        }

        // 6. Success Response
        return NextResponse.json({ 
            success: true,
            count: requests.length,
            requests 
        }, { status: 200 });

    } catch (error: any) {
        console.error("API_ALERTS_ERROR:", error);

        // Handle specific Mongoose errors if necessary
        if (error.name === "CastError") {
            return NextResponse.json(
                { error: "Invalid data format requested." },
                { status: 400 }
            );
        }

        // Generic Server Error
        return NextResponse.json(
            { error: "Internal Server Error. Please try again later." },
            { status: 500 }
        );
    }
}