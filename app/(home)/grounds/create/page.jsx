"use client";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { toast } from "react-toastify";
import { AllGames, CreateCourt } from "@/actions/Grounds"; // Ensure this path matches your project structure
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaTimes } from "react-icons/fa";

const daysOfWeek = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];
const courtTypes = ["indoor", "outdoor", "multipurpose"];

const Page = () => {
  const [courtData, setCourtData] = useState({
    name: "",
    court_type: "",
    description: "",
    court_location: "",
    hourly_rate: 0,
    min_down_payment: 0,
    availability: daysOfWeek.map((day) => ({
      day,
      start_time: "09:00",
      end_time: "17:00",
    })),
    games: [], // Store selected game IDs here
  });

  const [allGames, setAllGames] = useState([]);
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourtData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvailabilityChange = (day, field, value) => {
    setCourtData((prev) => ({
      ...prev,
      availability: prev.availability.map((a) =>
        a.day === day ? { ...a, [field]: value } : a
      ),
    }));
  };
  const removeFile = (index, setFiles) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };
  const handleGameToggle = (gameId) => {
    setCourtData((prev) => ({
      ...prev,
      games: prev.games.includes(gameId)
        ? prev.games.filter((id) => id !== gameId)
        : [...prev.games, gameId],
    }));
  };

  useEffect(() => {
    const fetchGames = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
      } else {
        const games = await AllGames(token);
        setAllGames(games); // Assuming AllGames returns an array of game objects
      }
    };
    fetchGames();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const {
      name,
      description,
      court_location,
      hourly_rate,
      min_down_payment,
      court_type,
      availability,
      games,
    } = courtData;
  
    // Validate required fields
    if (
      !name ||
      !court_location ||
      !hourly_rate ||
      !description ||
      !court_type ||
      games.length === 0
    ) {
      toast.error(
        "Please fill all required fields and select at least one game."
      );
      return;
    }
  
    // Parse and validate hourly rate
    let parsedHourlyRate = parseFloat(hourly_rate);
    if (isNaN(parsedHourlyRate)) {
      toast.error("Invalid hourly rate. Please provide a valid number.");
      return;
    }
  
    // Create a FormData object
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("court_location", court_location);
    formData.append("hourly_rate", parsedHourlyRate);
    formData.append("min_down_payment", min_down_payment);
    formData.append("court_type", court_type);
    formData.append("availability", JSON.stringify(availability));
    formData.append("games", JSON.stringify(games));
  
    // Append images and videos under "files"
    [...images, ...videos].forEach((fileObj,index) => {
      formData.append(`files`, fileObj.file); // Use "files" as the field name
    });
    
    try {
      const result = await CreateCourt(formData, token);
      if (result.statusCode !== 400) {
        toast.success("Court created successfully!");
      } else {
        toast.error(`Failed to create court: ${result.error}`);
      }
    } catch (error) {
      toast.error(`An error occurred: ${error.message}`);
    }
  };

  const handleFileChange = (e, setFiles) => {
    const files = Array.from(e.target.files).map((file) => {
      const previewUrl = URL.createObjectURL(file);
      return { file, previewUrl };
    });
  
    setFiles((prev) => [...prev, ...files]);
  };

  return (
    <div>
      <div className="w-full flex justify-center items-center">
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
            <div className="container mx-auto p-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">
                    Create New Court
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Court Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={courtData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="court_type">Court Type</Label>
                        <Select
                          name="court_type"
                          value={courtData.court_type}
                          onValueChange={(value) =>
                            setCourtData((prev) => ({
                              ...prev,
                              court_type: value,
                            }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select court type" />
                          </SelectTrigger>
                          <SelectContent>
                            {courtTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Input
                        id="description"
                        name="description"
                        value={courtData.description}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="court_location">Court Location</Label>
                        <Input
                          id="court_location"
                          name="court_location"
                          value={courtData.court_location}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="hourly_rate">
                          Hourly Rate (in cents)
                        </Label>
                        <Input
                          id="hourly_rate"
                          name="hourly_rate"
                          type="number"
                          value={courtData.hourly_rate}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="min_down_payment">
                        Minimum Down Payment (%)
                      </Label>
                      <Input
                        id="min_down_payment"
                        name="min_down_payment"
                        type="number"
                        value={courtData.min_down_payment}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label className="block mb-2">Availability</Label>
                      <div className="space-y-2">
                        {courtData.availability.map(
                          ({ day, start_time, end_time }) => (
                            <div
                              key={day}
                              className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2"
                            >
                              <span className="w-24 font-medium">
                                {day.charAt(0).toUpperCase() + day.slice(1)}
                              </span>
                              <div className="flex items-center space-x-2">
                                <Input
                                  type="time"
                                  value={start_time}
                                  onChange={(e) =>
                                    handleAvailabilityChange(
                                      day,
                                      "start_time",
                                      e.target.value
                                    )
                                  }
                                  className="w-32"
                                />
                                <span>to</span>
                                <Input
                                  type="time"
                                  value={end_time}
                                  onChange={(e) =>
                                    handleAvailabilityChange(
                                      day,
                                      "end_time",
                                      e.target.value
                                    )
                                  }
                                  className="w-32"
                                />
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                    <div>
                      <Label className="block mb-2">Games</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {allGames?.map((game) => (
                          <div key={game.id} className="flex items-center">
                            <Checkbox
                              checked={courtData.games.includes(game.id)}
                              onCheckedChange={() => handleGameToggle(game.id)}
                              id={`game-${game.id}`}
                            />
                            <Label htmlFor={`game-${game.id}`} className="ml-2">
                              {game.name}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div>
                <label className="block text-lg ml-3">Add Images</label>
                <div className="flex flex-wrap gap-2 mt-2 justify-center">
                  {[...Array(4)].map((_, index) => (
                    <label
                      key={index}
                      className="relative bg-[#f9f9fb] font-semibold text-base rounded max-w-md h-52 w-52 flex flex-col items-center justify-center cursor-pointer border border-gray-300"
                    >
                      {images[index] ? (
                        <>
                          <img
                            src={images[index].previewUrl}
                            alt={`Preview ${index}`}
                            className="h-full w-full object-cover rounded"
                          />
                          <button
                            type="button"
                            onClick={() => removeFile(index, setImages)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 shadow hover:bg-red-600"
                          >
                            <FaTimes size={12} />
                          </button>
                        </>
                      ) : (
                        <>
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
                        </>
                      )}
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
                      className="relative bg-[#f9f9fb] font-semibold text-base rounded max-w-md h-52 w-52 flex flex-col items-center justify-center cursor-pointer border border-gray-300"
                    >
                      {videos[index] ? (
                        <>
                          <video
                            src={videos[index].previewUrl}
                            controls
                            className="h-full w-full object-cover rounded"
                          />
                          <button
                            type="button"
                            onClick={() => removeFile(index, setVideos)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 shadow hover:bg-red-600"
                          >
                            <FaTimes size={12} />
                          </button>
                        </>
                      ) : (
                        <>
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
                        </>
                      )}
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
