import React from "react";
import { FaInstagram } from "react-icons/fa";
import { FaSquareFacebook } from "react-icons/fa6";
import { IoCallOutline } from "react-icons/io5";

const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-900 text-white py-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8 px-4">
        {/* Left Side - Logo and Text */}
        <div className="flex-1">
          <img src="background/company-logo.png" alt="Logo" className="mb-4 h-25" />
          <p className="mt-2">
            Lorem ipsum dolor sit amet consectetur. Dignissim augue egestas
            pretium elit diam dignissim elementum.
          </p>
          <div className="flex gap-5 mt-6 text-xl">
            <FaInstagram />
            <FaSquareFacebook />
            <IoCallOutline />
          </div>
        </div>

        {/* Right Side - Links */}
        <div className="grid grid-cols-2 gap-6 text-lg">
          <ul className="space-y-4">
            <li>Home</li>
            <li>Product</li>
            <li>About</li>
            <li>Blog</li>
          </ul>
          <ul className="space-y-4">
            <li>FAQ</li>
            <li>Community</li>
            <li>Join the Team</li>
            <li>Legal Stuff</li>
            <li>Terms of Service</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
