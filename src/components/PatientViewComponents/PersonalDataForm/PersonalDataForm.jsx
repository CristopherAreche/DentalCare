import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import {
  faIdCard,
  faLock,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import {
  fetchClient,
  updateClient,
} from "../../../components/store/features/clientSlice.js";
import Swal from "sweetalert2";
import { library } from "@fortawesome/fontawesome-svg-core";
library.add(faIdCard, faLock, faEnvelope);

const PersonalDataForm = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    watch,
  } = useForm();

  const user = useSelector((state) => state.users.users);
  const client = useSelector((state) => state?.clients?.selectedClient?.data);

  useEffect(() => {
    dispatch(fetchClient(user));
  }, [dispatch, user]);

  const fechaPartida = client?.fechaNacimiento
    ? client.fechaNacimiento.split("/")
    : [];
  const fechaNacimiento = new Date(
    parseInt(fechaPartida[2]),
    parseInt(fechaPartida[1]) - 1, // Subtract 1 from the month
    parseInt(fechaPartida[0])
  );

  const dd = String(fechaNacimiento.getDate()).padStart(2, "0");
  const mm = String(fechaNacimiento.getMonth() + 1).padStart(2, "0");
  const yyyy = fechaNacimiento.getFullYear();
  const fechaClienteFormateada = `${yyyy}-${mm}-${dd}`;
  const isSmallScreen = window.innerWidth < 640;
  console.log("client", client);
  const onSubmit = async (data) => {
    try {
      const fechaNacimiento = new Date(data?.fechaNacimiento);
      const dd = String(fechaNacimiento.getUTCDate()).padStart(2, "0");
      const mm = String(fechaNacimiento.getMonth() + 1).padStart(2, "0");
      const yyyy = fechaNacimiento.getFullYear();

      // Crear la fecha en el formato deseado (dd/mm/yyyy)
      const fechaFormateada = `${dd}/${mm}/${yyyy}`;

      // Actualizar el valor de la fecha de vencimiento en los datos
      const newData = { ...data, fechaNacimiento: fechaFormateada };

      const result = await Swal.fire({
        title: `¿Confirma las modificaciones?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Sí, actualizar",
        cancelButtonText: "Cancelar",
        reverseButtons: true,
      });

      if (result.isConfirmed) {
        const response = await dispatch(updateClient(newData));
        console.log("esto es new data", newData);

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
        console.log(response);
        // Toast.fire({
        //   icon: "success",
        //   title: "Información actualizada con éxito!",
        // });
      }
    } catch (error) {
      console.error(error);
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
        title: "Error al modificar la información!",
      });
    }
  };

  const handleBlur = (fieldName) => {
    trigger(fieldName);
  };
  return (
    <>
      <form className="w-[95vw] flex flex-col gap-8 px-3 justify-evenly items-center lg:w-[60vw] lg:h-[80vh] md:h-[80vh] h-[89%] xs:mb-[4em] bg-white py-4 rounded-lg shadow-2xl">
        <h2 className="lg:text-3xl text-4xl font-bold text-center  text-gray-900 uppercase">
          Personal Information
        </h2>
        <div className=" w-full flex justify-center lg:flex-row flex-col h-full pt-[12em] md:pt-0 md:h-[500px] overflow-y-auto">
          <div className="p-3 flex flex-col gap-2 lg:gap-6 h-full w-full lg:w-1/2">
            <div className="flex items-center justify-between">
              <label className="text-1xl text-gray-900">ID</label>
              <input
                defaultValue={client?.dni}
                className="border-[1px] border-gray-400 p-2 rounded w-2/3 md:w-[17em]"
                {...register("dni")}
                onBlur={() => handleBlur("dni")}
                readOnly
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-1xl text-gray-900">Name</label>
              <input
                defaultValue={client?.nombre}
                className="border-[1px] border-gray-400 p-2 rounded w-2/3 md:w-[17em]"
                type="text"
                placeholder="Ingrese su Nombre"
                {...register("nombre")}
                onBlur={() => handleBlur("nombre")}
              />
            </div>
            {errors.nombre && (
              <p className="h-0 text-red-500">{errors.nombre.message}</p>
            )}
            <div className="flex items-center justify-between">
              <label className="text-1xl ">Apellido</label>
              <input
                defaultValue={client?.apellido}
                className="border-[1px] border-gray-400 p-2 rounded w-2/3 md:w-[17em]"
                type="text"
                placeholder="Ingrese su Apellido"
                {...register("apellido")}
                onBlur={() => handleBlur("apellido")}
              />
            </div>
            {errors.apellido && (
              <p className="h-0 text-red-500">{errors.apellido.message}</p>
            )}
            <div className="flex items-center justify-between">
              <label className="text-1xl text-gray-900">Edad</label>
              <input
                defaultValue={client?.edad}
                className="border-[1px] border-gray-400 p-2 rounded w-2/3 md:w-[17em]"
                type="number"
                min={3}
                max={99}
                placeholder="Ingrese su edad"
                {...register("edad")}
                onBlur={() => handleBlur("edad")}
              />
            </div>
            {errors.edad && (
              <p className="h-0 text-red-500">{errors.edad.message}</p>
            )}
            <div className="flex items-center justify-between">
              <label className="text-1xl text-gray-900">
                Fecha de Nacimiento
              </label>
              <input
                defaultValue={fechaClienteFormateada}
                className="border-[1px] border-gray-400 p-2 rounded w-[19em] lg:w-[320px] md:w-[320px]"
                type="date"
                placeholder="Ingrese su fecha de Nacimiento"
                {...register("fechaNacimiento", {
                  required: "Campo obligatorio",
                })}
                onBlur={() => handleBlur("fechaNacimiento")}
              />
            </div>
            {errors.fechaNacimiento && (
              <p className="h-0 text-red-500">
                {errors.fechaNacimiento.message}
              </p>
            )}
            <div className="flex items-center justify-between">
              <label className="text-1xl text-gray-900">Domicilio</label>
              <input
                defaultValue={client?.domicilio}
                className="border-[1px] border-gray-400 p-2 rounded  w-2/3 md:w-[17em]"
                type="text"
                placeholder="Ingrese su Domicilio"
                {...register("domicilio")}
                onBlur={() => handleBlur("domicilio")}
              />
            </div>
            {errors.domicilio && (
              <p className="h-0 text-red-500">{errors.domicilio.message}</p>
            )}
            <div className="flex items-center justify-between">
              <label className="text-1xl text-gray-900">Localidad</label>
              <input
                defaultValue={client?.localidad}
                className="border-[1px] border-gray-400 p-2 rounded  w-2/3 md:w-[17em]"
                type="text"
                placeholder="Ingrese su Localidad"
                {...register("localidad")}
                onBlur={() => handleBlur("localidad")}
              />
            </div>
            {errors.localidad && (
              <p className="h-0 text-red-500">{errors.localidad.message}</p>
            )}
          </div>
          <div className="p-3 flex flex-col gap-2 lg:gap-6 h-full w-full lg:w-1/2">
            <div className="flex items-center justify-between">
              <label className="text-1xl text-gray-900">Email</label>
              <input
                defaultValue={client?.email}
                className="border-[1px] border-gray-400 p-2 rounded w-2/3 md:w-[17em]"
                type="email"
                placeholder="Ingrese su Email"
                {...register("email", {
                  pattern: {
                    value:
                      /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,
                    message: "Formato de email inválido",
                  },
                })}
                onBlur={() => handleBlur("email")}
              />
            </div>
            {errors.email && (
              <p className="h-0 text-red-500">{errors.email.message}</p>
            )}
            <div className="flex items-center justify-between gap-3">
              <label className="text-1xl text-gray-900">Ocupacion</label>

              <input
                defaultValue={client?.ocupacion}
                className="border-[1px] border-gray-400 p-2 rounded w-2/3 md:w-[17em]"
                type="text"
                placeholder="Ingrese su Ocupación/Profesión"
                {...register("ocupacion")}
                onBlur={() => handleBlur("ocupacion")}
              />
            </div>
            {errors.ocupacion && (
              <p className="h-0 text-red-500">{errors.ocupacion.message}</p>
            )}
            <div className="flex items-center justify-between">
              <label className="text-1xl text-gray-900">Teléfono</label>
              <input
                defaultValue={client?.telefono1}
                className="border-[1px] border-gray-400 p-2 rounded w-2/3 md:w-[17em]"
                type="number"
                placeholder="Ingrese su telefono"
                {...register("telefono1", {
                  pattern: {
                    value: /^\d{8,15}$/,
                    message: "El telefono debe tener entre 8 y 15 números",
                  },
                })}
                onBlur={() => handleBlur("telefono1")}
              />
            </div>
            {errors.telefono1 && (
              <p className="h-0 text-red-500">{errors.telefono1.message}</p>
            )}
            <div className="flex items-center justify-between">
              <label className="text-1xl text-gray-900">
                Teléfono Alternativo
              </label>
              <input
                defaultValue={client?.telefono2}
                className="border-[1px] border-gray-400 p-2 rounded w-[18em] md:w-[17em]"
                type="number"
                placeholder="Ingrese otro telefono"
                {...register("telefono2", {
                  pattern: {
                    value: /^\d{8,15}$/,
                    message: "El telefono debe tener entre 8 y 15 números",
                  },
                })}
                onBlur={() => handleBlur("telefono2")}
              />
            </div>
            {errors.telefono2 && (
              <p className="h-0 text-red-500">{errors.telefono2.message}</p>
            )}
            <div className="flex items-center justify-between">
              <label className="text-1xl text-gray-900">Obra Social</label>
              <select
                defaultValue={client?.obraSocial}
                className="border-[1px] border-gray-400 p-2 rounded w-2/3 md:w-[17em]"
                placeholder="Seleccione su Obra Social"
                {...register("obraSocial")}
                onBlur={() => handleBlur("obraSocial")}
              >
                <option value="Particular">Particular</option>
                <option value="OSDE">OSDE</option>
                <option value="Medifé">Medifé</option>
                <option value="Swiss Medical">Swiss Medical</option>
                <option value="GALENO">GALENO</option>
              </select>
            </div>
            {errors.obraSocial && (
              <p className="h-0 text-red-500">{errors.obraSocial.message}</p>
            )}
            <div className="flex items-center justify-between">
              <label className="text-1xl text-gray-900">Plan</label>
              <input
                defaultValue={client?.plan}
                className="border-[1px] border-gray-400 p-2 rounded w-2/3 md:w-[17em]"
                type="text"
                placeholder="Ingrese su Plan"
                {...register("plan", {
                  validate: (val) => {
                    if (watch("obraSocial") != "Particular" && !val) {
                      return "Debe aclarar que plan de obra social posee";
                    }
                    return true;
                  },
                })}
                onBlur={() => handleBlur("plan")}
              />
            </div>
            {errors.plan && (
              <p className="h-0 text-red-500">{errors.plan.message}</p>
            )}
            <div className="flex items-center justify-between">
              <label className="text-1xl text-gray-900">Titular</label>
              <input
                defaultValue={client?.titular}
                className="border-[1px] border-gray-400 p-2 rounded w-2/3 md:w-[17em]"
                type="text"
                placeholder="Ingrese el titular"
                {...register("titular", {
                  validate: (val) => {
                    if (watch("obraSocial") != "Particular" && !val) {
                      return "Debe aclarar el titular de su obra social";
                    }
                    return true;
                  },
                })}
                onBlur={() => handleBlur("titular")}
              />
            </div>
            {errors.titular && (
              <p className="h-0 text-red-500">{errors.titular.message}</p>
            )}
            <div className="flex items-center justify-between">
              <label className="text-1xl text-gray-900">N° Afiliado</label>
              <input
                defaultValue={client?.afiliado}
                className="border-[1px] border-gray-400 p-2 rounded w-2/3 md:w-[17em]"
                type="number"
                placeholder="Ingrese el numero de afiliado"
                {...register("afiliado", {
                  validate: (val) => {
                    if (watch("obraSocial") != "Particular" && !val) {
                      return "Debe aclarar el numero de afiliado de su obra social";
                    }
                    return true;
                  },
                })}
                onBlur={() => handleBlur("afiliado")}
              />
            </div>
            {errors.afiliado && (
              <p className="h-0 text-red-500">{errors.afiliado.message}</p>
            )}
          </div>
        </div>
        <div className="flex justify-center mt-2 ">
          <button
            className="font-semibold w-[8em] ring-2 ring-icon-100 text-icon-100 hover:bg-icon-100 hover:text-white rounded-md py-3  text-2xl"
            type="submit"
            onClick={handleSubmit(onSubmit)}
          >
            Actualizar
          </button>
        </div>
      </form>
    </>
  );
};

export default PersonalDataForm;
