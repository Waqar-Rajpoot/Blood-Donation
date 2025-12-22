// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/lib/auth";
// import { NextResponse, NextRequest } from "next/server";
// import Request from "@/models/requestModel";
// import { connect } from "@/dbConfig/dbConfig";

// connect();

// export async function DELETE(
//     request: NextRequest,
//     { params }: { params: { id: string } }
// ) {
//     try {
//         const session = await getServerSession(authOptions);
//         const requestId = await params.id;

//         // 1. Check Authentication
//         if (!session || !session.user) {
//             return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//         }

//         // 2. Find the request
//         const bloodRequest = await Request.findById(requestId);

//         if (!bloodRequest) {
//             return NextResponse.json({ error: "Request not found" }, { status: 404 });
//         }

//         // 3. Security Check: Ensure the person deleting is the owner
//         // We compare the userId in the request with the logged-in user's ID
//         if (bloodRequest.userId.toString() !== session.user.id) {
//             return NextResponse.json(
//                 { error: "You do not have permission to delete this request" },
//                 { status: 403 }
//             );
//         }

//         // 4. Delete the request
//         await Request.findByIdAndDelete(requestId);

//         return NextResponse.json({
//             message: "Blood request deleted successfully",
//             success: true
//         });

//     } catch (error: any) {
//         return NextResponse.json({ error: error.message }, { status: 500 });
//     }
// }





import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { NextResponse, NextRequest } from "next/server";
import RequestModel from "@/models/requestModel"; // Renamed to avoid global conflict
import { connect } from "@/dbConfig/dbConfig";

// 1. Define the correct type for Next.js 15
type RouteContext = {
    params: Promise<{ id: string }>;
};

export async function DELETE(
    request: NextRequest,
    { params }: RouteContext // Use the Promise type here
) {
    try {
        await connect();
        const session = await getServerSession(authOptions);
        
        // 2. Await the entire params object first
        const { id } = await params;

        // 1. Check Authentication
        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // 2. Find the request
        const bloodRequest = await RequestModel.findById(id);

        if (!bloodRequest) {
            return NextResponse.json({ error: "Request not found" }, { status: 404 });
        }

        // 3. Security Check: Ensure the person deleting is the owner
        if (bloodRequest.userId.toString() !== session.user.id) {
            return NextResponse.json(
                { error: "You do not have permission to delete this request" },
                { status: 403 }
            );
        }

        // 4. Delete the request
        await RequestModel.findByIdAndDelete(id);

        return NextResponse.json({
            message: "Blood request deleted successfully",
            success: true
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}