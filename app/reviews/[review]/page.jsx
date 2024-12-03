'use client'
import Link from "next/link";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { MdArrowBackIos } from "react-icons/md";
import { toast } from "react-toastify";
import { CreateCourt } from "../../../actions/Grounds"; // Ensure this path matches your project structure
import { useRouter } from "next/navigation";
const Page = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Outdoor");
  const [person, setPerson] = useState("5 V 5");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [customer, setCustomer] = useState("");
  const [ground, setGround] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");
  const [status, setStatus] = useState(true);
  const customers = []; // Add your customers array here
  const grounds = []; // Add your grounds array here

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
      <div className=" w-full flex justify-center items-center">
        <div className="bg-white rounded-lg md:p-0 p-2 w-full max-w-6xl">
          <div className="flex items-center mb-4 gap-3">
            <h1 className="text-xl">
              Reviews / <span className="font-light">Create Review</span>
            </h1>
          </div>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left Column */}
            <div className="space-y-4">
              <div className="flex justify-between">
                <div className="w-1/2 pr-2">
                  <label className="block text-sm">Customer</label>
                  <select
                    value={customer}
                    onChange={(e) => setCustomer(e.target.value)}
                    className="w-full mt-1 p-2 text-sm bg-[#f9f9fb] border-gray-300 rounded"
                  >
                    <option value="">Select Customer</option>
                    {/* Add options dynamically */}
                    {customers.map((customer) => (
                      <option key={customer.id} value={customer.id}>
                        {customer.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-1/2 pr-2">
                  <label className="block text-sm">Ground</label>
                  <select
                    value={ground}
                    onChange={(e) => setGround(e.target.value)}
                    className="w-full mt-1 p-2 text-sm bg-[#f9f9fb] border-gray-300 rounded"
                  >
                    <option value="">Select Ground</option>
                    {/* Add options dynamically */}
                    {grounds.map((ground) => (
                      <option key={ground.id} value={ground.id}>
                        {ground.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="w-full">
                <label className="block text-sm">Review</label>
                <textarea
                  type="text"
                  placeholder="Enter review"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  className="w-full mt-1 p-2 text-sm bg-[#f9f9fb] border-gray-300 rounded"
                />
              </div>
              <div className="flex justify-between gap-4">
              <div className="w-full">
                <label className="block text-sm">Rating</label>
                <input
                  type="number"
                  placeholder="Enter rating"
                  max={5}
                  min={1}
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  className="w-full mt-1 p-2 text-sm bg-[#f9f9fb] border-gray-300 rounded"
                />
              </div>
              <div className="w-full">
                <label className="block text-sm">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value === 'true')}
                  className="w-full mt-1 p-2 text-sm bg-[#f9f9fb] border-gray-300 rounded"
                >
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
              </div>
              </div>
            </div>
            {/* Right Column */}
            <div className="space-y-4">
              {/* Add any additional fields or components here */}
            </div>
            <div className="w-full">
              <button type="submit" className="px-4 py-2 bg-primary1 text-white rounded">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
