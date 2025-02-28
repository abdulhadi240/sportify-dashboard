'use client';

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa6";
import { MdArrowBackIos } from "react-icons/md";
import { SingleGame, UpdateGame } from "@/actions/Grounds";
import { toast } from "react-toastify";
import Skeleton from "@/components/Skeleton";
import { useRouter } from "next/navigation";
const Page = ({ params }) => {
  const { id } = params;
  console.log(id);
  
  const [id1, setId] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("outdoor");
  const [person, setPerson] = useState("5 V 5");
  const [date, setDate] = useState(getCurrentDate());
  const [description, setDescription] = useState("");
  const [loading , setLoading] = useState(true);

  const router = useRouter();

  function getCurrentDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }


  useEffect(() => {
    const fetchCourtData = async () => {
      const token = localStorage.getItem('token');
      if(token && id) {
      const data = await SingleGame(id , token);
      console.log(data);
      
      setId(data?.games?.id);
      setName(data?.games?.name);
      setCategory(data?.games?.category);
      setPerson(data?.games?.person);
      setDescription(data?.games?.description);
      setLoading(false);
      }
    };

    fetchCourtData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

  
    const updatedData = await UpdateGame(
      id1,
      name,
      category || 'outdoor', // Ensure the value passed is parsed
      person,
      description,
      token
    );
  
    if (!updatedData.statusCode) {
      toast.success("Court updated successfully.");
      console.log(updatedData);
      router.push('/games')
      
    } else {
      toast.error("Failed to update the court.");
    }
  };

  if (loading) {
    return <div><Skeleton/></div>;
  }

  return (
    <div>
      <div className="min-h-screen w-full flex justify-center items-center">
        <div className="bg-white rounded-lg md:p-0 p-2 w-full max-w-6xl">
          <div className="flex items-center mb-4 gap-3">
            <Link href="/games" className="h-8 w-8 flex justify-center items-center pl-1 rounded-full bg-[#f9f9fb] text-primary1">
              <MdArrowBackIos size={15} />
            </Link>
            <h1 className="text-xl">
              Games / <span className="font-light">Edit Game</span>
            </h1>
          </div>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {/* Left Column */}
            <div className="space-y-4">
              <div className="flex justify-between">
                <div className="w-1/2 pr-2">
                  <label className="block text-sm">Name</label>
                  <input
                    type="text"
                    placeholder="Enter ground name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full mt-1 p-2 text-sm bg-[#f9f9fb] border-gray-300 rounded"
                  />
                </div>
                <div className="w-1/2 pr-2">
                  <label  className="block text-sm">Category</label>
                  <select className="w-full mt-1 p-2 text-sm bg-[#f9f9fb] border-gray-300 rounded" name="Category" value={category} id="" onChange={(e) => setCategory(e.target.value)}>
                    <option value="outdoor">Outdoor</option>
                    <option value="indoor">Indoor</option>
                    <option value="multi">Multi Purpose</option>
                  </select>
                  
                </div>
              </div>
              <div className="flex justify-between">
              <div className="w-1/2 pr-2">
                  <label className="block text-sm">Person</label>
                  <input
                    type="text"
                    placeholder="5 V 5"
                    value={person}
                    onChange={(e) => setPerson(e.target.value)}
                    className="w-full mt-1 p-2 text-sm bg-[#f9f9fb] border-gray-300 rounded"
                  />
                </div>
                <div className="w-1/2 pr-2">
                  <label className="block text-sm">Date</label>
                  <input
                    type="date"
                    placeholder="Location"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full mt-1 p-2 text-sm bg-[#f9f9fb] border-gray-300 rounded"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm">Description</label>
                <textarea
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full mt-1 p-2 border text-sm bg-[#f9f9fb] border-gray-300 rounded h-20"
                ></textarea>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div>
                <label className="block text-lg ml-3">Add Images</label>
                <div className="flex flex-wrap gap-2 mt-2 justify-center">
                  {[...Array(4)].map((_, index) => (
                    <label
                      key={index}
                      className="bg-[#f9f9fb] font-semibold text-base rounded max-w-md h-52 w-52 flex flex-col items-center justify-center cursor-pointer border border-gray-300"
                    >
                      <div className="h-14 w-14 rounded-full bg-[#ece8f2] flex justify-center items-center">
                        <FaPlus size={20} />
                      </div>
                      <input
                        type="file"
                        onChange={(e) => handleFileChange(e, setImages)}
                        className="hidden"
                        accept="image/*"
                      />
                      <p className="mt-4 text-sm tracking-wide text-black/60 font-light">
                        {index === 0 ? "Primary" : "Secondary"}
                      </p>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-lg">Add Videos</label>
                <div className="flex flex-wrap  gap-2 mt-2 justify-center">
                  {[...Array(2)].map((_, index) => (
                    <label
                      key={index}
                      className="bg-[#f9f9fb] font-semibold text-base rounded max-w-md h-52 w-52 flex flex-col items-center justify-center cursor-pointer border border-gray-300"
                    >
                      <div className="h-14 w-14 rounded-full bg-[#ece8f2] flex justify-center items-center">
                        <FaPlus size={20} />
                      </div>
                      <input
                        type="file"
                        onChange={(e) => handleFileChange(e, setVideos)}
                        className="hidden"
                        accept="video/*"
                      />
                      <p className="mt-4 text-sm tracking-wide text-black/60 font-light">
                        {index === 0 ? "Primary" : "Secondary"}
                      </p>
                    </label>
                  ))}
                </div>
              </div>
              <div className="mt-6 flex justify-center">
                <button
                  type="submit"
                  className="bg-primary1 text-white w-full ml-2 p-2 rounded hover:bg-primary1/80"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
