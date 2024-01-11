import React from "react";
import Cards from "./Cards";

const SectionTwo = () => {
  return (
    <div className="flex flex-col pb-20  justify-center max-w-screen md:h-screen  md:pt-20 px-10 text-center md:text-start md:px-[8em] bg-background-300">
      <div className="my-10">
        <h1 className="text-[3em] md:text-[5em] font-bold text-background-100 leading-[1em] md:px-[3em] text-center">
          A healthy smile starts here
        </h1>
        <p className="text-xl text-gray-500 py-10 text-center md:px-[13em]">
          We have service by contacting the doctor online for consultation about
          your dental health or asking for work schedules at the clinic
        </p>
      </div>
      <Cards />
    </div>
  );
};

export default SectionTwo;
