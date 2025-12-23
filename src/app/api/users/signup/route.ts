// import { connect } from "@/dbConfig/dbConfig";
// import { sendEmail } from "@/helpers/mailer";
// import User from "@/models/userModel";
// import bcrypt from "bcryptjs";
// import { NextRequest, NextResponse } from "next/server";

// connect();

// export async function POST(request: NextRequest) {
//   try {
//     const reqBody = await request.json();
//     const { username, email, password } = reqBody;

//     if (!email && !password && !username) {
//       return NextResponse.json(
//         {
//           error: "All fields are required",
//         },
//         { status: 400 }
//       );
//     }

//     const userWithEmail = await User.findOne({ email });

//     if (userWithEmail) {
//       return NextResponse.json(
//         {
//           message: "Email is already registered!",
//           success: false,
//         },
//         { status: 400 }
//       );
//     }

//     const userWithUsername = await User.findOne({ username });

//     if (userWithUsername) {
//       return NextResponse.json(
//         {
//           message: "Username is already registered",
//           success: false,
//         },
//         { status: 400 }
//       );
//     }

//     // hash password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const newUser = new User({
//       username,
//       email,
//       password: hashedPassword,
//     });

//     const savedUser = await newUser.save();

//     await sendEmail({
//       email,
//       emailType: "VERIFY",
//       userId: savedUser._id,
//     });

//     return NextResponse.json(
//       {
//         message: "user created successfully",
//         success: true,
//         savedUser,
//       },
//       {
//         status: 201,
//       }
//     );
//   } catch (error: any) {
//     console.error("Error in signup route:", error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }






// import { connect } from "@/dbConfig/dbConfig";
// import { sendEmail } from "@/helpers/mailer";
// import User from "@/models/userModel";
// import bcrypt from "bcryptjs";
// import { NextRequest, NextResponse } from "next/server";

// // Establish database connection

// export async function POST(request: NextRequest) {
  
//   await connect();

//   try {
//     const reqBody = await request.json();
//     const { 
//         username, 
//         email, 
//         password, 
//         role, 
//         bloodGroup, 
//         phoneNumber, 
//         city, 
//         area 
//     } = reqBody;

//     // 1. Basic Validation
//     if (!username || !email || !password || !phoneNumber || !city || !area) {
//       return NextResponse.json(
//         { error: "All required fields must be filled" },
//         { status: 400 }
//       );
//     }

//     // 2. Logic Validation: Donors must have a blood group
//     if (role === "donor" && !bloodGroup) {
//       return NextResponse.json(
//         { error: "Blood group is required for donors" },
//         { status: 400 }
//       );
//     }

//     // 3. Check if user already exists (Email or Username)
//     const existingUser = await User.findOne({ 
//         $or: [{ email }, { username }] 
//     });

//     if (existingUser) {
//       const field = existingUser.email === email ? "Email" : "Username";
//       return NextResponse.json(
//         { message: `${field} is already registered!`, success: false },
//         { status: 400 }
//       );
//     }

//     // 4. Hash password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // 5. Create New User with expanded fields
//     const newUser = new User({
//       username,
//       email,
//       password: hashedPassword,
//       role,
//       bloodGroup: role === "donor" ? bloodGroup : null, // Store null if receiver
//       phoneNumber,
//       city,
//       area,
//     });

//     const savedUser = await newUser.save();

//     // 6. Send Verification Email
//     await sendEmail({
//       email,
//       emailType: "VERIFY",
//       userId: savedUser._id,
//     });

//     return NextResponse.json(
//       {
//         message: "User created successfully. Please verify your email.",
//         success: true,
//         user: {
//             id: savedUser._id,
//             username: savedUser.username,
//             role: savedUser.role
//         },
//       },
//       { status: 201 }
//     );

//   } catch (error: any) {
//     console.error("Signup Route Error:", error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }







import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // 1. Ensure DB is connected BEFORE doing anything else
    // This will now throw an error immediately if the connection fails 
    // instead of "buffering" for 10 seconds.
    await connect();

    const reqBody = await request.json();
    const { username, email, password, role, bloodGroup, phoneNumber, city, area } = reqBody;

    // 2. Validation
    if (!username || !email || !password || !phoneNumber || !city || !area) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // 3. Optimized Check (findOne is the most common place for buffering timeouts)
    const existingUser = await User.findOne({ 
        $or: [{ email }, { username }] 
    }).maxTimeMS(5000); // Force the query to fail if it takes > 5 seconds

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists", success: false },
        { status: 400 }
      );
    }

    // 4. Hash password 
    // (Note: salt 10 is fine, but ensure this is inside the try-catch)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 5. Create New User
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role,
      bloodGroup: role === "donor" ? bloodGroup : null,
      phoneNumber,
      city,
      area,
    });

  await newUser.save();

    // 6. Send Verification Email
    // Move this to the end to ensure the user is saved first
    // try {
    //   await sendEmail({
    //     email,
    //     emailType: "VERIFY",
    //     userId: savedUser._id,
    //   });
    // } catch (emailError) {
    //   console.warn("User saved but email failed:", emailError);
    //   // Don't fail the whole request if only the email fails
    // }

    return NextResponse.json({
      message: "User created successfully. Please verify your email.",
      success: true,
    }, { status: 201 });

  } catch (error: any) {
    console.error("Signup Route Error:", error);
    
    // Check specifically for timeout errors
    if (error.message.includes("buffering timed out")) {
        return NextResponse.json(
            { error: "Database connection busy. Please try again." }, 
            { status: 503 }
        );
    }

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}