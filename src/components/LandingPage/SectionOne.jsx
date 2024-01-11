import React from "react";
import hero3 from "../../assets/hero_2.jpg";
import { LuCalendarCheck } from "react-icons/lu";
import { BsHospital } from "react-icons/bs";
import { PiTooth } from "react-icons/pi";

const SectionOne = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center max-w-screen md:h-auto  py-20 px-10 text-center md:text-start md:px-[8em] bg-background-300">
      {/* left side */}
      <div className="flex flex-col gap-8 w-full md:w-1/2">
        <h1 className="text-[3em] md:text-[5em] font-bold text-background-100 leading-[1em]">
          Get pearl white teeth
        </h1>
        <img
          className="rounded-t-full hidden md:flex"
          style={{ height: "40em", width: "30em" }}
          src={hero3}
          alt="hero"
        />
      </div>
      {/* right side */}
      <div className="flex flex-col gap-8 w-full md:w-1/2">
        <p className="text-xl text-gray-500 py-10">
          We have service by contacting the doctor online for consultation about
          your dental health or asking for work schedules at the clinic
        </p>

        <div className="flex flex-col gap-3 justify-start">
          <div className="text-[4em] text-icon-100 flex">
            <LuCalendarCheck />
          </div>
          <h3 className="text-2xl font-bold text-background-100 text-start">
            Book Online
          </h3>
          <p className="text-gray-500 text-xl text-start">
            Book online - quickly see when we&apos;re available and book a time
            for the whole family in under 5 minutes. It's so easy.
          </p>
        </div>

        <div className="flex flex-col gap-3 justify-start">
          <div className="text-[4em] text-icon-100 flex justify-end md:justify-start">
            <BsHospital />
          </div>
          <h3 className="text-2xl font-bold text-background-100 text-end md:text-start">
            Visit Clinic
          </h3>
          <p className="text-gray-500 text-xl text-end md:text-start">
            Visit our clinic - the kids even have their own private play area
            dedicated children&apos;s room.
          </p>
        </div>

        <div className="flex flex-col gap-3 justify-start">
          <div className="text-[4em] text-icon-100">
            <PiTooth />
          </div>
          <h3 className="text-2xl font-bold text-background-100 text-start">
            Get Treatment
          </h3>
          <p className="text-gray-500 text-xl text-start">
            Get to treat your teeth with a satisfying experience and
            professional service from an expert doctor.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SectionOne;
