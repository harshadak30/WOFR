import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <div className="flex items-center p-5 ">
      {/* Left side - Text content */}
      <div className="w-1/2 pr-8 p-10">
        <h1 className="text-6xl font-bold text-blue-800 mb-4 w-[95%]">
          Automate today, lead tomorrow: Where financial excellence meets
          efficiency
        </h1>
        <p className="text-gray-600 mb-8 mt-8">
          Never at water me might. On formed merits hunted unable merely by mr
          whence or. Possession the unpleasing simplicity her uncommonly.
        </p>
        <Link to="/free-trial" className="bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 px-6 rounded">
          Explore our Universe for free
        </Link>
      </div>

      {/* Right side - Mobile app and world map visualization */}
      <div className="w-1/2 relative">
        <img src="background/Landingbg2.png" alt="" />
      </div>
    </div>
  );
}
