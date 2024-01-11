import React from "react";
import Header from "../components/LandingPage/Header";
import NavBar from "../components/LandingPage/NavBar";
import HeroSection from "../components/LandingPage/HeroSection";
import SectionOne from "../components/LandingPage/SectionOne";
import LandingPageSideBar from "../components/LandingPage/LandingPageSideBar";
import SectionTwo from "../components/LandingPage/SectionTwo";
import SectionThree from "../components/LandingPage/SectionThree";
import SectionFour from "../components/LandingPage/SectionFour";
import SectionFive from "../components/LandingPage/SectionFive";
import Footer from "../components/LandingPage/Footer";

const LandingPage = () => {
  return (
    <div className="flex flex-col h-[100vh] max-w-screen overflow-x-hidden">
      <Header />
      <NavBar />
      <HeroSection />
      <SectionOne />
      <SectionTwo />
      <SectionThree />
      <SectionFour />
      <SectionFive />
      <Footer />

      <LandingPageSideBar />
    </div>
  );
};

export default LandingPage;
