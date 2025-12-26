// "use client";
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { 
//   ShieldCheck, 
//   UserCheck, 
//   UserX, 
//   Search, 
//   Mail, 
//   MapPin, 
//   Loader2,
// } from "lucide-react";
// import { toast } from "react-hot-toast";

// export default function AdminVerifications() {
//   const [donors, setDonors] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");

//   const fetchUnverified = async () => {
//     try {
//       const res = await axios.get("/api/admin/verify");
//       setDonors(res.data);
//     } catch (error) {
//       toast.error(`Failed to load pending verifications: ${error}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleVerify = async (userId: string) => {
//     try {
//       await axios.patch("/api/admin/verify", { userId, status: true });
//       toast.success("Donor Verified Successfully");
//       setDonors(prev => prev.filter(donor => donor._id !== userId));
//     } catch (error) {
//       toast.error(`Failed to verify donor: ${error}`);
//     }
//   };

//   useEffect(() => { fetchUnverified(); }, []);

//   const filteredDonors = donors.filter(donor => 
//     donor.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     donor.email.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
//       <div className="max-w-6xl mx-auto">
//         <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
//           <div>
//             <h1 className="text-3xl font-black text-gray-900 flex items-center gap-3">
//               <ShieldCheck className="text-red-600" size={32} />
//               Pending Verifications
//             </h1>
//             <p className="text-gray-500 font-medium">Review and approve donor credentials to maintain platform safety.</p>
//           </div>
          
//           <div className="relative w-full md:w-72">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//             <input 
//               type="text"
//               placeholder="Search by name or email..."
//               className="w-full pl-10 pr-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-red-500 outline-none transition-all"
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//         </header>

//         {loading ? (
//           <div className="flex flex-col items-center py-20">
//             <Loader2 className="animate-spin text-red-600 mb-4" size={40} />
//             <p className="text-gray-400 font-bold">Scanning database...</p>
//           </div>
//         ) : filteredDonors.length > 0 ? (
//           <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
//             <table className="w-full text-left">
//               <thead className="bg-gray-50 border-b border-gray-100">
//                 <tr>
//                   <th className="px-8 py-5 text-xs font-black uppercase text-gray-400">Donor Details</th>
//                   <th className="px-8 py-5 text-xs font-black uppercase text-gray-400">Blood Group</th>
//                   <th className="px-8 py-5 text-xs font-black uppercase text-gray-400">Location</th>
//                   <th className="px-8 py-5 text-xs font-black uppercase text-gray-400 text-right">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-50">
//                 {filteredDonors.map((donor) => (
//                   <tr key={donor._id} className="hover:bg-gray-50/50 transition-colors">
//                     <td className="px-8 py-6">
//                       <div className="flex items-center gap-4">
//                         <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center text-red-600 font-black">
//                           {donor.username[0].toUpperCase()}
//                         </div>
//                         <div>
//                           <p className="font-bold text-gray-900">{donor.username}</p>
//                           <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
//                             <Mail size={12} /> {donor.email}
//                           </p>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-8 py-6">
//                       <span className="bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm font-black shadow-sm shadow-red-100">
//                         {donor.bloodGroup}
//                       </span>
//                     </td>
//                     <td className="px-8 py-6">
//                       <p className="text-sm font-bold text-gray-700 flex items-center gap-1">
//                         <MapPin size={14} className="text-gray-400" /> {donor.city}
//                       </p>
//                     </td>
//                     <td className="px-8 py-6 text-right">
//                       <div className="flex justify-end gap-2">
//                         <button 
//                           onClick={() => handleVerify(donor._id)}
//                           className="p-3 bg-green-50 text-green-600 rounded-xl hover:bg-green-600 hover:text-white transition-all shadow-sm"
//                           title="Verify Donor"
//                         >
//                           <UserCheck size={20} />
//                         </button>
//                         <button 
//                           className="p-3 bg-gray-50 text-gray-400 rounded-xl hover:bg-red-50 hover:text-red-600 transition-all"
//                           title="Reject / Delete"
//                         >
//                           <UserX size={20} />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         ) : (
//           <div className="bg-white rounded-[2.5rem] p-20 text-center border border-dashed border-gray-200">
//             <div className="bg-green-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
//               <CheckCircle className="text-green-500" size={40} />
//             </div>
//             <h3 className="text-2xl font-black text-gray-800">Everything Clear!</h3>
//             <p className="text-gray-400 mt-2">No donors are currently waiting for verification.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// // Simple Helper Component
// function CheckCircle({ className, size }: { className?: string, size?: number }) {
//   return <ShieldCheck className={className} size={size} />;
// }





"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  ShieldCheck, 
  UserCheck, 
  UserX, 
  Search, 
  Mail, 
  MapPin, 
  Loader2,
} from "lucide-react";
import { toast } from "react-hot-toast";

export default function AdminVerifications() {
  const [donors, setDonors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchUnverified = async () => {
    try {
      const res = await axios.get("/api/admin/verify");
      setDonors(res.data);
    } catch (error) {
      toast.error(`Failed to load pending verifications: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (userId: string) => {
    try {
      await axios.patch("/api/admin/verify", { userId, status: true });
      toast.success("Donor Verified Successfully");
      setDonors(prev => prev.filter(donor => donor._id !== userId));
    } catch (error) {
      toast.error(`Failed to verify donor: ${error}`);
    }
  };

  useEffect(() => { fetchUnverified(); }, []);

  const filteredDonors = donors.filter(donor => 
    donor.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    donor.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 md:p-10 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-10 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-gray-900 flex items-center gap-3">
              <ShieldCheck className="text-red-600" size={32} />
              Pending Verifications
            </h1>
            <p className="text-gray-500 font-medium text-sm md:text-base">Review and approve donor credentials to maintain platform safety.</p>
          </div>
          
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-red-500 outline-none transition-all shadow-sm"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </header>

        {loading ? (
          <div className="flex flex-col items-center py-20">
            <Loader2 className="animate-spin text-red-600 mb-4" size={40} />
            <p className="text-gray-400 font-bold">Scanning database...</p>
          </div>
        ) : filteredDonors.length > 0 ? (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="px-8 py-5 text-xs font-black uppercase text-gray-400">Donor Details</th>
                    <th className="px-8 py-5 text-xs font-black uppercase text-gray-400">Blood Group</th>
                    <th className="px-8 py-5 text-xs font-black uppercase text-gray-400">Location</th>
                    <th className="px-8 py-5 text-xs font-black uppercase text-gray-400 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredDonors.map((donor) => (
                    <tr key={donor._id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center text-red-600 font-black shrink-0">
                            {donor.username[0].toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <p className="font-bold text-gray-900 truncate">{donor.username}</p>
                            <p className="text-xs text-gray-500 flex items-center gap-1 mt-1 truncate">
                              <Mail size={12} /> {donor.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className="bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm font-black shadow-sm shadow-red-100">
                          {donor.bloodGroup}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <p className="text-sm font-bold text-gray-700 flex items-center gap-1">
                          <MapPin size={14} className="text-gray-400" /> {donor.city}
                        </p>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => handleVerify(donor._id)}
                            className="p-3 bg-green-50 text-green-600 rounded-xl hover:bg-green-600 hover:text-white transition-all shadow-sm"
                            title="Verify Donor"
                          >
                            <UserCheck size={20} />
                          </button>
                          <button className="p-3 bg-gray-50 text-gray-400 rounded-xl hover:bg-red-50 hover:text-red-600 transition-all">
                            <UserX size={20} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
              {filteredDonors.map((donor) => (
                <div key={donor._id} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center text-red-600 font-black text-xl shrink-0">
                      {donor.username[0].toUpperCase()}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-bold text-gray-900 truncate">{donor.username}</p>
                        <span className="bg-red-600 text-white px-2 py-1 rounded-lg text-xs font-black">
                          {donor.bloodGroup}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 flex items-center gap-1 mt-1 truncate">
                        <Mail size={12} /> {donor.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                    <div className="flex items-center gap-1 text-gray-600 font-medium text-sm">
                      <MapPin size={14} className="text-gray-400" />
                      {donor.city}
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleVerify(donor._id)}
                        className="p-2.5 bg-green-50 text-green-600 rounded-lg hover:bg-green-600 hover:text-white transition-all shadow-sm"
                      >
                        <UserCheck size={18} />
                      </button>
                      <button className="p-2.5 bg-gray-50 text-gray-400 rounded-lg">
                        <UserX size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="bg-white rounded-[2.5rem] p-10 md:p-20 text-center border border-dashed border-gray-200">
            <div className="bg-green-50 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShieldCheck className="text-green-500" size={32} />
            </div>
            <h3 className="text-xl md:text-2xl font-black text-gray-800">Everything Clear!</h3>
            <p className="text-gray-400 mt-2 text-sm md:text-base">No donors are currently waiting for verification.</p>
          </div>
        )}
      </div>
    </div>
  );
}