import { useState } from "react";
import Details from "./Options/Details";
import Odontogram from "./Options/Odontogram";
import PatientAppointment from "./Options/PatientAppointment";
import MedicalHistory from "./Options/MedicalHistory";

const Option = ({ title, active, onClick }) => {
  return (
    <button
      className={`px-2 lg:px-4 w-[100%] py-2 lg:text-lg font-bold uppercase ${
        active ? "bg-white text-background-100" : "text-white bg-background-100"
      }`}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

const PatientMenu = () => {
  const [activeOption, setActiveOption] = useState("details");

  const renderComponent = () => {
    switch (activeOption) {
      case "details":
        return <Details />;
      case "map":
        return <Odontogram />;
      case "summary":
        return <PatientAppointment />;
      case "profile":
        return <MedicalHistory />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="flex lg:justify-start justify-center mt-4">
        <Option
          title="Details"
          active={activeOption === "details"}
          onClick={() => setActiveOption("details")}
        />
        <Option
          title="Odontogram"
          active={activeOption === "map"}
          onClick={() => setActiveOption("map")}
        />
        <Option
          title="Appointments"
          active={activeOption === "summary"}
          onClick={() => setActiveOption("summary")}
        />
        <Option
          title="Medical History"
          active={activeOption === "profile"}
          onClick={() => setActiveOption("profile")}
        />
      </div>
      <div>{renderComponent()}</div>
    </div>
  );
};

export default PatientMenu;
