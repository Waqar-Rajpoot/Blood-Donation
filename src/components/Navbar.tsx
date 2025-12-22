// "use client";
// import Link from "next/link";
// import { Info, Droplets } from "lucide-react";

// export default function PublicNavbar() {
//   return (
//     <nav className="flex justify-between items-center p-6 bg-white border-b">
//       <Link href="/" className="flex items-center gap-2 font-black text-2xl text-gray-800">
//         <Droplets className="text-red-600" /> LifeFlow
//       </Link>
      
//       <div className="flex items-center gap-6">
//         <Link href="/about" className="text-gray-600 hover:text-red-600 font-bold flex items-center gap-1">
//           <Info size={18} /> About Us
//         </Link>
//         <Link href="/login" className="bg-red-600 text-white px-6 py-2 rounded-xl font-bold">
//           Login
//         </Link>
//       </div>
//     </nav>
//   );
// }





"use client";
import Link from "next/link";
import { Info, Droplets, UserCircle } from "lucide-react";
import { useSession } from "next-auth/react";

export default function PublicNavbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="flex justify-between items-center p-6 bg-white border-b">
      <Link href="/" className="flex items-center gap-2 font-black text-2xl text-gray-800">
        <Droplets className="text-red-600" /> LifeFlow
      </Link>
      
      <div className="flex items-center gap-6">
        <Link href="/about" className="text-gray-600 hover:text-red-600 font-bold flex items-center gap-1">
          <Info size={18} /> About Us
        </Link>

        {/* Conditional Rendering based on Auth Status */}
        {status === "loading" ? (
          <div className="w-10 h-10 bg-gray-100 animate-pulse rounded-full"></div>
        ) : session ? (
          <Link 
            href="/" 
            className="flex items-center gap-2 group transition-all"
          >
            <div className="bg-gray-50 p-2 rounded-xl text-gray-700 group-hover:bg-red-50 group-hover:text-red-600 border border-gray-100">
              <UserCircle size={28} />
            </div>
          </Link>
        ) : (
          <Link href="/login" className="bg-red-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-red-700 transition-colors">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}