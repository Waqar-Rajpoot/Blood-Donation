// "use client";
// import React from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { 
//   LayoutDashboard, 
//   Users, 
//   ClipboardList, 
//   LogOut, 
//   ShieldCheck,
//   Menu,
//   X
// } from "lucide-react";

// export default function AdminNavbar() {
//   const pathname = usePathname();
//   const [isOpen, setIsOpen] = React.useState(false);

//   const navItems = [
//     { name: "Dashboard", href: "/admin", icon: <LayoutDashboard size={20} /> },
//     { name: "User Management", href: "/admin/users", icon: <Users size={20} /> },
//     { name: "Request Logs", href: "/admin/requests", icon: <ClipboardList size={20} /> },
//   ];

//   return (
//     <>
//       {/* Mobile Toggle */}
//       <div className="lg:hidden bg-white p-4 border-b flex justify-between items-center sticky top-0 z-50">
//         <div className="flex items-center gap-2 text-red-600 font-bold">
//           <ShieldCheck /> Admin Panel
//         </div>
//         <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
//           {isOpen ? <X /> : <Menu />}
//         </button>
//       </div>

//       {/* Sidebar Navigation */}
//       <aside className={`
//         fixed inset-y-0 left-0 z-40 w-64 bg-white border-r transform transition-transform duration-300 ease-in-out lg:translate-x-0
//         ${isOpen ? "translate-x-0" : "-translate-x-full"}
//       `}>
//         <div className="h-full flex flex-col p-6">
//           {/* Logo Section */}
//           <div className="flex items-center gap-3 px-2 mb-10">
//             <div className="bg-red-600 p-2 rounded-xl text-white">
//               <ShieldCheck size={24} />
//             </div>
//             <span className="font-black text-xl tracking-tight text-gray-800">AdminHub</span>
//           </div>

//           {/* Nav Links */}
//           <nav className="flex-1 space-y-2">
//             {navItems.map((item) => {
//               const isActive = pathname === item.href;
//               return (
//                 <Link
//                   key={item.name}
//                   href={item.href}
//                   onClick={() => setIsOpen(false)}
//                   className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
//                     isActive 
//                       ? "bg-red-50 text-red-600 shadow-sm shadow-red-100" 
//                       : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
//                   }`}
//                 >
//                   {item.icon}
//                   {item.name}
//                 </Link>
//               );
//             })}
//           </nav>

//           {/* Bottom Actions */}
//           <div className="border-t pt-6">
//             <button className="flex items-center gap-3 px-4 py-3 w-full text-gray-500 font-bold hover:text-red-600 transition-colors">
//               <LogOut size={20} />
//               Logout
//             </button>
//           </div>
//         </div>
//       </aside>

//       {/* Overlay for mobile */}
//       {isOpen && (
//         <div 
//           className="fixed inset-0 bg-black/20 z-30 lg:hidden" 
//           onClick={() => setIsOpen(false)}
//         />
//       )}
//     </>
//   );
// }





"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react"; // Import NextAuth signOut
import { 
  LayoutDashboard, 
  Users, 
  ClipboardList, 
  LogOut, 
  ShieldCheck,
  Menu,
  X,
  FileBarChart,
  UserCheck
} from "lucide-react";

export default function AdminNavbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: <LayoutDashboard size={20} /> },
    { name: "User Management", href: "/admin/users", icon: <Users size={20} /> },
    { name: "Verify Donors", href: "/admin/verifications", icon: <UserCheck size={20} /> },
    { name: "Request Logs", href: "/admin/requests", icon: <ClipboardList size={20} /> },
    { name: "Analytics Reports", href: "/admin/reports", icon: <FileBarChart size={20} /> },
  ];

  // Logout Handler
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/login" });
  };

  return (
    <>
      {/* Mobile Toggle */}
      <div className="lg:hidden bg-white p-4 border-b flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-2 text-red-600 font-bold">
          <ShieldCheck /> Admin Panel
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-white border-r transform transition-transform duration-300 ease-in-out lg:translate-x-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="h-full flex flex-col p-6">
          {/* Logo Section */}
          <div className="flex items-center gap-3 px-2 mb-10">
            <div className="bg-red-600 p-2 rounded-xl text-white">
              <ShieldCheck size={24} />
            </div>
            <span className="font-black text-xl tracking-tight text-gray-800">AdminHub</span>
          </div>

          {/* Nav Links */}
          <nav className="flex-1 space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
                    isActive 
                      ? "bg-red-50 text-red-600 shadow-sm shadow-red-100" 
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  {item.icon}
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Bottom Actions */}
          <div className="border-t pt-6">
            <button 
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 w-full text-gray-500 font-bold hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-30 lg:hidden" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}