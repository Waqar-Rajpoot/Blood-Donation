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






import { connect } from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helpers/mailer";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

// Establish database connection

export async function POST(request: NextRequest) {
  
  await connect();

  try {
    const reqBody = await request.json();
    const { 
        username, 
        email, 
        password, 
        role, 
        bloodGroup, 
        phoneNumber, 
        city, 
        area 
    } = reqBody;

    // 1. Basic Validation
    if (!username || !email || !password || !phoneNumber || !city || !area) {
      return NextResponse.json(
        { error: "All required fields must be filled" },
        { status: 400 }
      );
    }

    // 2. Logic Validation: Donors must have a blood group
    if (role === "donor" && !bloodGroup) {
      return NextResponse.json(
        { error: "Blood group is required for donors" },
        { status: 400 }
      );
    }

    // 3. Check if user already exists (Email or Username)
    const existingUser = await User.findOne({ 
        $or: [{ email }, { username }] 
    });

    if (existingUser) {
      const field = existingUser.email === email ? "Email" : "Username";
      return NextResponse.json(
        { message: `${field} is already registered!`, success: false },
        { status: 400 }
      );
    }

    // 4. Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 5. Create New User with expanded fields
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role,
      bloodGroup: role === "donor" ? bloodGroup : null, // Store null if receiver
      phoneNumber,
      city,
      area,
    });

    const savedUser = await newUser.save();

    // 6. Send Verification Email
    await sendEmail({
      email,
      emailType: "VERIFY",
      userId: savedUser._id,
    });

    return NextResponse.json(
      {
        message: "User created successfully. Please verify your email.",
        success: true,
        user: {
            id: savedUser._id,
            username: savedUser.username,
            role: savedUser.role
        },
      },
      { status: 201 }
    );

  } catch (error: any) {
    console.error("Signup Route Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}