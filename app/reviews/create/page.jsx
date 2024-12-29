'use client'
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Courts, GetAllUser } from "../../../actions/Grounds"; // Ensure this path matches your project structure
import { useRouter } from "next/navigation";

const Page = () => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [customer, setCustomer] = useState([]); // State to store customer list
  const [ground, setGround] = useState([]); // State to store ground list
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");
  const [status, setStatus] = useState(true);

  const [selectedCustomer, setSelectedCustomer] = useState(""); // Track selected customer ID
  const [selectedGround, setSelectedGround] = useState(""); // Track selected ground ID

  const router = useRouter();

  // Handles the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !amount || !description) {
      toast.error("Please fill all required fields.");
      return;
    }

    let parsedHourlyRate = parseFloat(amount);  
    if (isNaN(parsedHourlyRate)) {
      alert("Invalid hourly rate. Please provide a valid number.");
      return;
    }

    const result = await CreateCourt(name, description, parsedHourlyRate, 100); // Adjust min_down_payment as needed
    if (result.success) {
      toast.success("Court created successfully!");
      router.push('/grounds');
    } else {
      toast.error(`Failed to create court: ${result.error}`);
    }
  };

  useEffect(() => {
    async function getDetails() {
      const grounds = await Courts();
      const customers = await GetAllUser();
      
      setGround(grounds);
      setCustomer(customers);
      console.log(grounds, customers);
    }
    getDetails();
  }, []);

  return (
    <div>
      <div className="w-full flex justify-center items-center">
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
                    value={selectedCustomer}
                    onChange={(e) => setSelectedCustomer(e.target.value)} // Set selected customer ID
                    className="w-full mt-1 p-2 text-sm bg-[#f9f9fb] border-gray-300 rounded"
                  >
                    <option value="">Select Customer</option>
                    {customer.map((cust) => (
                      <option key={cust.id} value={cust.id}>
                        {cust.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-1/2 pr-2">
                  <label className="block text-sm">Ground</label>
                  <select
                    value={selectedGround}
                    onChange={(e) => setSelectedGround(e.target.value)} // Set selected ground ID
                    className="w-full mt-1 p-2 text-sm bg-[#f9f9fb] border-gray-300 rounded"
                  >
                    <option value="">Select Ground</option>
                    {ground.map((gr) => (
                      <option key={gr.id} value={gr.id}>
                        {gr.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="w-full">
                <label className="block text-sm">Review</label>
                <textarea
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
                    max={5}
                    min={1}
                    placeholder="Enter rating"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="w-full mt-1 p-2 text-sm bg-[#f9f9fb] border-gray-300 rounded"
                  />
                </div>
                <div className="w-full">
                  <label className="block text-sm">Status</label>
                  <select
                    value={status ? "published" : "pending"}
                    onChange={(e) => setStatus(e.target.value === "published")}
                    className="w-full mt-1 p-2 text-sm bg-[#f9f9fb] border-gray-300 rounded"
                  >
                    <option value="published">Published</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              {/* Add additional fields if necessary */}
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
