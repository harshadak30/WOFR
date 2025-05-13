import { Link } from "react-router-dom";
import backgroundImages from "../../../public/background";

export default function HeroSection() {
  return (
    <section className="flex flex-col-reverse lg:flex-row items-center  py-12 max-w-screen-2xl mx-auto">
      {/* Left Side: Text Content */}
      <div className="w-full lg:w-1/2 lg:pr-10 mt-10 lg:mt-0">
        <h1 className=" text-4xl lg:text-5xl  2xl:text-6xl font-bold text-blue-800 mb-6 leading-tight">
          Automate today, lead tomorrow: Where financial excellence meets
          efficiency
        </h1>
        <p className="text-gray-600 mb-10 text-lg w-[90%]">
          Never at water me might. On formed merits hunted unable merely by mr
          whence or. Possession the unpleasing simplicity her uncommonly.
        </p>
        <Link
          to="/free-trial"
          className="inline-block bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-6 rounded transition duration-300 mt-5"
        >
          Explore our Universe for free
        </Link>
      </div>

      {/* Right Side: Image Content */}
      <div className="w-full lg:w-1/2 flex justify-center">
        <img
          src={backgroundImages.landingBackgroundTwo}
          alt="Hero Visual"
          className="max-w-full h-auto"
        />
      </div>
    </section>
  );
}
