import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../store/features/calendarSlice";
import Swal from "sweetalert2";
import axios from "axios";
import {
  getAppointments,
  deleteAppointments,
} from "../store/features/appointmentsSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { fetchClient } from "../../components/store/features/clientSlice";

const AppointmentUser = () => {
  const dispatch = useDispatch();
  const appointments = useSelector((state) => state.calendar.calendarData);
  const dni = useSelector((state) => state.users.users);

  const allAppointments = useSelector(
    (state) => state.appointments.appointments
  );
  const userType = useSelector((state) => state.users.type);

  useEffect(() => {
    dispatch(fetchData());
    dispatch(getAppointments());
    if (userType !== undefined) {
      dispatch(fetchClient(dni));
    }
  }, [dispatch, dni]);

  //fecha actual
  const date = new Date();
  const dia = date.getDate();
  const mes = date.getMonth() + 1;
  const año = date.getFullYear();
  const currentDateISO = `${dia?.toString().padStart(2, "0")}/${mes
    .toString()
    .padStart(2, "0")}/${año}`;
  const currentTime = date.getHours();

  //filtra los dias disponibles pasadas las 12hs
  const filteredAppointments = appointments.filter((a) => {
    const currentDate = new Date();
    const dia = currentDate.getUTCDate();
    const mes = currentDate.getMonth() + 1;
    const año = currentDate.getFullYear();
    const currentDateISO = `${año}-${mes?.toString().padStart(2, "0")}-${dia
      ?.toString()
      .padStart(2, "0")}`;

    // Convertir la fecha de "dd/MM/yyyy" a "yyyy-MM-dd"
    const [diaAp, mesAp, añoAp] = a.fecha.split("/");
    const appointmentDateISO = `${añoAp}-${mesAp.padStart(
      2,
      "0"
    )}-${diaAp.padStart(2, "0")}`;

    return (
      appointmentDateISO > currentDateISO ||
      appointmentDateISO !== currentDateISO
    );
  });

  const userAppointments = allAppointments.filter((a) => {
    return a.pacienteId === dni?.toString() && a.fecha >= currentDateISO;
  });

  const handleSelectAppointment = async (date, time) => {
    const appointment = { fecha: date, hora: time };

    const appointmentsUrl = import.meta.env.VITE_ENDPOINT;

    if (userAppointments.length > 0) {
      await Swal.fire({
        title: `You already have an assigned appointment! Please check your email inbox.`,
        icon: "warning",
        showCancelButton: false,
        confirmButtonText: "OK",
      });
    } else {
      const result = await Swal.fire({
        title: `Do you confirm the appointment for the date ${date} and time ${time}?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "Cancel",
        reverseButtons: true,
      });
      if (result.isConfirmed) {
        axios
          .post(`${appointmentsUrl}/turnos/${dni}`, appointment)
          .then(async (response) => {
            dispatch(getAppointments());
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener("mouseenter", Swal.stopTimer);
                toast.addEventListener("mouseleave", Swal.resumeTimer);
              },
            });

            const calendar = await Swal.fire({
              title: `Do you want to schedule this appointment on Google Calendar?`,
              icon: "question",
              showCancelButton: true,
              confirmButtonText: "Yes",
              cancelButtonText: "No",
              reverseButtons: true,
            });

            if (calendar.isConfirmed) {
              window.open("https://calendar.google.com/calendar/", "_blank");
              Toast.fire({
                icon: "success",
                title: "Appointment successfully reserved",
              });
            }
          })
          .catch((error) => {
            console.error("Error ->", error);
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener("mouseenter", Swal.stopTimer);
                toast.addEventListener("mouseleave", Swal.resumeTimer);
              },
            });

            Toast.fire({
              icon: "error",
              title: "Error confirming the reservation!",
            });
          });
      }
    }
  };

  const handleDelete = async (appointment) => {
    if (appointment.fecha === currentDateISO && currentTime >= 11) {
      await Swal.fire({
        title: "Appointments cannot be canceled after 11 AM on the same date.",
        icon: "error",
        showCancelButton: false,
        confirmButtonText: "OK",
        reverseButtons: false,
      });
    } else {
      const result = await Swal.fire({
        title: "Would you like to cancel this appointment?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        reverseButtons: true,
      });
      if (result.isConfirmed) {
        dispatch(deleteAppointments(appointment.id));
      }
    }
  };

  return (
    <div className="flex flex-col h-[50em]">
      <ul className="w-full gap-4 flex flex-col items-center py-3 bg-transparent text-black h-full lg:w-[70vw] rounded-md lg:rounded-2xl px-3 overflow-y-auto scrollbar-hide">
        {filteredAppointments.map((item, index) => (
          <div
            key={index}
            className="bg-background-200 flex flex-col md:flex-row gap-4 font-semibold shadow-md rounded-lg p-5"
          >
            <label className="flex flex-col justify-center gap-4 text-xl text-white ">
              <div className="uppercase font-semibold">{item?.dia}</div>
              <div className="font-semibold">{item?.fecha}</div>
            </label>
            <div
              key={item.fecha}
              className="item flex lg:justify-evenly lg:flex-row flex-col w-full"
            >
              <div
                className="grid grid-cols-2 md:grid-cols-5 gap-2 text-black w-full  overflow-y-auto scrollbar-hide cursor-pointer p-1"
                name="hora"
              >
                {item?.horasDisponibles.map((h) => {
                  if (h.disponible) {
                    return (
                      <div
                        key={h.hora}
                        value={h.hora}
                        className="bg-icon-100 hover:bg-background-200 hover:ring-1 hover:ring-icon-100 hover:text-icon-100 text-white col-span-1 w-[7em] font-semibold  shadow-md py-1 rounded-sm px-5 flex lg:justify-evenly lg:flex-row flex-col items-center"
                        onClick={() =>
                          handleSelectAppointment(item.fecha, h.hora)
                        }
                      >
                        {h.hora}
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          </div>
        ))}
      </ul>
      <ul className="flex flex-col justify-center items-center mt-4 text-white h-[10em] w-full rounded-lg lg:rounded-2xl py-5 px-[20em] overflow-y-auto scrollbar-hide">
        {userAppointments.length == 0 ? (
          <span className="text-2xl text-center">
            No appointment has been scheduled
          </span>
        ) : (
          <li
            key={userAppointments[0]?.id}
            className="px-3 font-semibold mb-4 shadow-md bg-background-200 py-2 rounded-lg flex lg:justify-evenly md:flex-row  w-80 lg:w-full items-center"
          >
            <div className="text-lg">Your next appointment is: </div>
            <div className="w-1/2">
              <div>{userAppointments[0].fecha}</div>
              <div>{userAppointments[0].hora}</div>
            </div>
            <button
              value={userAppointments[0].id}
              onClick={() => handleDelete(userAppointments[0])}
            >
              <FontAwesomeIcon
                className="h-[1.5em] text-red-500 hover:text-red-600 flex cursor-pointer"
                icon={faCircleXmark}
              />
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default AppointmentUser;
