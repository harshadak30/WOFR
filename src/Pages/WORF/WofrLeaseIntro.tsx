import React from "react";
import { Link } from "react-router-dom";
import MainLayout from "../../component/Layout/MainLayout";
import backgroundImages from "../../../public/background";

const WofrLeaseIntro: React.FC = () => {
  return (
    <MainLayout>
      <div>
        <div className="flex flex-col lg:flex-row flex-wrap items-center justify-center mx-8 px-4">
          {/* Left Section - Text Content */}
          <div className="w-full lg:w-2/3 xl:w-2/4 max-w-2xl text-left mb-1 lg:mb-0">
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-[#0049AC] leading-tight">
              Streamline Your Lease Management with WOFR
            </h1>
            <p className="text-gray-600 mt-4 text-lg lg:text-xl xl:text-2xl">
              Simplify property management, automate rent collection, and
              maintain complete oversight of your lease portfolio with our
              comprehensive lease management solution.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <Link
                to="/register"
                className="bg-teal-600 text-white px-6 py-2 rounded-lg text-center"
              >
                Already user? Sign in
              </Link>
              <Link
                to="/free-trial"
                className="bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded-lg text-center"
              >
                Try WOFR Apps for Free
              </Link>
            </div>
          </div>

          {/* Right Section - Image */}
          <div className="w-full lg:w-1/3 xl:w-2/4 flex justify-center h-[90%]">
            <img
              src={backgroundImages.leaseIntroPage}
              alt="Lease Management Illustration"
              className="w-full max-w-lvh lg:max-w-full xl:max-w-6xl"
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default WofrLeaseIntro;
