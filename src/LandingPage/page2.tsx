import React from "react";

export default function Page2() {
  return (
    <div className="bg-gray-50 w-full">
      <div className="p-5">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-20">
          <div className="md:w-2/5">
            <h1 className="text-6xl font-bold text-gray-800 leading-tight">
              Why Use WOFR Apps?
            </h1>
          </div>
          <div className="md:w-2/5 text-gray-500 text-lg mt-3">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis quasi possimus ratione, facere neque beatae eum at voluptate placeat mollitia obcaecati quidem cupiditate consectetur dolore laborum repellendus exercitationem. Maxime, omnis?
            </p>
          </div>
        </div>

        {/* Features Section */}
        <div className="relative mb-16">
          {/* Dotted Line */}
          <div className="hidden md:block absolute top-1/2 left-16 right-16 border-t-2 border-dashed border-blue-300 z-0"></div>

          {/* Cards Row */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
            {/* Support System Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8 md:w-1/3 transform md:-rotate-6 md:-translate-y-2 ">
              <div className=" w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <img src="/icons/support_agent.png" alt="" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">
                Support System
              </h3>
              <p className="text-gray-500 text-sm">
                Lorem ipsum dolor sit amet consectetur. In vel et accumsan
                lectus ut bibendum id.
              </p>
            </div>

            {/* Financial Management Card */}
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-xl p-8 md:w-1/3 text-white">
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <img src="/icons/account_balance_wallet.png" alt="" />
              </div>
              <h3 className="text-xl font-bold mb-4">Financial Management</h3>
              <p className="text-white/90 text-sm">
                Lorem ipsum dolor sit amet consectetur. Amet magna a aliquet
                praesent felis diam.
              </p>
            </div>

            {/* Safety Compliance Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8 md:w-1/3 transform md:rotate-6 md:-translate-y-2">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <img src="/icons/admin_panel_settings.png" alt="" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">
                Safety Compliance
              </h3>
              <p className="text-gray-500 text-sm">
                Lorem ipsum dolor sit amet consectetur. Cras adipiscing volutpat
                diam diam tempus sit orci pellentesque euismod.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center mt-12">
          <button className="bg-teal-500 hover:bg-teal-600 text-white font-medium py-3 px-8 rounded-md flex items-center gap-2 transition-all">
            Try WOFR Apps for Free
            <img src="/icons/arrow.png" alt="" />
          </button>
        </div>
      </div>
    </div>
  );
}
