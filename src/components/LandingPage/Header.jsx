import React from "react";
import { CiLocationOn } from "react-icons/ci";

const Header = () => {
  return (
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
  );
};

export default Header;
