import React from "react";

export default function Page1() {
  return (
    <div className="flex items-center p-5 ">
      {/* Left side - Text content */}
      <div className="w-1/2 pr-8">
        <h1 className="text-6xl font-bold text-blue-800 mb-4">
          Automate today, lead tomorrow: Where financial excellence meets
          efficiency
        </h1>
        <p className="text-gray-600 mb-8">
          Never at water me might. On formed merits hunted unable merely by mr
          whence or. Possession the unpleasing simplicity her uncommonly.
        </p>
        <button className="bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 px-6 rounded">
          Explore our Universe for free
        </button>
      </div>

      {/* Right side - Mobile app and world map visualization */}
      <div className="w-1/2 relative">
        <img src="background/backgroundAPP.png" alt="" />
      </div>
    </div>
  );
}
