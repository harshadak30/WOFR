import React from "react";

export default function Page3() {
  return (
    <div className="">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Experience Seamless Financial Management with WOFR
        </h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Lease Management Section */}
        <div className="bg-gray-50 rounded-3xl p-5">
          <div className="flex items-start mb-4">
            <img src="/public/Frame 17.png" alt="" className="size-12" />
          </div>
          <h2 className="text-2xl font-semibold mb-1">
            Manage Leases with Ease
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Gain full control over lease agreements while ensuring compliance.
          </p>

          <img src="/public/Animation_card_1.png" alt="" />
        </div>

        {/* ESOP Administration Section */}
        <div className="bg-gray-50 p-6 rounded-lg">
        <div className="flex items-start mb-4">
            <img src="/public/Frame 17 (1).png" alt="" className="size-12" />
          </div>
          
          <h2 className="text-2xl font-semibold mb-1">
            Effortless ESOP Administration
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Simplify equity distribution and employee stock management.
          </p>

          <img src="/public/Component 1.png" alt="" />
        </div>
      </div>

      {/* Trial Balance Section */}
      <div className="bg-gray-50 p-5 rounded-3xl">
        <img src="/public/icon (2).png" alt="" className="object-contain size-12" />
        <div className=" mt-6 flex ">
          <div className="w-[40%] mt-3 ">
            <h2 className="text-4xl font-semibold mb-1">
              Automated Trial Balance Consolidation
            </h2>
            <p className="text-md text-gray-600 ">
              Streamline financial reporting with accurate TB generation.
            </p>
          </div>

          <div className=" w-[60%]">
          <img
            src="/public/Dotted_Map_White_Background_1-removebg-preview.png"
            alt="World map visualization"
            className="w-full h-auto object-cover -mt-20  "
    
          />
          </div>
        </div>
      </div>

      {/* Bottom Feature Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-4">
        {/* Multi-currency Support */}
        <div className=" bg-gray-50 rounded-3xl relative">
        <img src="/public/icon (3).png" alt="" className="size-14 m-4" />
          <h3 className="text-xl font-semibold m-4">
            Hold money in 30+ currencies
          </h3>
         <img src="/public/Frame 186377.png" alt="" className="absolute bottom-0" />
        </div>

        {/* Subscription Management */}
        <div className="bg-gray-50 rounded-3xl relative">
         <img src="/public/icon (4).png" alt="" className="size-14 m-4" />
          <h3 className="text-xl font-semibold m-4 ">
            Subscriptions you control in one place
          </h3>
          <img src="/public/Frame 2.png" alt="" className="absolute bottom-0 w-full " />
        </div>

        {/* Other Features Card */}
        <div className="bg-gray-50 cursor-pointer h-80 rounded-3xl">
          <img src="/public/Frame 186349.png" alt="" className="h-80 w-full" />
        </div>
      </div>

      {/* Bottom Measurement */}
     
    </div>
  );
}
