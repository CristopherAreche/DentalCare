import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { fetchClient } from "../components/store/features/clientSlice";
import PatientMenu from "../components/PatientsDetails/PatientMenu";

const PatientDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const selectedClient = useSelector((state) => state.clients.selectedClient);
  useEffect(() => {
    dispatch(fetchClient(id));
  }, [dispatch, id]);
  return (
    <div className="flex flex-row h-screen w-screen overflow-hidden bg-secondary-100">
      <div className="lg:w-[20%] m-0 z-50">
        <Sidebar />
      </div>
      <div className="w-[80%] h-auto bg-gradient-to-r from-[#0E264B] to-[#3e66a1] flex flex-col justify-center items-center gap-3">
        <header className="text-white uppercase text-3xl font-bold lg:pt-0">
          {selectedClient?.data.nombre + " " + selectedClient?.data.apellido}
        </header>
        <div className="w-full px-10">
          <PatientMenu />
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;
