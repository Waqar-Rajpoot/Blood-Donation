// "use client";
// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import axios from "axios";
// import toast from "react-hot-toast";

// export default function Signup() {
//   const router = useRouter();
//   const [user, setUser] = useState({
//     email: "",
//     username: "",
//     password: "",
//   });

//   const [buttonDisabled, setbuttonDisabled] = useState(false);
//   const [loading, setloading] = useState(false);

//   const onSignup = async (e: any) => {
//     e.preventDefault();

//     if (!user.username || !user.email || !user.password) {
//       toast.error("All fields are required!");
//       return;
//     }

//     if (user.password.length < 8) {
//       toast.error("Password must be at least 8 characters long!");
//       return;
//     }

//     try {
//       setloading(true);
//       const response = await axios.post("/api/users/signup", user);
//       console.log("Signup successfully", response.data);
//       toast.success("Registered successfully");
//       setUser({ email: "", username: "", password: "" });
//       router.push("/login");
//     } catch (error: any) {
//       console.log("Signup failed", error.message);
//       toast.error(error.message);
//     } finally {
//       setloading(false);
//     }
//   };

//   useEffect(() => {
//     if (
//       user.email.length > 0 &&
//       user.password.length > 0 &&
//       user.username.length > 0
//     ) {
//       setbuttonDisabled(false);
//     } else {
//       setbuttonDisabled(true);
//     }
//   }, [user]);

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen py-2">
//       <form action="" className=" bg-white p-3 rounded-2xl w-[28%] h-[40%]">
//         <h1 className="text-center text-2xl mt-5 text-black font-bold">
//           {loading ? "Processing..." : "Signup page"}
//         </h1>
//         <div className="mt-7">
//           <label className="text-black" htmlFor="username">Username</label>
//           <br />
//           <input
//             className="mt-0.5 p-2 border text-black border-gray-900 rounded-lg mb-4 focus:outline-none w-[100%]"
//             type="text"
//             id="username"
//             value={user.username}
//             onChange={(e) => setUser({ ...user, username: e.target.value })}
//             placeholder="Enter your username"
//           />
//         </div>
//         <div>
//           <label className="text-black" htmlFor="email">Email</label>
//           <br />
//           <input
//             className="mt-0.5 p-2 border text-black border-gray-900 rounded-lg mb-4 focus:outline-none w-[100%]"
//             type="text"
//             id="email"
//             value={user.email}
//             onChange={(e) => setUser({ ...user, email: e.target.value })}
//             placeholder="Enter your email"
//           />
//         </div>
//         <div>
//           <label className="text-black" htmlFor="password">Password</label>
//           <br />
//           <input
//             className="mt-0.5 p-2 border text-black border-gray-900 rounded-lg mb-4 focus:outline-none w-[100%]"
//             type="password"
//             id="password"
//             value={user.password}
//             onChange={(e) => setUser({ ...user, password: e.target.value })}
//             placeholder="Enter your password"
//           />
//         </div>
//         <div className="flex justify-center items-center flex-col mt-4">
//           <button
//             onClick={onSignup}
//             className="w-full p-2 border-none rounded-lg bg-blue-500 focus:outline-none hover:bg-blue-600 hover:cursor-pointer">
//             {buttonDisabled ? "No Signup" : "Signup here!"}
//           </button>
//           <br />
//           <div className="items-center">
//           <Link className="text-black hover:text-gray-900 " href="/login">
//             Visit Login page?
//           </Link>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// }








"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { User, Mail, Lock, Phone, MapPin, Droplets, Briefcase } from "lucide-react";

export default function Signup() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    role: "donor",
    bloodGroup: "",
    phoneNumber: "",
    city: "",
    area: "",
  });

  const onSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      // Validation check
      if (user.role === "donor" && !user.bloodGroup) {
        toast.error("Donors must select a blood group");
        return;
      }

      const response = await axios.post("/api/users/signup", user);
      toast.success("Account created successfully!");
      if (response.data.success) {
        setUser({
          username: "",
          email: "",
          password: "",
          role: "donor",
          bloodGroup: "",
          phoneNumber: "",
          city: "",
          area: "",
        });
      }
      router.push("/login");
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const isFormValid = 
      user.username.length > 0 && 
      user.email.length > 0 && 
      user.password.length >= 8 &&
      user.phoneNumber.length > 0 &&
      user.city.length > 0;
    
    setButtonDisabled(!isFormValid);
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-2xl">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-red-100 p-3 rounded-full mb-2">
            <Droplets className="text-red-600 w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Create Account</h1>
          <p className="text-gray-500 text-sm">Join the life-saving community</p>
        </div>

        <form onSubmit={onSignup} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Username */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <User size={16} /> Username
            </label>
            <input
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none text-black"
              type="text"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              placeholder="johndoe"
            />
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Mail size={16} /> Email Address
            </label>
            <input
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none text-black"
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="name@example.com"
            />
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Lock size={16} /> Password
            </label>
            <input
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none text-black"
              type="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="••••••••"
            />
          </div>

          {/* Role */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Briefcase size={16} /> Register As
            </label>
            <select
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none text-black"
              value={user.role}
              onChange={(e) => setUser({ ...user, role: e.target.value })}
            >
              <option value="donor">Donor</option>
              <option value="receiver">Receiver / Hospital</option>
            </select>
          </div>

          {/* Blood Group - Conditional Rendering */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Droplets size={16} /> Blood Group
            </label>
            <select
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none text-black"
              value={user.bloodGroup}
              onChange={(e) => setUser({ ...user, bloodGroup: e.target.value })}
            >
              <option value="">Select Group</option>
              {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((group) => (
                <option key={group} value={group}>{group}</option>
              ))}
            </select>
          </div>

          {/* Phone Number */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Phone size={16} /> Phone Number
            </label>
            <input
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none text-black"
              type="text"
              value={user.phoneNumber}
              onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })}
              placeholder="+1 234 567 890"
            />
          </div>

          {/* City */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <MapPin size={16} /> City
            </label>
            <input
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none text-black"
              type="text"
              value={user.city}
              onChange={(e) => setUser({ ...user, city: e.target.value })}
              placeholder="Enter City"
            />
          </div>

          {/* Area */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <MapPin size={16} /> Area
            </label>
            <input
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none text-black"
              type="text"
              value={user.area}
              onChange={(e) => setUser({ ...user, area: e.target.value })}
              placeholder="Neighborhood/Street"
            />
          </div>

          <div className="md:col-span-2 mt-4">
            <button
              disabled={buttonDisabled || loading}
              className={`w-full p-3 rounded-lg font-bold text-white transition-all ${
                buttonDisabled || loading 
                  ? "bg-gray-400 cursor-not-allowed" 
                  : "bg-red-600 hover:bg-red-700 shadow-lg active:scale-95"
              }`}
            >
              {loading ? "Creating Account..." : "Register Now"}
            </button>
            
            <p className="text-center text-gray-600 mt-4 text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-red-600 font-semibold hover:underline">
                Login here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}