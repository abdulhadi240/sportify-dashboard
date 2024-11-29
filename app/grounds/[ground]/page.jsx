import Link from "next/link";
import React from "react";
import { FaPlus } from "react-icons/fa6";
import { MdArrowBackIos } from "react-icons/md";
import { SingleGround } from "../../../actions/Grounds";
const page = async ({params}) => {
  const data = await SingleGround(params.ground)
  return (
    <div>
      <div className="min-h-screen w-full  flex justify-center items-center">
        <div className="bg-white rounded-lg md:p-0 p-2 w-full max-w-6xl">
            <div className="flex items-center mb-4 gap-3">
                <Link href={'/grounds'} className="h-8 w-8 flex justify-center items-center pl-1 rounded-full bg-[#f9f9fb] text-primary1">
                    <MdArrowBackIos size={15}/>
                </Link>
          <h1 className="text-xl">Grounds / <span className="font-light">Edit Ground</span></h1>
          </div>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between">
                  <div className="w-1/2 pr-2">
                    <label className="block text-sm  ">Name</label>
                    <input
                      type="text"
                      value={data.name}
                      placeholder="Enter ground name"
                      className="w-full mt-1 p-2 text-sm bg-[#f9f9fb] border-gray-300 rounded"
                    />
                  </div>
                  <div className="w-1/2 pl-2">
                    <label className="block text-sm  ">Select Type</label>
                    <select
                      className="w-full mt-1 p-2 text-sm bg-[#f9f9fb] border-gray-300 rounded"
                    >
                      <option>Multi Ground</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="w-1/2 pr-2">
                  <label className="block text-sm  ">
                    Select Games
                  </label>
                  <select className="w-full mt-1 p-2 text-sm bg-[#f9f9fb] border-gray-300 rounded">
                    <option>Futsal</option>
                  </select>
                </div>
                <div className="w-1/2 pr-2">
                  <label className="block text-sm  ">Location</label>
                  <input
                    type="text"
                    value={data.court_location}
                    placeholder="Location"
                    className="w-full mt-1 p-2 text-sm bg-[#f9f9fb] border-gray-300 rounded"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm  ">Amount</label>
                <input
                  type="text"
                  value={data.hourly_rate}
                  placeholder="Rs: 5000"
                  className="w-full mt-1 p-2 border bg-[#f9f9fb] text-sm border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-sm  ">Description</label>
                <textarea
                value={data.description}
                  placeholder="Description"
                  className="w-full mt-1 p-2 border text-sm bg-[#f9f9fb] border-gray-300 rounded h-20"
                ></textarea>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div>
                <label className="block text-lg   ml-3">Add Images</label>
                <div className="flex flex-wrap gap-2 mt-2 justify-center">
                  {[...Array(5)].map((_, index) => (
                    // eslint-disable-next-line react/jsx-key
                    <label
                      for="uploadFile1"
                      class="bg-[#f9f9fb] font-semibold text-base rounded max-w-md h-52 w-52 flex flex-col items-center justify-center cursor-pointer border bg-[#f9f9fb]-[1px] border-gray-300  font-[sans-serif]"
                    >
                      <div className="h-14 w-14 rounded-full text-primary1 bg-[#ece8f2] flex justify-center items-center">
                        <FaPlus size={20} />
                      </div>
                      <input
                        type="file"
                        id="uploadFile1"
                        class="hidden"
                        accept="jpg, jpeg, png"
                      />{" "}
                      <p className="mt-4 text-sm tracking-wide text-black/60 font-light">
                        {index === 0 ? "Primary" : "Secondary"}
                      </p>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-lg  ">Add Videos</label>
                <div className="flex flex-wrap gap-2 mt-2 justify-center">
                  {[...Array(2)].map((_, index) => (
                    // eslint-disable-next-line react/jsx-key
                    <label
                      for="uploadFile1"
                      class="bg-[#f9f9fb] font-semibold text-base rounded max-w-md h-52 w-52 flex flex-col items-center justify-center cursor-pointer border bg-[#f9f9fb]-[1px] border-gray-300  font-[sans-serif]"
                    >
                      <div className="h-14 w-14 rounded-full text-primary1 bg-[#ece8f2] flex justify-center items-center">
                        <FaPlus size={20} />
                      </div>
                      <input
                        type="file"
                        id="uploadFile1"
                        class="hidden"
                        accept="video/mp4, video/ogg, video/quicktime"
                      />{" "}
                      <p className="mt-4 text-sm tracking-wide text-black/60 font-light">
                        {index === 0 ? "Primary" : "Secondary"}
                      </p>
                    </label>
                  ))}
                </div>
              </div>
              <div className="mt-6 flex justify-center">
            <button className="bg-primary1 text-white w-full ml-2 p-2 rounded hover:bg-primary1/80">
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

export default page;
