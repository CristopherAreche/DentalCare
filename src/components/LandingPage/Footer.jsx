import React from "react";
import { FaTooth } from "react-icons/fa";
import { RiFacebookFill, RiLinkedinFill } from "react-icons/ri";
import { FaTwitter } from "react-icons/fa6";
import { BsInstagram } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="w-full h-auto md:h-screen md:px-[7em]  bottom-0 flex flex-col justify-center text-[#f4f9ff] py-8 md:pt-14 text-lg bg-gradient-to-r from-[#0E264B] to-[#3e66a1]">
      <div className="flex gap-6 md:gap-0 flex-col md:flex-row pb-12 border-b-2 border-blue-200">
        <div className="flex flex-col gap-6 w-full items-center md:items-start md:w-1/2">
          <div className="flex gap-2 items-center">
            <FaTooth className="text-2xl text-blue-600" />
            <h2 className="text-2xl font-bold">DentalCare</h2>
          </div>
          <p className="text-lg text-center md:text-start px-10 md:px-0  md:pr-[13em] text-blue-200">
            We are dedicated to providing you and your family with top-quality
            dental care in a comfortable and welcoming environment.
          </p>
          <div className="flex gap-3">
            <RiFacebookFill className="text-4xl rounded-full p-2 bg-blue-600" />
            <RiLinkedinFill className="text-4xl rounded-full p-2 bg-blue-600/30" />
            <FaTwitter className="text-4xl rounded-full p-2 bg-blue-600/30" />
            <BsInstagram className="text-4xl rounded-full p-2 bg-blue-600/30" />
          </div>
        </div>

        <div className="w-full gap-6 md:gap-0 md:w-1/2 flex flex-col md:flex-row">
          <div className="w-full md:w-[40%] flex flex-col gap-6 items-center md:items-start">
            <h2 className="text-2xl font-bold">Working Days</h2>
            <div className="flex flex-col gap-3">
              <p className="text-blue-200">Monday - Friday</p>
              <p className="text-blue-200">9:00 am - 6:00am</p>
            </div>
          </div>

          <div className="w-full md:w-[60%] flex flex-col gap-6 items-center md:items-start">
            <h2 className="text-2xl font-bold">Location</h2>
            <p className="text-blue-200 text-center md:text-start">
              <span className="font-bold text-white">Address: </span> Seddon
              Road, (H3, Private Bag 3010, Hamilton), Seddon Road, Frankton,
              Hamilton 3204, New Zealand
            </p>
            <p className="text-blue-200">
              <span className="font-bold text-white">Phone: </span>{" "}
              +809-123-1223
            </p>
            <p className="text-blue-200">
              <span className="text-white font-bold">Email: </span>{" "}
              crisotpherareche764@gmail.com
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center md:items-start md:justify-between pt-10">
        <p className="text-blue-200">
          2023 Cristopher Areche All rights reserved.
        </p>
        <div className="flex gap-8">
          <p className="text-blue-200">Terms & Conditions</p>
          <p className="text-blue-200">Privacy Policy</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
