"use client";

import { signIn, useSession, getSession } from "next-auth/react";
// 1. Import useCallback
import { useState, useEffect, useCallback } from "react"; 
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, Droplets, LogIn } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // 2. Wrap redirect logic in useCallback to stabilize the reference
  const redirectUser = useCallback((role: string) => {
    switch (role?.toLowerCase()) {
      case "admin":
        router.push("/admin");
        break;
      case "donor":
        router.push("/donor");
        break;
      case "receiver":
        router.push("/receiver");
        break;
      default:
        router.push("/");
    }
  }, [router]);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.role) {
      redirectUser(session.user.role);
    }
  }, [status, session, redirectUser]); 

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid email or password");
      setLoading(false);
    } else {
      const updatedSession = await getSession();
      if (updatedSession?.user?.role) {
        redirectUser(updatedSession.user.role);
      } else {
        router.push("/");
      }
    }
  };

  if (status === "loading") return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {/* ... rest of your JSX remains the same ... */}
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-red-100 p-3 rounded-full mb-3">
            <Droplets className="text-red-600 w-10 h-10" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Welcome Back</h1>
          <p className="text-gray-500 text-sm">Login to your account</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2" htmlFor="email">
              <Mail size={16} /> Email Address
            </label>
            <input
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none text-black"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2" htmlFor="password">
              <Lock size={16} /> Password
            </label>
            <input
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none text-black"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg text-sm text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-bold text-white transition-all flex items-center justify-center gap-2 ${
              loading 
                ? "bg-gray-400 cursor-not-allowed" 
                : "bg-red-600 hover:bg-red-700 shadow-lg active:scale-95"
            }`}
          >
            {loading ? "Verifying..." : (
              <>
                <LogIn size={18} /> Login Now
              </>
            )}
          </button>

          <div className="flex flex-col items-center space-y-3 mt-6 pt-4 border-t border-gray-100">
            <Link className="text-sm text-gray-600 hover:text-red-600 transition-colors" href="/forgotPassword">
              Forgot Password?
            </Link>
            <p className="text-sm text-gray-600">
              New here?
              <Link className="text-red-600 pl-1 font-semibold hover:underline" href="/signup">
                Create an account
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}