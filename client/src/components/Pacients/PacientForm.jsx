import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import Swal from "sweetalert2";
import {
  faIdCard,
  faLock,
  faEnvelope,
  faUser,
  faCalendar,
  faHouse,
  faCity,
  faUserTie,
  faPhone,
  faIdCardClip,
} from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createClient } from "../store/features/clientSlice";
import DateOfBirth from "./DateOfBirth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RegistrationImage from "../../assets/login_image.avif";
import { FaArrowLeft } from "react-icons/fa";

library.add(faIdCard, faLock, faEnvelope, faUser);

const ClientForm = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    watch,
  } = useForm();

  const [selectedDate, setSelectedDate] = useState(null);
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const userType = useSelector((state) => state.users.type);
  const user = useSelector((state) => state.users.users);

  const onSubmit = async (data) => {
    try {
      const fechaNacimiento = new Date(data.fechaNacimiento);
      const dd = String(fechaNacimiento.getUTCDate()).padStart(2, "0");
      const mm = String(fechaNacimiento.getMonth() + 1).padStart(2, "0");
      const yyyy = fechaNacimiento.getFullYear();

      // Crear la fecha en el formato deseado (dd/mm/yyyy)
      const fechaFormateada = `${dd}/${mm}/${yyyy}`;
      if (data.afiliado === "") {
        data.afiliado = 0;
      }
      // Actualizar el valor de la fecha de vencimiento en los datos
      const newData = { ...data, fechaNacimiento: fechaFormateada };

      const response = await dispatch(createClient(newData));
      if (response.type === "client/createClient/fulfilled") {
        nav("/historial-medico");
      } else {
        Swal.fire(
          "There was an error with the form, verify all the information is correct.",
          "",
          "error"
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleBlur = (fieldName) => {
    trigger(fieldName);
  };

  return (
    <div className="py-40 flex justify-center items-center h-screen bg-gradient-to-r from-[#0E264B] to-[#496FAA]">
      <div className="container">
        <div className="flex w-[90%] md:w-full bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
          <div
            className="w-1/2 hidden md:flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center"
            style={{ backgroundImage: `url(${RegistrationImage})` }}
          />
          <div className="w-full md:w-1/2 flex flex-col mx-auto bg-white py-4 px-4">
            <Link
              to={"/register"}
              className="relative flex gap-2 text-black mb-3 w-full justify-end"
            >
              <FaArrowLeft />
              <span>Go Back</span>
            </Link>
            <h2 className="text-4xl font-bold text-center  text-gray-800 pb-10">
              Patient&apos;s Details
            </h2>

            <form>
              <div className="flex lg:flex-row md:flex-row flex-col h-[30em] overflow-y-auto scrollbar-hide">
                <div className="flex flex-col lg:w-1/2 items-center gap-5 px-3 pt-5 ">
                  {/* ID */}
                  <div className="flex justify-between w-full items-center">
                    <input
                      defaultValue={user}
                      className="border border-gray-400 py-1 px-2 w-full"
                      placeholder="ID"
                      {...register("dni", {
                        required: "Filed required",
                      })}
                      onBlur={() => handleBlur("dni")}
                      readOnly
                    />
                  </div>
                  {/* Name */}
                  <div className="flex justify-between items-center w-full">
                    <input
                      className={`border border-gray-400 py-1 px-2 w-full ${
                        errors.nombre ? "border-red-500" : ""
                      }`}
                      type="text"
                      placeholder="Name"
                      {...register("nombre", {
                        required: "Filed required",
                      })}
                      onBlur={() => handleBlur("nombre")}
                    />
                  </div>
                  {/* Last name */}
                  <div className="flex flex-col w-full items-center justify-between ">
                    <div className="flex flex-col w-full">
                      <input
                        className={`border border-gray-400 py-1 px-2 w-full ${
                          errors.apellido ? "border-red-500" : ""
                        }`}
                        type="text"
                        placeholder="Last Name"
                        {...register("apellido", {
                          required: "Required field",
                        })}
                        onBlur={() => handleBlur("apellido")}
                      />
                    </div>
                  </div>
                  {/* age */}
                  <div className="flex justify-between items-center w-full">
                    <input
                      className={`border border-gray-400 py-1 px-2 w-full ${
                        errors.edad ? "border-red-500" : ""
                      }`}
                      type="number"
                      placeholder="Age"
                      {...register("edad", {
                        required: "Required field",
                      })}
                      onBlur={() => handleBlur("edad")}
                    />
                  </div>

                  {/* DOB */}
                  <div className="flex justify-between items-center w-full">
                    <input
                      className={`border border-gray-400 py-1 px-2 w-full ${
                        errors.fechaNacimiento ? "border-red-500" : ""
                      }`}
                      type="date"
                      placeholder="Date of Birth"
                      {...register("fechaNacimiento", {
                        required: "Required field",
                      })}
                      onBlur={() => handleBlur("fechaNacimiento")}
                    />
                  </div>

                  {/* address */}
                  <div className="flex justify-between items-center w-full">
                    <input
                      className={`border border-gray-400 py-1 px-2 w-full ${
                        errors.localidad ? "border-red-500" : ""
                      }`}
                      type="text"
                      placeholder="Address"
                      {...register("localidad", {
                        required: "Required field",
                      })}
                      onBlur={() => handleBlur("localidad")}
                    />
                  </div>

                  {/* Apt */}
                  <div className="flex justify-between items-center w-full">
                    <input
                      className={`border border-gray-400 py-1 px-2 w-full ${
                        errors.domicilio ? "border-red-500" : ""
                      }`}
                      type="text"
                      placeholder="Apt"
                      {...register("domicilio", {
                        required: "Required field",
                      })}
                      onBlur={() => handleBlur("domicilio")}
                    />
                  </div>

                  {/* Email */}
                  <div className="flex justify-between items-center w-full">
                    <input
                      className={`border border-gray-400 py-1 px-2 w-full ${
                        errors.email ? "border-red-500" : ""
                      }`}
                      type="text"
                      placeholder="Email"
                      {...register("email", {
                        required: "Required field",
                      })}
                      onBlur={() => handleBlur("email")}
                    />
                  </div>
                </div>

                <div className="flex  flex-col lg:w-1/2 items-center gap-5 px-3 pt-5 ">
                  {/* Profession */}
                  <div className="flex justify-between items-center w-full">
                    <input
                      className={`border border-gray-400 py-1 px-2 w-full ${
                        errors.ocupacion ? "border-red-500" : ""
                      }`}
                      type="text"
                      placeholder="Profession"
                      {...register("ocupacion", {
                        required: "Required field",
                      })}
                      onBlur={() => handleBlur("ocupacion")}
                    />
                  </div>

                  {/* Phone number */}
                  <div className="flex justify-between items-center w-full">
                    <input
                      className={`border border-gray-400 py-1 px-2 w-full ${
                        errors.telefono1 ? "border-red-500" : ""
                      }`}
                      type="text"
                      placeholder="Phone Number"
                      {...register("telefono1", {
                        required: "Required field",
                      })}
                      onBlur={() => handleBlur("telefono1")}
                    />
                  </div>

                  {/* Phone number 2*/}
                  <div className="flex justify-between items-center w-full">
                    <input
                      className={`border border-gray-400 py-1 px-2 w-full ${
                        errors.telefono2 ? "border-red-500" : ""
                      }`}
                      type="text"
                      placeholder="Secondary Phone Number"
                      {...register("telefono2", {})}
                      onBlur={() => handleBlur("telefono2")}
                    />
                  </div>

                  {/* Social Duty */}
                  <div className="flex flex-col items-center justify-between w-full">
                    <select
                      className={`border border-gray-400 py-1 px-2 w-full ${
                        errors.obraSocial ? "border-red-500" : ""
                      }`}
                      {...register("obraSocial", {
                        required: "Required field",
                      })}
                      onBlur={() => handleBlur("obraSocial")}
                      defaultValue="Hola"
                    >
                      <option value="">Select Social Duty</option>
                      <option value="Particular">Particular</option>
                      <option value="OSDE">OSDE</option>
                      <option value="Medifé">Medifé</option>
                      <option value="Swiss Medical">Swiss Medical</option>
                      <option value="GALENO">GALENO</option>
                    </select>
                  </div>

                  {/* Medical insurance */}
                  <div className="flex flex-col items-center justify-between w-full">
                    <input
                      className={`border border-gray-400 py-1 px-2 w-full ${
                        errors.plan ? "border-red-500" : ""
                      }`}
                      type="text"
                      placeholder="Medical Insurance"
                      {...register("plan", {
                        validate: (val) => {
                          if (watch("obraSocial") != "Particular" && !val) {
                            return "Required field";
                          }
                          return true;
                        },
                      })}
                      onBlur={() => handleBlur("plan")}
                    />
                  </div>

                  {/* Headline */}
                  <div className="flex flex-col justify-between items-center w-full">
                    <input
                      className={`border border-gray-400 py-1 px-2 w-full ${
                        errors.titular ? "border-red-500" : ""
                      }`}
                      type="text"
                      placeholder="Headline"
                      {...register("titular", {
                        validate: (val) => {
                          if (watch("obraSocial") != "Particular" && !val) {
                            return "Required field";
                          }
                          return true;
                        },
                      })}
                      onBlur={() => handleBlur("titular")}
                    />
                  </div>

                  {/* Affiliate Number */}
                  <div className="flex flex-col items-center justify-between w-full">
                    <input
                      className={`border border-gray-400 py-1 px-2 w-full ${
                        errors.afiliado ? "border-red-500" : ""
                      }`}
                      type="number"
                      placeholder="Affiliate Number"
                      {...register("afiliado", {
                        validate: (val) => {
                          if (watch("obraSocial") != "Particular" && !val) {
                            return "Required field";
                          }
                          return true;
                        },
                      })}
                      onBlur={() => handleBlur("afiliado")}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-center py-1">
                <button
                  className="font-bold w-1/2 border-none rounded-md my-5 py-3 bg-blue-500 hover:bg-blue-600 text-white "
                  type="submit"
                  onClick={handleSubmit(onSubmit)}
                >
                  Next
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientForm;
