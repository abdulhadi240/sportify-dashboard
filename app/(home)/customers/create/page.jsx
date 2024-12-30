"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { CreateUser } from "@/actions/Grounds"; // Ensure this path matches your project structure
import { useRouter } from "next/navigation";
import { FaPlus } from "react-icons/fa6";

const Page = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user_phone, setUser_Phone] = useState("");
  const [secondary_user_phone, setSecondary_User_Phone] = useState("");

  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !user_phone || !secondary_user_phone) {
      toast.error("Please fill all required fields.");
      return;
    }
    const token = localStorage.getItem('token');

    const result = await CreateUser(
      email,
      password,
      name,
      user_phone,
      secondary_user_phone,
      token
    );
    if (!result.success) {
      toast.success("User created successfully!");
      router.push("/customers");
    } else {
      toast.error(`Failed to create a User: ${result.error}`);
    }
  };

  return (
    <div>
      <div className="w-full flex justify-center items-center">
        <div className="bg-white rounded-lg md:p-0 p-2 w-full max-w-6xl">
          <div className="flex items-center mb-4 gap-3">
            <h1 className="text-xl">
              Customers / <span className="font-light">Create Customer</span>
            </h1>
          </div>
          <div className="flex justify-center mt-10">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-10"
          >
            {/* Left Column */}
            <div className="space-y-4">
              <div className="flex justify-between">
                <div className="w-1/2 pr-2">
                  <label className="block text-sm">Name</label>
                  <input
                    type="text"
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-56 mt-1 p-2 text-sm bg-[#f9f9fb] border-gray-300 rounded"
                  />
                </div>
                <div className="w-1/2 pl-2">
                  <label className="block text-sm">Email</label>
                  <input
                    type="text"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-56 mt-1 p-2 text-sm bg-[#f9f9fb] border-gray-300 rounded"
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <div className="w-1/2 pr-2">
                  <label className="block text-sm">Phone Number</label>
                  <input
                    type="password"
                    placeholder="Enter your phone number"
                    value={user_phone}
                    onChange={(e) => setUser_Phone(e.target.value)}
                    className="w-56 mt-1 p-2 text-sm bg-[#f9f9fb] border-gray-300 rounded"
                  />
                </div>
                <div className="w-1/2 pr-2">
                  <label className="block text-sm">Second Phone Number</label>
                  <input
                    type="text"
                    placeholder="03120202881"
                    value={secondary_user_phone}
                    onChange={(e) => setSecondary_User_Phone(e.target.value)}
                    className="w-56 mt-1 p-2 text-sm bg-[#f9f9fb] border-gray-300 rounded"
                  />
                </div>
              </div>
              <label className="block text-sm">Password</label>
              <input
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 p-2 border bg-[#f9f9fb] text-sm border-gray-300 rounded"
              />
            </div>
            <div>
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
            <div className="flex justify-start">
              <button
                type="submit"
                className="bg-primary1 text-white w-auto ml-2 px-10 p-2 rounded hover:bg-primary1/80"
              >
                Create
              </button>
            </div>
          </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
