import React from "react";
import hero from "../../assets/dentista.avif";
import hero2 from "../../assets/login_image.avif";
import hero3 from "../../assets/hero_2.jpg";
import circle from "../../assets/Ellipse.svg";
import { Link } from "react-router-dom";
import { LiaStarSolid } from "react-icons/lia";

const HeroSection = () => {
  return (
    <div className="flex justify-center h-[100vh] min-w-[100vw] pt-24 pb-8 px-[8em] bg-gradient-to-r from-[#0E264B] to-[#3e66a1] ">
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
          <div className="relative flex flex-col pt-[9em]">
            <img
              // style={{ height: "6em", width: "8em" }}
              className="absolute top-0 w-[4.8em]"
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
              className="absolute top-[30em] w-[6.8em]"
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
              We are dedicated to providing you and your family with top-quality
              dental care in a confortabe and welcoming enviroment
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
  );
};

export default HeroSection;
