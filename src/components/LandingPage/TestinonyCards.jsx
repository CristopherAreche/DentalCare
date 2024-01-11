import React from "react";
import dentist1 from "../../assets/dentist1.png";
import dentist2 from "../../assets/dentist2.png";
import dentist3 from "../../assets/dentist3.png";
import { FaStar } from "react-icons/fa";
import { ImQuotesLeft } from "react-icons/im";

const TestimonyCards = () => {
  const testimonyList = [
    {
      image: dentist1,
      name: "Sandra",
      rating: "5.0",
      profession: "UI/UX Designer",
    },
    {
      image: dentist2,
      name: "Carla Iglesias",
      rating: "4.5",
      profession: "Frontend Developer",
    },
    {
      image: dentist3,
      name: "Jonas Nuñez",
      rating: "4.8",
      profession: "Backend Developer",
    },
  ];
  return (
    <div className="flex flex-col md:flex-row gap-8 mb-32">
      {testimonyList.map(({ image, name, rating, profession, profileLink }) => (
        <div class="max-w-[40em] bg-[#e7f2fe] rounded-2xl">
          <div className="px-5 py-7 flex flex-col items-start ">
            <div className="mb-6">
              <ImQuotesLeft className="text-2xl mb-3" />
              <p className="text-xl text-gray-500">
                I&apos;ve always been anxious about dental visits, but my
                experience at DentalCare Clinic completely changed my
                perspective.
              </p>
            </div>

            <div className="flex items-center gap-2 mb-6">
              <FaStar className="text-xl text-yellow-500" />
              <FaStar className="text-xl text-yellow-500" />
              <FaStar className="text-xl text-yellow-500" />
              <FaStar className="text-xl text-yellow-500" />
              <FaStar className="text-xl text-yellow-500" />
              <p className="text-xl font-bold text-background-100">{rating}</p>
            </div>

            <div className="flex gap-5">
              <img
                className="object-cover object-top h-16 rounded-full"
                src={image}
                alt=""
              />
              <div>
                <h5 className="text-2xl font-semibold tracking-tight text-background-100">
                  {name}
                </h5>

                <p className="mb-3 font-normal text-gray-500 ">{profession}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TestimonyCards;
