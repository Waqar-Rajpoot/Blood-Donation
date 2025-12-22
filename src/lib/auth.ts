import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        try {
          await connect();
          const user = await User.findOne({ email: credentials.email });

          if (!user) {
            throw new Error("User not found");
          }
          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordCorrect) {
            throw new Error("Invalid passwrod")
          }

          return {
            id: user._id.toString(),
            email: user.email,
            role: user.role,
          }
        } catch (err: any) {
            console.log("Auth Error: ", err)
          throw new Error(err);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id.toString();
        token.role = user.role;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
        session.user.id = token.id as string; 
        session.user.role = token.role as string;
        session.user.email = token.email as string;
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login", 
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
};
