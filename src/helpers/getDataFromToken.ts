import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export const getDatatFromToken = async (request: NextRequest) => {
  try {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

    console.log("Token in getData file: ", token);

    if (!token) {
      console.log("No token found");
      throw new Error("Unauthenticated");
    }

    console.log("Decoded Token: ", token);

    return token.id;
  } catch (error: any) {
    throw new Error(error.message || "Token decoding failed");
  }
};
