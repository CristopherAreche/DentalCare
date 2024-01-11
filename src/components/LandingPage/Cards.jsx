import React from "react";
import { PiTooth } from "react-icons/pi";

const Cards = () => {
  return (
    <div className="flex flex-col md:flex-row gap-8 ">
      {/* 1 */}
      <div class="flex flex-col justify-center items-center gap-4 max-w-[25em] max-h-[30em] px-6 py-8 rounded-xl ring-1 ring-gray-400">
        <PiTooth className="h-[6em] w-[6em] bg-blue-500 rounded-full p-2 text-white" />

        <h5 class="mb-2 text-3xl font-semibold tracking-tight text-background-100">
          General Dentistry
        </h5>
        <p class="mb-3 font-normal text-gray-500 text-lg text-center">
          From a regular dental exams and cleanings to fillings and extractions,
          our general dentistry services are designed to keep your oral health
          in tip-top shape.
        </p>
      </div>
      {/* 2 */}
      <div class="flex flex-col justify-center items-center gap-4 bg-blue-500 max-w-[25em] max-h-[30em] px-6 py-8 rounded-xl ring-1 ring-gray-400">
        <PiTooth className="h-[6em] w-[6em] bg-white rounded-full p-2 text-blue-500" />

        <h5 class="mb-2 text-3xl font-semibold tracking-tight text-white">
          General Dentistry
        </h5>
        <p class="mb-3 font-normal text-white text-lg text-center">
          Transform your smile with our range of cosmetics dental treatments,
          including teeth whitening, veneers, and smile makeovers. Achieve the
          dazzling smile.
        </p>
      </div>
      {/* 3 */}
      <div class="flex flex-col justify-center items-center gap-4 max-w-[25em] max-h-[30em] px-6 py-8 rounded-xl ring-1 ring-gray-400">
        <PiTooth className="h-[6em] w-[6em] bg-blue-500 rounded-full p-2 text-white" />

        <h5 class="mb-2 text-3xl font-semibold tracking-tight text-background-100">
          Restorative Dentistry
        </h5>
        <p class="mb-3 font-normal text-gray-500 text-lg text-center">
          Repair damaged or missing teeth with our restorative treatments, such
          as dental implants, crowns, bridges, and dentures. Regain your
          confidence.
        </p>
      </div>
    </div>
  );
};

export default Cards;
