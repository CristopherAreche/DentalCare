import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  getAppointments,
  deleteAppointments,
} from "../../store/features/appointmentsSlice";
import { fetchClient } from "../../store/features/clientSlice";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";
const PatientAppointment = () => {
  const appointments = useSelector((state) => state.appointments.appointments);
  const dispatch = useDispatch();

  const client = useSelector((state) => state?.clients?.selectedClient?.data);

  useEffect(() => {
    dispatch(getAppointments());
  }, [dispatch]);

  const PacientAppointment = appointments.filter(
    (turno) => turno.pacienteId === client.dni
  );

  const AppointmentId = PacientAppointment.map((turno) => turno.id);

  const onHandleDelete = async () => {
    const result = await Swal.fire({
      title:
        "Are you sure you want to delete this product? This action cannot be undone.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });
    if (result.isConfirmed) {
      const response = await dispatch(deleteAppointments(AppointmentId));
    }
  };

  return (
    <main className="bg-white flex flex-col lg:flex-row md:flex-row items-center h-[600px] text-lg text-white font-bold py-4 overflow-y-auto">
      <div className=" gap-3 flex flex-col justify-center  items-center h-[30em] w-[100%] overflow-y-auto">
        {PacientAppointment.length > 0 ? (
          PacientAppointment.map((turno, index) => (
            <section
              key={index}
              className=" justify-evenly flex flex-row h-max w-[90%] lg:w-[60%] md:w-[70%] rounded-lg py-2"
            >
              <div className="flex flex-col items-center">
                <label className="text-black underline" htmlFor="">
                  Date
                </label>
                <label className="text-white" htmlFor="">
                  {turno.fecha}
                </label>
              </div>
              <div className="flex flex-col items-center">
                <label className="text-black underline" htmlFor="">
                  Time
                </label>
                <label className="text-white" htmlFor="">
                  {turno.hora}
                </label>
              </div>
              <div className="flex cursor-pointer items-center">
                <FontAwesomeIcon
                  onClick={onHandleDelete}
                  icon="trash"
                  className="text-red-600 text-2xl"
                />
              </div>
            </section>
          ))
        ) : (
          <section className=" text-black text-xl justify-evenly flex flex-row h-max w-[80%] rounded-lg py-2">
            There are no scheduled appointments with this client
          </section>
        )}
      </div>
    </main>
  );
};

export default PatientAppointment;
