import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CiLocationOn } from "react-icons/ci";
import { FaTooth } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { LiaStarSolid } from "react-icons/lia";
import hero from "../assets/dentista.avif";
import hero2 from "../assets/login_image.avif";
import hero3 from "../assets/hero_2.jpg";
import circle from "../assets/Ellipse.svg";
import { RiCloseFill, RiMenu3Fill } from "react-icons/ri";
import LandingPageSideBar from "../components/LandingPageSideBar";

const Landing = () => {
  return (
    <div className="flex flex-col h-[100vh] w-[100vw]">
      {/* Header */}
      <div className="w-full flex justify-between text-[#f4f9ff] py-2 md:py-4 md:px-[11em] text-lg bg-gradient-to-r from-[#0E264B] to-[#3e66a1]">
        <div className="w-full flex md:justify-start justify-center items-center gap-3">
          <div className="text-white font-bold flex justify-center items-center">
            <CiLocationOn style={{ height: "30px", width: "30px" }} />
          </div>
          <p>Bronx, New York</p>
        </div>
        <p className="hidden md:flex justify-end w-full">
          Monday to Friday 9:00 AM - 6:00 AM
        </p>
      </div>
      {/* Navbar */}
      <div className="hidden md:flex py-6 justify-evenly bg-[#f4f9ff]">
        {/* left */}
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
        {/* right */}
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
      {/* Hero */}
      <div className="flex justify-center h-screen w-screen  pt-20 px-[8em] bg-gradient-to-r from-[#0E264B] to-[#3e66a1] ">
        <div className="flex justify-start gap-10  ">
          {/* left */}
          <div className="hidden md:flex justify-center gap-14 w-[70%]">
            <div>
              <div className="flex gap-12 flex-col">
                <img
                  className="rounded-t-full"
                  style={{ height: "16em", width: "14em" }}
                  src={hero3}
                  alt="hero"
                />
                <img
                  className="rounded-b-full"
                  style={{ height: "16em", width: "14em" }}
                  src={hero2}
                  alt="hero"
                />
              </div>
            </div>
            <div className=" flex flex-col pt-[9em]">
              <img
                // style={{ height: "6em", width: "8em" }}
                className="absolute top-[14.5em] w-[4.8em]"
                src={circle}
                alt="svg"
              />
              <img
                className="rounded-t-full"
                style={{ height: "16em", width: "14em" }}
                src={hero}
                alt="hero"
              />
              <img
                // style={{ height: "6em", width: "8em" }}
                className="absolute top-[42em] w-[6.8em]"
                src={circle}
                alt="svg"
              />
            </div>
          </div>
          {/* right */}
          <div className="w-full md:w-[40%] flex flex-col ">
            <div className="w-[90%] flex flex-col gap-10">
              <p className="text-[#f4f9ff] font-bold text-[5em] md:text-[6.7em] text-center md:text-start leading-[1em]">
                Smile better with us
              </p>

              <p className="text-[#8b9fba] text-lg text-center md:text-start text-md">
                We are dedicated to providing you and your family with
                top-quality dental care in a confortabe and welcoming enviroment
              </p>
              <div className="flex flex-col gap-6 md:flex-row justify-center items-center md:justify-between">
                <Link
                  to="/register"
                  className="bg-blue-600 hover:bg-blue-700 text-white text-center self-center py-2 px-4 rounded-full hover:no-underline"
                >
                  Book Consultation
                </Link>
                <div className="flex flex-col">
                  <div className="flex gap-2 text-yellow-400">
                    <LiaStarSolid />
                    <LiaStarSolid />
                    <LiaStarSolid />
                    <LiaStarSolid />
                    <LiaStarSolid />
                    <p className="text-[#f4f9ff]">(4.9)</p>
                  </div>
                  <p className="text-[#8b9fba]">30K+ rating on google</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <LandingPageSideBar />
    </div>
  );
};

export default Landing;
