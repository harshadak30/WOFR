import React from "react";
import { FaInstagram } from "react-icons/fa";
import { FaSquareFacebook } from "react-icons/fa6";
import { IoCallOutline } from "react-icons/io5";
import backgroundImages from "../../../../public/background";

const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-900 text-white py-10 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10">
        <div className="flex-1">
          <img
            src={backgroundImages.companyLogo}
            alt="Logo"
            className="mb-4 h-16 w-auto"
          />
          <p className="text-sm md:text-base">
            Lorem ipsum dolor sit amet consectetur. Dignissim augue egestas
            pretium elit diam dignissim elementum.
          </p>
          <div className="flex gap-6 mt-6 text-2xl">
            <FaInstagram />
            <FaSquareFacebook />
            <IoCallOutline />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-6 text-sm md:text-base">
          <ul className="space-y-3">
            <li>Home</li>
            <li>Product</li>
            <li>About</li>
            <li>Blog</li>
          </ul>
          <ul className="space-y-3">
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
