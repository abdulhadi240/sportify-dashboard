'use client';

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaPlus, FaEye, FaEyeSlash } from "react-icons/fa";
import { MdArrowBackIos } from "react-icons/md";
import { GetAllUser, UpdateUser } from "../../../actions/Grounds";
import { toast } from "react-toastify";
import Skeleton from "@/components/Skeleton";
import { useRouter } from "next/navigation";
const Page = ({ params }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user_phone, setUser_Phone] = useState("");
  const [secondary_user_phone, setSecondary_User_Phone] = useState("");
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
const router = useRouter();
  useEffect(() => {
    const fetchUserData = async () => {
      const data = await GetAllUser();
      const user = data.find((user) => user.id === params.customer);
   
      
      setName(user?.name || "");
      setEmail(user.email || "");
      setPassword(user.password_hash || '');
      setUser_Phone(user.user_phone || "");
      setSecondary_User_Phone(user.secondary_user_phone || "");
      setLoading(false); // Set loading to false after data is fetched
    };

    fetchUserData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  

    console.log(
      name,
      email,
      password,
      user_phone,  // Ensure the value passed is parsed
      secondary_user_phone
    );
    
    const updatedData = await UpdateUser(
      params.customer,
      email,
      password,
      name,
      user_phone,  // Ensure the value passed is parsed
      secondary_user_phone
    );
  
    if (!updatedData.statusCode) {
      toast.success("Customer updated successfully.");
      router.push("/customers");
      
    } else {
      toast.error("Failed to update the Customer.");
    }
  };

  if (loading) {
    return <div><Skeleton/></div>;
  }

  return (
    <div>
      <div className="w-full flex justify-center items-center">
        <div className="bg-white rounded-lg md:p-0 p-2 w-full max-w-6xl">
          <div className="flex items-center mb-4 gap-3">
            <Link href="/customers" className="h-8 w-8 flex justify-center items-center pl-1 rounded-full bg-[#f9f9fb] text-primary1">
              <MdArrowBackIos size={15} />
            </Link>
            <h1 className="text-xl">
              Customers / <span className="font-light">Edit Customer</span>
            </h1>
          </div>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-10"
          >
            {/* Left Column */}
            <div className="space-y-4">
              <div className="md:flex md:justify-between space-y-4 md:space-y-0">
                <div className="md:w-1/2 md:pr-2">
                  <label className="block md:text-sm text-xs">Name</label>
                  <input
                    type="text"
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full md:w-56 mt-1 p-2 text-sm bg-[#f9f9fb] border-gray-300 rounded"
                  />
                </div>
                <div className="md:w-1/2 md:pr-2">
                  <label className="block md:text-sm text-xs">Email</label>
                  <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full md:w-56 mt-1 p-2 text-sm bg-[#f9f9fb] border-gray-300 rounded"
                  />
                </div>
              </div>
              <div className="md:flex md:justify-between space-y-4 md:space-y-0">
                <div className="md:w-1/2 md:pr-2">
                  <label className="block md:text-sm text-xs">Phone Number</label>
                  <input
                    type="text"
                    placeholder="Enter your phone number"
                    value={user_phone}
                    onChange={(e) => setUser_Phone(e.target.value)}
                    className="w-full md:w-56 mt-1 p-2 text-sm bg-[#f9f9fb] border-gray-300 rounded"
                  />
                </div>
                <div className="md:w-1/2 md:pr-2">
                  <label className="block md:text-sm text-xs">Second Phone Number</label>
                  <input
                    type="text"
                    placeholder="03120202881"
                    value={secondary_user_phone}
                    onChange={(e) => setSecondary_User_Phone(e.target.value)}
                    className="w-full md:w-56 mt-1 p-2 text-sm bg-[#f9f9fb] border-gray-300 rounded"
                  />
                </div>
              </div>
              <label className="block md:text-sm text-xs">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full -mt-3 p-2  pr-8 border bg-[#f9f9fb] text-sm border-gray-300 rounded"
                />
                <div
                  className="absolute inset-y-0 right-0 pr-3 -mt-1 flex items-center cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <label className="bg-[#f9f9fb] font-semibold text-base rounded max-w-md h-56 w-52 flex flex-col items-center justify-center cursor-pointer border border-gray-300">
                <div className="h-14 w-14 rounded-full bg-[#ece8f2] flex justify-center items-center">
                  <FaPlus size={20} />
                </div>
                <input type="file" className="hidden" accept="image/*" />
                <p className="mt-4 text-sm tracking-wide text-black/60 font-light">
                  {"Profile Image"}
                </p>
              </label>
            </div>
            <div className="flex justify-center md:justify-start">
              <button
                type="submit"
                className="bg-primary1 text-white w-auto ml-2 px-10 p-2 rounded hover:bg-primary1/80"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
