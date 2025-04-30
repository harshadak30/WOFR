import React, { useState } from "react";
import { TbWorld } from "react-icons/tb";
import { IoIosArrowDown } from "react-icons/io";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import { Link, NavLink } from "react-router-dom";

const openCalendly = () => {
  window.Calendly?.initPopupWidget({
    url: "https://calendly.com/maitriai-sales/business-meet",
    prefill: {},
    utm: {},
    parentElement: undefined,
    text: {
      submitText: "Schedule Meeting",
      headerText: "Book Your Demo Session",
    },
    color: {
      primary: "#2C3E50",
      secondary: "#3498DB",
      background: "#F8F9FA",
    },
    pageSettings: {
      height: 5500,
    },
  });
  return false;
};

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="w-full">
      {/* Announcement Bar */}
      <div className="bg-black flex flex-col sm:flex-row justify-between text-white text-center sm:text-left text-sm p-3">
        <div className="sm:ml-10">
          This announcement bar can be used to inform visitors of{" "}
          <span className="text-blue-600">something important!</span>
        </div>
        <div
          className="flex items-center justify-center sm:justify-end sm:mr-10 mt-2 sm:mt-0 cursor-pointer"
          onClick={() => setIsLanguageOpen(!isLanguageOpen)}
        >
          <TbWorld />
          <span className="mx-1">EN</span>
          <IoIosArrowDown />

          {isLanguageOpen && (
            <div className="absolute top-10 bg-white text-black p-2 rounded shadow-md z-50">
              <div className="py-1 px-4 hover:bg-gray-100 cursor-pointer">
                EN
              </div>
              <div className="py-1 px-4 hover:bg-gray-100 cursor-pointer">
                FR
              </div>
              <div className="py-1 px-4 hover:bg-gray-100 cursor-pointer">
                ES
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Logo and Social Links */}
      <div className="bg-white p-2 flex items-center justify-between">
        <img
          src="background/company-logo.png"
          alt="Logo"
          className="pl-4 md:pl-20 h-16 sm:h-20"
        />
        <div className="flex gap-3 sm:gap-5 text-gray-500 pr-4 md:pr-20">
          <FaFacebook className="text-lg sm:text-xl" />
          <FaInstagram className="text-lg sm:text-xl" />
          <FaTwitter className="text-lg sm:text-xl" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-[#0049AC] shadow-md relative">
        <div className="flex justify-between items-center p-4">
          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-6 text-white pl-4 md:pl-20">
            <li className="cursor-pointer hover:text-gray-300">Home</li>
            <li className="cursor-pointer hover:text-gray-300">About Us</li>
            <li className="cursor-pointer hover:text-gray-300">Services</li>
            <li className="cursor-pointer hover:text-gray-300">Resources</li>
            <li className="cursor-pointer hover:text-gray-300">Testimonials</li>
          </ul>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white pl-4" onClick={toggleMenu}>
            {isMenuOpen ? <RiCloseLine size={24} /> : <RiMenu3Line size={24} />}
          </button>

          {/* Buttons */}
          <div className="space-x-2 sm:space-x-4 pr-4 md:pr-10 flex items-center">
            <Link to={"/login"}>
              <button className="text-white px-2 sm:px-4 py-1 sm:py-2 rounded text-sm sm:text-base">
                Sign In
              </button>
            </Link>
            {/* <button className="bg-[#008F98] text-white px-2 sm:px-4 py-1 sm:py-2 rounded text-sm sm:text-base">
              Book a Demo
            </button> */}
            <NavLink to="/book-demo">
              <button
                className="bg-[#008F98] text-white px-4 py-2 rounded cursor-pointer"
                onClick={openCalendly}
              >
                Book a Demo
              </button>
            </NavLink>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden flex flex-col items-center space-y-4 py-4 bg-[#0049AC] text-white absolute w-full z-50">
            <ul className="space-y-4 w-full">
              <Link to="{/}"  className="cursor-pointer hover:bg-[#003d90] px-6 py-2 text-center">
                Home
              </Link>
              <Link to="{/explore-solutions}" className="cursor-pointer hover:bg-[#003d90] px-6 py-2 text-center">
                About Us
              </Link>
              <li className="cursor-pointer hover:bg-[#003d90] px-6 py-2 text-center">
                Services
              </li>
              <li className="cursor-pointer hover:bg-[#003d90] px-6 py-2 text-center">
                Resources
              </li>
              <li className="cursor-pointer hover:bg-[#003d90] px-6 py-2 text-center">
                Testimonials
              </li>
            </ul>
            <div className="space-y-4 w-full px-6 pb-2">
              <Link to={"/login"} className="block">
                <button className="w-full text-white border border-white px-4 py-2 rounded">
                  Sign In
                </button>
              </Link>
              <Link
                to="/book-demo"
                className="w-full bg-[#008F98] text-white px-4 py-2 rounded"
              >
                Book a Demo
              </Link>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Header;
