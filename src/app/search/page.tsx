// "use client";
// import React, { useState, useEffect } from "react";
// import { useSearchParams } from "next/navigation";
// import { Search, MapPin, Droplets, Phone, Calendar, User } from "lucide-react";
// import axios from "axios";
// import toast from "react-hot-toast";

// interface Donor {
//   _id: string;
//   username: string;
//   bloodGroup: string;
//   city: string;
//   area: string;
//   phoneNumber: string;
//   isAvailable: boolean;
//   lastDonationDate?: string;
// }

// export default function SearchPage() {
//   const searchParams = useSearchParams();
//   const [donors, setDonors] = useState<Donor[]>([]);
//   const [loading, setLoading] = useState(false);

//   // Search Filters State
//   const [filters, setFilters] = useState({
//     bloodGroup: searchParams.get("bloodGroup") || "",
//     city: searchParams.get("city") || "",
//   });

//   const fetchDonors = async () => {
//     try {
//       setLoading(true);
//       const { bloodGroup, city } = filters;
//       const response = await axios.get(`/api/donors/search?bloodGroup=${bloodGroup}&city=${city}`);
//       setDonors(response.data.donors);
//     } catch (error: any) {
//       toast.error("Failed to fetch donors", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchDonors();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4">
//       <div className="max-w-6xl mx-auto">
        
//         {/* Header & Filter Section */}
//         <div className="bg-white p-6 rounded-2xl shadow-sm mb-8">
//           <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
//             <Search className="text-red-600" /> Find Available Donors
//           </h1>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div className="space-y-1">
//               <label className="text-sm font-semibold text-gray-600">Blood Group</label>
//               <select 
//                 className="w-full p-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-red-500 text-black"
//                 value={filters.bloodGroup}
//                 onChange={(e) => setFilters({...filters, bloodGroup: e.target.value})}
//               >
//                 <option value="">All Groups</option>
//                 {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(g => <option key={g} value={g}>{g}</option>)}
//               </select>
//             </div>
//             <div className="space-y-1">
//               <label className="text-sm font-semibold text-gray-600">City</label>
//               <input 
//                 type="text" 
//                 placeholder="Search by city..." 
//                 className="w-full p-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-red-500 text-black"
//                 value={filters.city}
//                 onChange={(e) => setFilters({...filters, city: e.target.value})}
//               />
//             </div>
//             <div className="flex items-end">
//               <button 
//                 onClick={fetchDonors}
//                 className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded-lg transition-all"
//               >
//                 Update Search
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Results Section */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {loading ? (
//             <p className="col-span-full text-center py-10 text-gray-500">Searching for life-savers...</p>
//           ) : donors.length > 0 ? (
//             donors.map((donor) => (
//               <div key={donor._id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
//                 <div className="flex justify-between items-start mb-4">
//                   <div className="bg-red-50 p-3 rounded-xl">
//                     <span className="text-2xl font-black text-red-600">{donor.bloodGroup}</span>
//                   </div>
//                   <span className={`px-3 py-1 rounded-full text-xs font-bold ${donor.isAvailable ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
//                     {donor.isAvailable ? "Available" : "Busy"}
//                   </span>
//                 </div>
                
//                 <h3 className="text-xl font-bold text-gray-800 mb-1 flex items-center gap-2">
//                   <User size={18} className="text-gray-400" /> {donor.username}
//                 </h3>
                
//                 <div className="space-y-2 mb-6">
//                   <p className="text-gray-600 flex items-center gap-2 text-sm">
//                     <MapPin size={16} className="text-red-500" /> {donor.area}, {donor.city}
//                   </p>
//                   <p className="text-gray-600 flex items-center gap-2 text-sm">
//                     <Calendar size={16} className="text-blue-500" /> 
//                     Last Donated: {donor.lastDonationDate ? new Date(donor.lastDonationDate).toLocaleDateString() : "Never"}
//                   </p>
//                 </div>

//                 <a 
//                   href={`tel:${donor.phoneNumber}`}
//                   className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-3 rounded-xl font-bold hover:bg-black transition-colors"
//                 >
//                   <Phone size={18} /> Contact Donor
//                 </a>
//               </div>
//             ))
//           ) : (
//             <div className="col-span-full text-center py-20">
//               <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <Droplets className="text-gray-400 w-10 h-10" />
//               </div>
//               <h3 className="text-xl font-bold text-gray-800">No Donors Found</h3>
//               <p className="text-gray-500">Try adjusting your filters or search area.</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }








// "use client";
// import React, { useState, useEffect, useCallback } from "react";
// import { useSearchParams } from "next/navigation";
// import { Search, MapPin, Droplets, Phone, Calendar, Loader2, AlertCircle } from "lucide-react";
// import axios from "axios";
// import toast from "react-hot-toast";

// interface Donor {
//   _id: string;
//   username: string;
//   bloodGroup: string;
//   city: string;
//   area: string;
//   phoneNumber: string;
//   isAvailable: boolean;
//   lastDonationDate?: string;
// }

// export default function SearchPage() {
//   const searchParams = useSearchParams();
//   const [donors, setDonors] = useState<Donor[]>([]);
//   const [loading, setLoading] = useState(false);

//   // Search Filters State
//   const [filters, setFilters] = useState({
//     bloodGroup: searchParams.get("bloodGroup") || "",
//     city: searchParams.get("city") || "",
//   });

//   // 1. Wrap fetchDonors in useCallback to fix Build Warnings
//   const fetchDonors = useCallback(async () => {
//     try {
//       setLoading(true);
//       const { bloodGroup, city } = filters;
//       // Using URLSearchParams for cleaner query string construction
//       const params = new URLSearchParams();
//       if (bloodGroup) params.append("bloodGroup", bloodGroup);
//       if (city) params.append("city", city);

//       const response = await axios.get(`/api/donors/search?${params.toString()}`);
//       setDonors(response.data.donors || []);
//     } catch (error: any) {
//       const errorMsg = error.response?.data?.error || "Failed to fetch donors";
//       toast.error(errorMsg);
//     } finally {
//       setLoading(false);
//     }
//   }, [filters]); // Dependency is the filters object

//   // 2. useEffect now has fetchDonors in the dependency array
//   useEffect(() => {
//     fetchDonors();
//   }, [fetchDonors]);

//   return (
//     <div className="min-h-screen bg-gray-50 py-12 px-4">
//       <div className="max-w-7xl mx-auto">
        
//         {/* Header & Filter Section */}
//         <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 mb-10">
//           <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
//             <div>
//               <h1 className="text-4xl font-black text-gray-900 tracking-tighter flex items-center gap-3">
//                 <Search className="text-red-600" size={32} /> Life-Saver Search
//               </h1>
//               <p className="text-gray-500 font-medium mt-1">Connecting you with ready donors in real-time.</p>
//             </div>
//             <div className="bg-red-50 px-4 py-2 rounded-2xl flex items-center gap-2">
//               <span className="relative flex h-3 w-3">
//                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
//                 <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
//               </span>
//               <span className="text-xs font-black text-red-700 uppercase tracking-widest">{donors.length} Donors Nearby</span>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <div className="space-y-2">
//               <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Blood Group</label>
//               <div className="relative">
//                 <Droplets className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500" size={18} />
//                 <select 
//                   className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-600 transition-all font-bold text-gray-800 appearance-none"
//                   value={filters.bloodGroup}
//                   onChange={(e) => setFilters({...filters, bloodGroup: e.target.value})}
//                 >
//                   <option value="">All Groups</option>
//                   {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(g => <option key={g} value={g}>{g}</option>)}
//                 </select>
//               </div>
//             </div>

//             <div className="space-y-2">
//               <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">City Location</label>
//               <div className="relative">
//                 <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//                 <input 
//                   type="text" 
//                   placeholder="Which city?" 
//                   className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-600 transition-all font-bold text-gray-800"
//                   value={filters.city}
//                   onChange={(e) => setFilters({...filters, city: e.target.value})}
//                 />
//               </div>
//             </div>

//             <div className="flex items-end">
//               <button 
//                 onClick={fetchDonors}
//                 disabled={loading}
//                 className="w-full bg-red-600 hover:bg-black text-white font-black uppercase tracking-[0.2em] text-xs py-5 rounded-2xl transition-all shadow-lg shadow-red-100 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
//               >
//                 {loading ? <Loader2 className="animate-spin" size={18} /> : "Update Results"}
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Results Section */}
//         {loading ? (
//           <div className="flex flex-col items-center justify-center py-20">
//             <Loader2 className="animate-spin text-red-600 mb-4" size={40} />
//             <p className="text-gray-400 font-black uppercase tracking-widest text-xs">Accessing Database...</p>
//           </div>
//         ) : donors.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {donors.map((donor) => (
//               <div key={donor._id} className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 hover:border-red-200 hover:shadow-xl hover:shadow-red-500/5 transition-all group">
//                 <div className="flex justify-between items-start mb-6">
//                   <div className="bg-red-50 w-16 h-16 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
//                     <span className="text-2xl font-black text-red-600 tracking-tighter">{donor.bloodGroup}</span>
//                   </div>
//                   <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border ${donor.isAvailable ? 'bg-green-50 border-green-100 text-green-700' : 'bg-gray-50 border-gray-200 text-gray-500'}`}>
//                     <span className={`w-1.5 h-1.5 rounded-full ${donor.isAvailable ? 'bg-green-500' : 'bg-gray-400'}`}></span>
//                     <span className="text-[10px] font-black uppercase tracking-wider">{donor.isAvailable ? "Ready" : "Away"}</span>
//                   </div>
//                 </div>
                
//                 <h3 className="text-2xl font-black text-gray-800 mb-1 tracking-tight flex items-center gap-2">
//                   {donor.username}
//                 </h3>
                
//                 <div className="space-y-3 mb-8">
//                   <p className="text-gray-500 flex items-center gap-2 text-sm font-bold">
//                     <MapPin size={16} className="text-red-500" /> {donor.area}, {donor.city}
//                   </p>
//                   <p className="text-gray-400 flex items-center gap-2 text-xs font-bold">
//                     <Calendar size={14} className="text-blue-400" /> 
//                     Last Donated: {donor.lastDonationDate ? new Date(donor.lastDonationDate).toLocaleDateString() : "Never"}
//                   </p>
//                 </div>

//                 <a 
//                   href={`tel:${donor.phoneNumber}`}
//                   className="w-full flex items-center justify-center gap-3 bg-gray-900 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-red-600 transition-all shadow-md active:scale-95"
//                 >
//                   <Phone size={16} /> Contact Donor
//                 </a>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="bg-white rounded-[3rem] text-center py-24 px-6 border border-dashed border-gray-200">
//             <div className="bg-gray-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
//               <AlertCircle className="text-gray-300 w-12 h-12" />
//             </div>
//             <h3 className="text-3xl font-black text-gray-800 tracking-tighter">No Donors Found</h3>
//             <p className="text-gray-500 font-medium mt-2 max-w-xs mx-auto leading-relaxed">
//               We could not find matches in your area. Try searching for All Groups or neighboring cities.
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }






"use client";
import React, { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search, MapPin, Droplets, Phone, Calendar, Loader2, AlertCircle } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

interface Donor {
  _id: string;
  username: string;
  bloodGroup: string;
  city: string;
  area: string;
  phoneNumber: string;
  isAvailable: boolean;
  lastDonationDate?: string;
}

// 1. Main Page Component with Suspense Boundary
export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <Loader2 className="animate-spin text-red-600 mb-4" size={48} />
        <p className="text-gray-500 font-black uppercase tracking-widest text-xs">Initializing Search...</p>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}

// 2. The actual content component that uses useSearchParams
function SearchContent() {
  const searchParams = useSearchParams();
  const [donors, setDonors] = useState<Donor[]>([]);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    bloodGroup: searchParams.get("bloodGroup") || "",
    city: searchParams.get("city") || "",
  });

  const fetchDonors = useCallback(async () => {
    try {
      setLoading(true);
      const { bloodGroup, city } = filters;
      const params = new URLSearchParams();
      if (bloodGroup) params.append("bloodGroup", bloodGroup);
      if (city) params.append("city", city);

      const response = await axios.get(`/api/donors/search?${params.toString()}`);
      setDonors(response.data.donors || []);
    } catch (error: any) {
      const errorMsg = error.response?.data?.error || "Failed to fetch donors";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchDonors();
  }, [fetchDonors]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header & Filter Section */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-4xl font-black text-gray-900 tracking-tighter flex items-center gap-3">
                <Search className="text-red-600" size={32} /> Life-Saver Search
              </h1>
              <p className="text-gray-500 font-medium mt-1">Connecting you with ready donors in real-time.</p>
            </div>
            <div className="bg-red-50 px-4 py-2 rounded-2xl flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
              </span>
              <span className="text-xs font-black text-red-700 uppercase tracking-widest">
                {loading ? "..." : `${donors.length} Donors Nearby`}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Blood Group</label>
              <div className="relative">
                <Droplets className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500" size={18} />
                <select 
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-600 transition-all font-bold text-gray-800 appearance-none"
                  value={filters.bloodGroup}
                  onChange={(e) => setFilters({...filters, bloodGroup: e.target.value})}
                >
                  <option value="">All Groups</option>
                  {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(g => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">City Location</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Which city?" 
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-600 transition-all font-bold text-gray-800"
                  value={filters.city}
                  onChange={(e) => setFilters({...filters, city: e.target.value})}
                />
              </div>
            </div>

            <div className="flex items-end">
              <button 
                onClick={fetchDonors}
                disabled={loading}
                className="w-full bg-red-600 hover:bg-black text-white font-black uppercase tracking-[0.2em] text-xs py-5 rounded-2xl transition-all shadow-lg shadow-red-100 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="animate-spin" size={18} /> : "Update Results"}
              </button>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="animate-spin text-red-600 mb-4" size={40} />
            <p className="text-gray-400 font-black uppercase tracking-widest text-xs">Accessing Database...</p>
          </div>
        ) : donors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {donors.map((donor) => (
              <div key={donor._id} className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 hover:border-red-200 hover:shadow-xl hover:shadow-red-500/5 transition-all group">
                <div className="flex justify-between items-start mb-6">
                  <div className="bg-red-50 w-16 h-16 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                    <span className="text-2xl font-black text-red-600 tracking-tighter">{donor.bloodGroup}</span>
                  </div>
                  <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border ${donor.isAvailable ? 'bg-green-50 border-green-100 text-green-700' : 'bg-gray-50 border-gray-200 text-gray-500'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${donor.isAvailable ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                    <span className="text-[10px] font-black uppercase tracking-wider">{donor.isAvailable ? "Ready" : "Away"}</span>
                  </div>
                </div>
                
                <h3 className="text-2xl font-black text-gray-800 mb-1 tracking-tight flex items-center gap-2">
                  {donor.username}
                </h3>
                
                <div className="space-y-3 mb-8">
                  <p className="text-gray-500 flex items-center gap-2 text-sm font-bold">
                    <MapPin size={16} className="text-red-500" /> {donor.area}, {donor.city}
                  </p>
                  <p className="text-gray-400 flex items-center gap-2 text-xs font-bold">
                    <Calendar size={14} className="text-blue-400" /> 
                    Last Donated: {donor.lastDonationDate ? new Date(donor.lastDonationDate).toLocaleDateString() : "Never"}
                  </p>
                </div>

                <a 
                  href={`tel:${donor.phoneNumber}`}
                  className="w-full flex items-center justify-center gap-3 bg-gray-900 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-red-600 transition-all shadow-md active:scale-95"
                >
                  <Phone size={16} /> Contact Donor
                </a>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-[3rem] text-center py-24 px-6 border border-dashed border-gray-200">
            <div className="bg-gray-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="text-gray-300 w-12 h-12" />
            </div>
            <h3 className="text-3xl font-black text-gray-800 tracking-tighter">No Donors Found</h3>
            <p className="text-gray-500 font-medium mt-2 max-w-xs mx-auto leading-relaxed">
              We could not find matches in your area. Try searching for All Groups or neighboring cities.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}