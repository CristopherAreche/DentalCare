import React, { useState } from "react";
import { FaTooth } from "react-icons/fa";
import { RiCloseFill, RiMenu3Fill } from "react-icons/ri";
import { Link } from "react-router-dom";

const LandingPageSideBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <section
        className={`${
          isOpen ? "left-0" : "-left-full"
        } bg-background-300 md:hidden lg:w-[20%] w-[100%] shadow-lg z-50 flex flex-col  justify-between py-4 fixed h-screen transition-all duration-200 lg:left-0`}
      >
        <div className="flex items-center justify-center gap-2 px-1 py-3">
          <div className="text-blue-600">
            <FaTooth style={{ height: "30px", width: "30px" }} />
          </div>
          <span className="text-gray-900 text-3xl font-bold">Dental Care</span>
        </div>
        <div className="flex-1 py-8 flex flex-col gap-8 px-3">
          <Link
            to="/"
            className="text-xl text-center ring-1 ring-gray-400 py-2 rounded-md font-bold text-gray-900"
          >
            Home
          </Link>
          <Link
            to="/"
            className="text-xl text-center ring-1 ring-gray-400 py-2 rounded-md font-bold text-gray-900"
          >
            About
          </Link>
          <Link
            to="/"
            className="text-xl text-center ring-1 ring-gray-400 py-2 rounded-md font-bold text-gray-900"
          >
            Services
          </Link>
          <Link
            to="/"
            className="text-xl text-center ring-1 ring-gray-400 py-2 rounded-md font-bold text-gray-900"
          >
            Blog
          </Link>
          <Link
            to="/"
            className="text-xl text-center ring-1 ring-gray-400 py-2 rounded-md font-bold text-gray-900"
          >
            Contact
          </Link>
        </div>
        <div className="flex flex-col gap-0.5 pt-2 mb-10">
          {/* comentario */}
        </div>
      </section>
      <button
        className="absolute bottom-6 right-8 text-4xl lg:hidden bg-icon-100 text-white rounded-lg py-1 px-2 box-content z-50 text-light"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <RiCloseFill /> : <RiMenu3Fill />}
      </button>
    </>
  );
};

export default LandingPageSideBar;
