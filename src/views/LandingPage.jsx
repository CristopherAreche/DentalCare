import React from "react";
import Header from "../components/LandingPage/Header";
import NavBar from "../components/LandingPage/NavBar";
import HeroSection from "../components/LandingPage/HeroSection";
import SectionOne from "../components/LandingPage/SectionOne";
import LandingPageSideBar from "../components/LandingPage/LandingPageSideBar";

const LandingPage = () => {
  return (
    <div className="flex flex-col h-[100vh] max-w-screen overflow-x-hidden">
      <Header />
      <NavBar />
      <HeroSection />
      <SectionOne />
      <LandingPageSideBar />
    </div>
  );
};

export default LandingPage;
