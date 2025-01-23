"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import { MdArrowBackIos } from "react-icons/md";
import { AllGames, SingleCourt, UpdateCourt } from "@/actions/Grounds"; // API actions
import { toast } from "react-toastify";
import Skeleton from "@/components/Skeleton";
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
import { HoverCard, HoverCardContent } from "@/components/ui/hover-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
const Page = ({ params }) => {
  const [courtData, setCourtData] = useState({
    name: "",
    court_location: "",
    hourly_rate: 5000,
    description: "",
    court_type: "Multi Ground",
    min_down_payment: 10,
    availability: [],
    games: [],
  });
  const [courtId, setCourtId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [allGames, setAllGames] = useState([]);
  const courtTypes = ["Multipurpose", "Indoor", "Outdoor"];
  const router = useRouter();
  useEffect(() => {
    const fetchCourtData = async () => {
      const token = localStorage.getItem("token");
      console.log(params.ground);
      console.log(token);
      if (!token) {
        router.push("/login");
      } else {
        const data = await SingleCourt(params.ground, token);
        console.log(data);
        
        const games = await AllGames(token);
        setAllGames(games); // Assuming AllGames returns an array of game objects

         setCourtData({
        name: data.name || "",
        court_location: data.court_location || "",
        hourly_rate: data.hourly_rate || 5000,
        description: data.description || "",
        court_type:
        courtTypes.find(
          (type) => type.toLowerCase() === data.court_type.toLowerCase()
        ) || "multipurpose",        min_down_payment: data.min_down_payment || 10,
        availability: data.court_availability || [],
        games: data.game_links.map((link) => link.game_id) || [],
      });

        setCourtId(data.id);
        const media = data.court_media || [];
      const fetchedImages = media
        .filter((item) => item.media_type === "image")
        .map((item) => ({
          file: null, // We don't have the original file, only a URL
          previewUrl: item.media_link,
        }));

      const fetchedVideos = media
        .filter((item) => item.media_type === "video")
        .map((item) => ({
          file: null, // Same as above
          previewUrl: item.media_link,
        }));

      setImages(fetchedImages);
      setVideos(fetchedVideos);
        setLoading(false);
      }
    };

    fetchCourtData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourtData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvailabilityChange = (day, field, value) => {
    setCourtData((prev) => ({
      ...prev,
      availability: prev.availability.map((avail) =>
        avail.day === day ? { ...avail, [field]: value } : avail
      ),
    }));
  };

  const handleGameToggle = (gameId) => {
    setCourtData((prev) => ({
      ...prev,
      games: prev.games.includes(gameId)
        ? prev.games.filter((id) => id !== gameId)
        : [...prev.games, gameId],
    }));
  };

  const handleFileChange = (e, setFiles) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setFiles((prev) => [...prev, { file, previewUrl }]);
    }
  };

  const removeFile = (index, setFiles) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const parsedHourlyRate = parseFloat(courtData.hourly_rate);
    if (isNaN(parsedHourlyRate)) {
      alert("Invalid hourly rate. Please provide a valid number.");
      return;
    }

    const updatedData = await UpdateCourt(
      courtId,
      courtData.name,
      courtData.description,
      courtData.court_location,
      parsedHourlyRate,
      courtData.min_down_payment,
      token
    );

    if (!updatedData.statusCode) {
      toast.success("Court updated successfully.");
    } else {
      toast.error("Failed to update the court.");
    }
  };

  if (loading) {
    return <Skeleton />;
  }

  return (
    <div>
    <div className="w-full flex justify-center items-center">
      <div className="bg-white rounded-lg md:p-0 p-2 w-full max-w-6xl">
        <div className="flex items-center mb-4 gap-3">
          <h1 className="text-xl">
            Grounds / <span className="font-light">Edit Ground</span>
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
                  Edit Court
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
                Update
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
