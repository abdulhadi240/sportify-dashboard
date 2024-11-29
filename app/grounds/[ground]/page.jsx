'use client';

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa6";
import { MdArrowBackIos } from "react-icons/md";
import { SingleCourt } from "../../../actions/Grounds";
import { UpdateCourt } from "../../../actions/Grounds";  // Import the UpdateCourt function

const Page = ({ params }) => {
  const [name, setName] = useState("");
  const [courtLocation, setCourtLocation] = useState("");
  const [hourlyRate, setHourlyRate] = useState(5000);
  const [description, setDescription] = useState("");
  const [gameType, setGameType] = useState("Futsal");
  const [courtType, setCourtType] = useState("Multi Ground");
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true); // To handle loading state
  const [courtId, setCourtId] = useState(null);  // To store the court ID for updating

  useEffect(() => {
    const fetchCourtData = async () => {
      const data = await SingleCourt(params.ground);
      setName(data.name || "");
      setCourtLocation(data.court_location || "");
      setHourlyRate(data.hourly_rate || 5000);
      setDescription(data.description || "");
      setCourtId(data.id); // Set the court ID for future updates
      setLoading(false); // Set loading to false after data is fetched
    };

    fetchCourtData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Ensure hourlyRate is a valid number
    let parsedHourlyRate = parseFloat(hourlyRate);
  
    // Log the parsed value for debugging
    console.log("Parsed hourlyRate:", parsedHourlyRate);
  
    if (isNaN(parsedHourlyRate)) {
      alert("Invalid hourly rate. Please provide a valid number.");
      return;
    }
  
    if (!courtId) {
      alert("Court ID is missing, cannot update.");
      return;
    }
  
    if (!courtLocation || typeof courtLocation !== 'string') {
      alert("Court location is required and must be a valid string.");
      return;
    }
  
    const minDownPayment = 100;
  
    // Log the request body to verify the data being sent
    console.log({
      name: name,
      description: description,
      court_location: courtLocation,
      hourly_rate: parsedHourlyRate,
      min_down_payment: minDownPayment
    });
  
    const updatedData = await UpdateCourt(
      courtId,
      name,
      description,
      courtLocation,
      parsedHourlyRate,  // Ensure the value passed is parsed
      minDownPayment
    );
  
    if (!updatedData.statusCode) {
      alert("Court updated successfully!");
    } else {
      alert("Failed to update the court.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="min-h-screen w-full flex justify-center items-center">
        <div className="bg-white rounded-lg md:p-0 p-2 w-full max-w-6xl">
          <div className="flex items-center mb-4 gap-3">
            <Link href="/grounds" className="h-8 w-8 flex justify-center items-center pl-1 rounded-full bg-[#f9f9fb] text-primary1">
              <MdArrowBackIos size={15} />
            </Link>
            <h1 className="text-xl">
              Grounds / <span className="font-light">Edit Ground</span>
            </h1>
          </div>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between">
                  <div className="w-1/2 pr-2">
                    <label className="block text-sm">Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter ground name"
                      className="w-full mt-1 p-2 text-sm bg-[#f9f9fb] border-gray-300 rounded"
                    />
                  </div>
                  <div className="w-1/2 pl-2">
                    <label className="block text-sm">Select Type</label>
                    <select
                      className="w-full mt-1 p-2 text-sm bg-[#f9f9fb] border-gray-300 rounded"
                      value={courtType}
                      onChange={(e) => setCourtType(e.target.value)}
                    >
                      <option>Multi Ground</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="w-1/2 pr-2">
                  <label className="block text-sm">Select Games</label>
                  <select
                    className="w-full mt-1 p-2 text-sm bg-[#f9f9fb] border-gray-300 rounded"
                    value={gameType}
                    onChange={(e) => setGameType(e.target.value)}
                  >
                    <option>Futsal</option>
                  </select>
                </div>
                <div className="w-1/2 pr-2">
                  <label className="block text-sm">Location</label>
                  <input
                    type="text"
                    value={courtLocation}
                    onChange={(e) => setCourtLocation(e.target.value)}
                    placeholder="Location"
                    className="w-full mt-1 p-2 text-sm bg-[#f9f9fb] border-gray-300 rounded"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm">Amount</label>
                <input
                  type="number"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(e.target.value)}
                  placeholder="Rs: 5000"
                  className="w-full mt-1 p-2 border bg-[#f9f9fb] text-sm border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-sm">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description"
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
                      htmlFor="uploadFile1"
                      className="bg-[#f9f9fb] font-semibold text-base rounded max-w-md h-52 w-52 flex flex-col items-center justify-center cursor-pointer border bg-[#f9f9fb]-[1px] border-gray-300 font-[sans-serif]"
                    >
                      <div className="h-14 w-14 rounded-full text-primary1 bg-[#ece8f2] flex justify-center items-center">
                        <FaPlus size={20} />
                      </div>
                      <input
                        type="file"
                        id="uploadFile1"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => setImages(e.target.files)}
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
                <div className="flex flex-wrap gap-2 mt-2 justify-center">
                  {[...Array(2)].map((_, index) => (
                    <label
                      key={index}
                      htmlFor="uploadFile1"
                      className="bg-[#f9f9fb] font-semibold text-base rounded max-w-md h-52 w-52 flex flex-col items-center justify-center cursor-pointer border bg-[#f9f9fb]-[1px] border-gray-300 font-[sans-serif]"
                    >
                      <div className="h-14 w-14 rounded-full text-primary1 bg-[#ece8f2] flex justify-center items-center">
                        <FaPlus size={20} />
                      </div>
                      <input
                        type="file"
                        id="uploadFile1"
                        className="hidden"
                        accept="video/*"
                        onChange={(e) => setVideos(e.target.files)}
                      />
                      <p className="mt-4 text-sm tracking-wide text-black/60 font-light">
                        {index === 0 ? "Primary" : "Secondary"}
                      </p>
                    </label>
                  ))}
                </div>
              </div>
              <div className="mt-6 flex justify-center">
                <button type="submit" className="bg-primary1 text-white w-full ml-2 p-2 rounded hover:bg-primary1/80">
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
