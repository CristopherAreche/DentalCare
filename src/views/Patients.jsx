import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import ClientTable from "../components/Pacients/ClientTable";
import SearchBar from "../components/Pacients/SearchBar";

const Patients = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
  };
  return (
    <div className="flex flex-row h-screen w-screen overflow-hidden bg-gradient-to-r from-[#0E264B] to-[#3e66a1] ">
      <div className="lg:w-[20%] z-50">
        <Sidebar />
      </div>
      <div className="flex flex-col h-screen w-[80%] justify-start items-center pt-20 overflow-y-auto gap-10">
        <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
        <ClientTable searchTerm={searchTerm} />
      </div>
    </div>
  );
};

export default Patients;
