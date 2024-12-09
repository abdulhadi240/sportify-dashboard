'use client'
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { MdArrowBackIos } from "react-icons/md";
import { toast } from "react-toastify";
import { AllGames, CreateCourt } from "../../../actions/Grounds"; // Ensure this path matches your project structure
import { useRouter } from "next/navigation";
const Page = () => {

  const [name, setName] = useState("");
  const [type, setType] = useState("Multi Ground");
  const [game, setGame] = useState("Futsal");
  const [location, setLocation] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [allgames , setAllGames] = useState([]);


  useEffect(()=>{
    const fetchGame = async () => {
      const games = await AllGames();
      setGame(games[0].name);
      setAllGames(games);
      console.log(games);
    }
    fetchGame()
  },[])

  const router = useRouter()
  // Handles the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !location || !amount || !description) {
      toast.error("Please fill all required fields.");
      return;
    }

    let parsedHourlyRate = parseFloat(amount);  
    if (isNaN(parsedHourlyRate)) {
      alert("Invalid hourly rate. Please provide a valid number.");
      return;
    }

    const result = await CreateCourt(name, description, location, parsedHourlyRate, 100); // Adjust min_down_payment as needed
    if (!result.success) {
      toast.success("Court created successfully!");
      router.push('/grounds')
    } else {
      toast.error(`Failed to create court: ${result.error}`);
    }
  };

  const handleFileChange = (e, setState) => {
    const files = Array.from(e.target.files);
    const urls = files.map((file) => URL.createObjectURL(file));
    setState((prev) => [...prev, ...urls]);
  };

  return (
    <div>
      <div className="min-h-screen w-full flex justify-center items-center">
        <div className="bg-white rounded-lg md:p-0 p-2 w-full max-w-6xl">
          <div className="flex items-center mb-4 gap-3">
            <h1 className="text-xl">
              Grounds / <span className="font-light">Create Ground</span>
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
                <div className="w-1/2 pl-2">
                  <label className="block text-sm">Select Type</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full mt-1 p-2 text-sm bg-[#f9f9fb] border-gray-300 rounded"
                  >
                    <option>Multi Ground</option>
                    <option>Indoor</option>
                    <option>Outdoor</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="w-1/2 pr-2">
                  <label className="block text-sm">Select Games</label>
                  <select
                    value={game}
                    onChange={(e) => setGame(e.target.value)}
                    className="w-full mt-1 p-2 text-sm bg-[#f9f9fb] border-gray-300 rounded"
                  >
                  {allgames.map((data , index) => (
                    <option key={index}>{data.name}</option>

                  ))}
                  </select>
                </div>
                <div className="w-1/2 pr-2">
                  <label className="block text-sm">Location</label>
                  <input
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full mt-1 p-2 text-sm bg-[#f9f9fb] border-gray-300 rounded"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm">Amount</label>
                <input
                  type="number"
                  placeholder="Rs: 5000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full mt-1 p-2 border bg-[#f9f9fb] text-sm border-gray-300 rounded"
                />
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
                <div className="flex flex-wrap gap-2 mt-2 justify-center">
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
                  Create
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
