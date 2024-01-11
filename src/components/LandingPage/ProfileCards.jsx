import React from "react";
import dentist1 from "../../assets/dentist1.png";
import dentist2 from "../../assets/dentist2.png";
import dentist3 from "../../assets/dentist3.png";
import { FaStar } from "react-icons/fa";

const ProfileCards = () => {
  const dentistList = [
    {
      image: dentist1,
      name: "Dr Lisa Montero",
      rating: "4.8",
      profession: "Dermatologist, DCRT (UK)",
      profileLink: "/somewhere",
    },
    {
      image: dentist2,
      name: "Dr Rachel Martinez",
      rating: "4.7",
      profession: "Dermatologist, DCRT (UK)",
      profileLink: "/somewhere",
    },
    {
      image: dentist3,
      name: "Dr David Warner",
      rating: "4.5",
      profession: "Dermatologist, DCRT (UK)",
      profileLink: "/somewhere",
    },
  ];
  return (
    <div className="flex flex-col md:flex-row gap-8">
      {dentistList.map(({ image, name, rating, profession, profileLink }) => (
        <div class="max-w-sm bg-[#e7f2fe] rounded-2xl">
          <img
            className="object-cover object-top h-[20em] w-[24em] rounded-2xl"
            src={image}
            alt=""
          />

          <div className="px-5 py-7 flex flex-col items-start ">
            <div className="flex items-center gap-2">
              <FaStar className="text-xl text-yellow-500" />
              <p className="text-xl font-bold text-background-100">{`(${rating})`}</p>
            </div>

            <h5 className="mb-2 text-2xl font-bold tracking-tight text-background-100">
              {name}
            </h5>

            <p className="mb-3 font-normal text-gray-500 ">{profession}</p>
            <a
              href="#"
              className="text-blue-500 p-y border-b-2 border-blue-500"
            >
              View Profle
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfileCards;
