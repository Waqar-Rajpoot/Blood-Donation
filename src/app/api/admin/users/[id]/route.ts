// import { connect } from "@/dbConfig/dbConfig";
// import User from "@/models/userModel";
// import { NextRequest, NextResponse } from "next/server";

// connect();

// // UPDATE User (Verification or Role)
// export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
//     try {
//         const body = await request.json();
//         const updatedUser = await User.findByIdAndUpdate(params.id, body, { new: true });
        
//         return NextResponse.json({ 
//             success: true, 
//             message: "User updated successfully", 
//             user: updatedUser 
//         });
//     } catch (error: any) {
//         return NextResponse.json({ error: error.message }, { status: 500 });
//     }
// }

// // DELETE User
// export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
//     try {
//         await User.findByIdAndDelete(params.id);
//         return NextResponse.json({ success: true, message: "User deleted" });
//     } catch (error: any) {
//         return NextResponse.json({ error: error.message }, { status: 500 });
//     }
// }






import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

// Define the RouteContext type for Next.js 15
type RouteContext = {
    params: Promise<{ id: string }>;
};

// UPDATE User (Verification or Role)
export async function PATCH(
    request: NextRequest, 
    { params }: RouteContext
) {
    try {
        await connect(); // Ensure DB is connected
        
        // Next.js 15: Await the params object
        const { id } = await params;
        const body = await request.json();
        
        const updatedUser = await User.findByIdAndUpdate(id, body, { new: true });
        
        if (!updatedUser) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ 
            success: true, 
            message: "User updated successfully", 
            user: updatedUser 
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// DELETE User
export async function DELETE(
    request: NextRequest, 
    { params }: RouteContext
) {
    try {
        await connect(); // Ensure DB is connected

        // Next.js 15: Await the params object
        const { id } = await params;

        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "User deleted" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}