import React from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="w-full min-h-[30em] bg-[#277dfe] py-4 md:py-0 rounded-3xl flex flex-col gap-8 justify-center items-center">
      <h1 className="text-white text-[3em] md:text-[5em] font-semibold leading-[1em] px-[3em] text-center">
        Start now your dental treatment
      </h1>
      <div className="flex flex-col md:flex-row gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <FaStar className="text-yellow-500 text-2xl" />
            <FaStar className="text-yellow-500 text-2xl" />
            <FaStar className="text-yellow-500 text-2xl" />
            <FaStar className="text-yellow-500 text-2xl" />
            <FaStar className="text-yellow-500 text-2xl" />
            <p className="text-white font-semibold">(4.8)</p>
          </div>
          <p className="text-xl text-white">30K+ rating on google</p>
        </div>
        <Link
          to="/register"
          className="bg-white text-gray-600 text-center py-4 px-7 font-semibold text-xl self-center rounded-full hover:no-underline"
        >
          Book Consultation
        </Link>
      </div>
    </div>
  );
};

export default Banner;
