import React from "react";
import { FaPhoneAlt, FaTooth } from "react-icons/fa";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="hidden md:flex py-6 justify-evenly bg-[#f4f9ff]">
      {/* left side */}
      <div className="flex items-center gap-8">
        <div className="flex justify-center items-center gap-3">
          <div className="text-blue-600">
            <FaTooth style={{ height: "30px", width: "30px" }} />
          </div>
          <span className="text-xl font-bold">DentalCare</span>
        </div>
        <label>Home</label>
        <label className="text-[#a2a7a9]">About</label>
        <label className="text-[#a2a7a9]">Services</label>
        <label className="text-[#a2a7a9]">Blog</label>
        <label className="text-[#a2a7a9]">Contact</label>
      </div>
      {/* right side */}
      <div className="flex justify-center items-center gap-6">
        <div className="bg-blue-600 text-white p-3 rounded-full">
          <FaPhoneAlt />
        </div>
        <label className="font-bold">+347-765-4321</label>
        <Link
          to="/register"
          className="bg-blue-600 hover:bg-blue-700 text-white text-center self-center py-2 px-4 rounded-full hover:no-underline"
        >
          Book Consultation
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
