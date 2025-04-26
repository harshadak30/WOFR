import React, { useState } from "react";
import { TbWorld } from "react-icons/tb";
import { IoIosArrowDown } from "react-icons/io";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <div>
      <div className="bg-black flex justify-between text-white text-left text-sm p-3 ">
        <div className="ml-10">
          This announcement bar can be used to inform visitors of{" "}
          <span className="text-blue-600">something important!</span>
        </div>
        <h1 className="flex items-center justify-end mr-10 ">
          <TbWorld  />
          EN <IoIosArrowDown  />
        </h1>
      </div>

      <div className="bg-white p-2 flex items-center justify-between">
        <img src="background/company-logo.png" alt="Logo" className="pl-4 md:pl-20 h-20" />
        <div className="flex gap-5 text-gray-500 pr-4 md:pr-20">
          <FaFacebook />
          <FaInstagram />
          <FaTwitter />
        </div>
      </div>

      <nav className="bg-[#0049AC] shadow-md">
        <div className="flex justify-between items-center p-4">
          <ul className="hidden md:flex space-x-6 text-white pl-4 md:pl-20">
            <li>Home</li>
            <li>About Us</li>
            <li>Services</li>
            <li>Resources</li>
            <li>Testimonials</li>
          </ul>

          <div className="space-x-4 pr-4 md:pr-10 flex items-center">
            <Link to={"/login"}>
              <button className="text-white px-4 py-2 rounded">Sign In</button>
            </Link>
            <button className="bg-[#008F98] text-white px-4 py-2 rounded">
              Book a Demo
            </button>
            <button
              className="block md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <IoIosArrowDown />
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden flex flex-col items-center space-y-4 py-4 bg-[#0049AC] text-white">
            <ul className="space-y-2">
              <li>Home</li>
              <li>About Us</li>
              <li>Services</li>
              <li>Resources</li>
              <li>Testimonials</li>
            </ul>
            <div className="space-y-4">
              <Link to={"/login"}>
                <button className="w-full text-white px-4 py-2 rounded">
                  Sign In
                </button>
              </Link>
              <button className="w-full bg-[#008F98] text-white px-4 py-2 rounded">
                Book a Demo
              </button>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Header;
