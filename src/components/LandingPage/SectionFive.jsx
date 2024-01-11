import React from "react";
import { FaArrowLeft, FaCircle, FaArrowRight } from "react-icons/fa";
import TestimonyCards from "../../components/LandingPage/TestinonyCards";
import Banner from "../../components/LandingPage/Banner";

const SectionFive = () => {
  return (
    <div className="flex flex-col pb-20 justify-center max-w-screen md:py-20 px-10 text-center md:text-start md:px-[8em] bg-background-300">
      <div className="flex flex-col md:flex-row items-center mb-10 md:mb-20 gap-6 md:gap-0">
        <h1 className="w-full md:w-[70%] text-[3em] md:text-[5em] font-bold text-background-100 leading-[1em] text-center md:text-start">
          What client say
        </h1>
        <div className="w-full flex justify-center md:justify-end md:w-[30%] md:text-xl text-gray-200 md:ml-24">
          <div className="flex gap-5">
            <FaArrowLeft className="ring-2 ring-gray-700 rounded-full text-gray-700 text-4xl p-2" />
            <div className="flex items-center gap-3">
              <FaCircle className="text-sm text-black" />
              <FaCircle className="text-sm text-gray-300" />
              <FaCircle className="text-sm text-gray-300" />
            </div>
            <FaArrowRight className="bg-blue-600 text-white text-4xl rounded-full p-2" />
          </div>
        </div>
      </div>
      <TestimonyCards />
      <Banner />
    </div>
  );
};

export default SectionFive;
