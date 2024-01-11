import React from "react";
import { FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";

const SectionThree = () => {
  return (
    <div className="flex flex-col pb-20 justify-center max-w-screen py-20 px-10 text-center md:text-start md:px-[8em]  bg-gradient-to-r from-[#0E264B] to-[#3e66a1] ">
      <div className="flex flex-col md:flex-row items-center mb-10 md:mb-20 gap-6 md:gap-0">
        <h1 className="text-[3em] w-full md:w-1/2 md:text-[5em] font-bold text-white leading-[1em]">
          A reason for smiling
        </h1>
        <p className="w-full md:w-1/2 md:text-xl text-gray-200 md:ml-24">
          We have service by contacting the doctor online for consultation about
          your dental health or asking for work schedules at the clinic
        </p>
      </div>
      <div className="container flex flex-col gap-6 w-full h-full">
        <iframe
          className="w-full h-[13em] md:h-[42em] rounded-2xl"
          src="https://www.youtube.com/embed/X9J2ea8iNnM?si=34DSeIaIg8gU7ku_"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
        <div className="flex flex-col md:flex-row items-start gap-3 md:gap-0 md:justify-evenly md:mb-10">
          <div className="flex gap-2 justify-center">
            <FaCheck className="bg-blue-500 text-white text-2xl rounded-full p-1" />
            <p className="text-white text-lg">Find good treatments</p>
          </div>
          <div className="flex gap-2 justify-center">
            <FaCheck className="bg-blue-500 text-white text-2xl rounded-full p-1" />
            <p className="text-white text-lg">Feel like at home services</p>
          </div>
          <div className="flex gap-2 justify-center">
            <FaCheck className="bg-blue-500 text-white text-2xl rounded-full p-1" />
            <p className="text-white text-lg">Online consultation 24/7</p>
          </div>
          <div className="flex gap-2 justify-center">
            <FaCheck className="bg-blue-500 text-white text-2xl rounded-full p-1" />
            <p className="text-white text-lg">Award-winning dentist</p>
          </div>
        </div>
        <Link
          to="/register"
          className="bg-blue-600 hover:bg-blue-700 text-white text-lg text-center self-center py-4 px-8 rounded-full hover:no-underline"
        >
          Book Consultation Now
        </Link>
      </div>
    </div>
  );
};

export default SectionThree;
