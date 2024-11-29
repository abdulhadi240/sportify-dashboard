import React from "react";

const Skeleton = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-6xl">
        {/* Header Section */}
        <div className="flex items-center mb-6">
          <div className="h-10 w-10  bg-[#f9f9fb] rounded-full animate-pulse"></div>
          <h1 className="ml-4 text-xl font-semibold text-gray-400">
            Grounds / <span className="font-light">Edit Ground</span>
          </h1>
        </div>

        {/* Form Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400">Name</label>
              <div className="w-full h-10  bg-[#f9f9fb] rounded animate-pulse"></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400">Select Type</label>
                <div className="w-full h-10  bg-[#f9f9fb] rounded animate-pulse"></div>
              </div>
              <div>
                <label className="block text-sm text-gray-400">Select Games</label>
                <div className="w-full h-10  bg-[#f9f9fb] rounded animate-pulse"></div>
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-400">Location</label>
              <div className="w-full h-10  bg-[#f9f9fb] rounded animate-pulse"></div>
            </div>
            <div>
              <label className="block text-sm text-gray-400">Amount</label>
              <div className="w-full h-10  bg-[#f9f9fb] rounded animate-pulse"></div>
            </div>
            <div>
              <label className="block text-sm text-gray-400">Description</label>
              <div className="w-full h-20  bg-[#f9f9fb] rounded animate-pulse"></div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Add Images */}
            <div>
              <label className="block text-lg text-gray-400 mb-4">Add Images</label>
              <div className="grid grid-cols-2 gap-4">
                {[...Array(4)].map((_, index) => (
                  <div
                    key={index}
                    className="w-40 h-40  bg-[#f9f9fb] rounded-lg flex flex-col items-center justify-center animate-pulse"
                  >
                    <div className="h-10 w-10 bg-gray-400 rounded-full"></div>
                    <p className="text-sm text-gray-400 mt-4">
                      {index === 0 ? "Primary" : "Secondary"}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Add Videos */}
            <div>
              <label className="block text-lg text-gray-400 mb-4">Add Videos</label>
              <div className="grid grid-cols-2 gap-4">
                {[...Array(2)].map((_, index) => (
                  <div
                    key={index}
                    className="w-40 h-40  bg-[#f9f9fb] rounded-lg flex flex-col items-center justify-center animate-pulse"
                  >
                    <div className="h-10 w-10 bg-gray-400 rounded-full"></div>
                    <p className="text-sm text-gray-400 mt-4">
                      {index === 0 ? "Primary" : "Secondary"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6 flex justify-center">
          <div className="w-full max-w-sm h-10  bg-[#f9f9fb] rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
