"use client";
import Link from "next/link";
import { Info, Droplets } from "lucide-react";

export default function PublicNavbar() {
  return (
    <nav className="flex justify-between items-center p-6 bg-white border-b">
      <Link href="/" className="flex items-center gap-2 font-black text-2xl text-gray-800">
        <Droplets className="text-red-600" /> LifeFlow
      </Link>
      
      <div className="flex items-center gap-6">
        <Link href="/about" className="text-gray-600 hover:text-red-600 font-bold flex items-center gap-1">
          <Info size={18} /> About Us
        </Link>
        <Link href="/login" className="bg-red-600 text-white px-6 py-2 rounded-xl font-bold">
          Login
        </Link>
      </div>
    </nav>
  );
}