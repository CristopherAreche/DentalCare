import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { fetchClient } from "../../components/store/features/clientSlice";
import Swal from "sweetalert2";
library.add(faQuestion);

const PatientMedicalHistory = () => {
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

  const client = useSelector(
    (state) => state.clients?.selectedClient?.data.historial
  );
  useEffect(() => {
    dispatch(fetchClient(user));
  }, [dispatch]);

  const api = import.meta.env.VITE_ENDPOINT;

  const onSubmit = async (data) => {
    try {
      for (let key in data) {
        if (data[key] === "true") {
          data[key] = true;
        } else if (data[key] === "false") {
          data[key] = false;
        } else if (data[key] === "") {
          data[key] = null;
        }
      }

      const result = await Swal.fire({
        title: `¿Confirma las modificaciones?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Sí, actualizar",
        cancelButtonText: "Cancelar",
        reverseButtons: true,
      });
      if (result.isConfirmed) {
        const response = await axios.put(
          `${api}/historiales/${client.id}`,
          data
        );

        console.log("este es el response", response);
        console.log("esto es data", data);

        const Toast = Swal.mixin({
          toast: true,
          poYestion: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });
        if (response.status === 201) {
          Toast.fire({
            icon: "success",
            title: "Información actualizada con éxito!",
          });
        }
      }
    } catch (response) {
      console.log("data user", data);
      console.error(response);
      const Toast = Swal.mixin({
        toast: true,
        poYestion: "top-end",
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

  const [showInput, setShowInput] = useState(false);

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    console.log("selectedValue ->", selectedValue);
    setShowInput(!selectedValue);
  };

  return (
    <form className="w-[92vw] flex flex-col justify-between items-center lg:w-[55vw] lg:max-w-[50em] mx-4 lg:h-[90vh] md:h-[80vh] h-[89vh] bg-white py-4 rounded-3xl shadow-2xl z-10">
      <h2 className="lg:text-6xl text-4xl font-bold text-center text-gray-900 my-5">
        Medical History
      </h2>
      <div className="flex  lg:flex-row md:flex-row flex-col h-[75%] w-[95%]  overflow-y-auto mb-3">
        <div className="p-4 flex flex-col gap-4 md:w-1/2 xs:w-full">
          <div className=" flex items-center justify-between">
            <label className="text-2xl text-gray-900">Illnesses</label>
            <select
              defaultValue={client?.enfermedad}
              className="border-2 border-gray-600 p-1 rounded-lg w-[5em] text-center"
              {...register("enfermedad")}
              onBlur={() => handleBlur("enfermedad")}
              onChange={(e) => {
                handleSelectChange(e);
              }}
            >
              <option value="">-</option>
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
          {errors.enfermedad && (
            <p className="h-0 text-red-500">{errors.enfermedad.message}</p>
          )}

          {client?.detalleEnfermedad && (
            <input
              defaultValue={client?.detalleEnfermedad}
              className="ring-1 ring-gray-600 p-2 rounded w-full"
              type="text"
              placeholder="Cual?"
              {...register("detalleEnfermedad", {
                validate: (val) => {
                  if (watch("enfermedad") === "Yes" && !val) {
                    return "Debe aclarar que enfermedad/es";
                  }
                  return true;
                },
              })}
              onBlur={() => handleBlur("detalleEnfermedad")}
            />
          )}
          {errors.detalleEnfermedad && (
            <p className="h-0 text-red-500">
              {errors.detalleEnfermedad.message}
            </p>
          )}

          <div className="flex items-center justify-between">
            <label className="text-2xl text-gray-900">Medical Treatment</label>
            <select
              defaultValue={client?.tratamientoMedico}
              className="border-2 border-gray-600 p-1 rounded-lg w-[5em] text-center"
              {...register("tratamientoMedico")}
              onBlur={() => handleBlur("tratamientoMedico")}
            >
              <option value="">-</option>
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
          {errors.tratamientoMedico && (
            <p className="h-0 text-red-500">
              {errors.tratamientoMedico.message}
            </p>
          )}

          {client.detalleTratamiento && (
            <input
              defaultValue={client?.detalleTratamiento}
              className="border p-2 rounded w-[17em]"
              type="text"
              placeholder="Cual?"
              {...register("detalleTratamiento", {
                validate: (val) => {
                  if (watch("tratamientoMedico") == "true" && !val) {
                    return "Debe aclarar que tratamiento/s";
                  }
                  return true;
                },
              })}
              onBlur={() => handleBlur("detalleTratamiento")}
            />
          )}

          {errors.detalleTratamiento && (
            <p className="h-0 text-red-500">
              {errors.detalleTratamiento.message}
            </p>
          )}
          <div className="flex items-center justify-between">
            <label className="text-2xl text-gray-900">Medication</label>
            <select
              defaultValue={client?.medicacion}
              className="border-2 border-gray-600 p-1 rounded-lg w-[5em] text-center"
              {...register("medicacion")}
              onBlur={() => handleBlur("medicacion")}
            >
              <option value="">-</option>
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
          {errors.medicacion && (
            <p className="h-0 text-red-500">{errors.medicacion.message}</p>
          )}

          {client.detalleMedicacion && (
            <input
              defaultValue={client?.detalleMedicacion}
              className="border p-2 rounded w-[17em]"
              type="text"
              placeholder="Cual?"
              {...register("detalleMedicacion", {
                validate: (val) => {
                  if (watch("medicacion") == "true" && !val) {
                    return "Debe aclarar que medicacion/es";
                  }
                  return true;
                },
              })}
              onBlur={() => handleBlur("detalleMedicacion")}
            />
          )}

          {errors.detalleMedicacion && (
            <p className="h-0 text-red-500">
              {errors.detalleMedicacion.message}
            </p>
          )}
          <div className="flex items-center justify-between">
            <label className="text-2xl text-gray-900">Alergia</label>
            <select
              defaultValue={client?.alergia}
              className="border-2 border-gray-600 p-1 rounded-lg w-[5em] text-center"
              {...register("alergia")}
              onBlur={() => handleBlur("alergia")}
            >
              <option value="">-</option>
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
          {errors.alergia && (
            <p className="h-0 text-red-500">{errors.alergia.message}</p>
          )}
          {client.detalleAlergia && (
            <input
              defaultValue={client?.detalleAlergia}
              className="border p-2 rounded w-[17em]"
              type="text"
              placeholder="Cual?"
              {...register("detalleAlergia", {
                validate: (val) => {
                  if (watch("alergia") == "true" && !val) {
                    return "Debe aclarar que alergia/s";
                  }
                  return true;
                },
              })}
              onBlur={() => handleBlur("detalleAlergia")}
            />
          )}

          {errors.detalleAlergia && (
            <p className="h-0 text-red-500">{errors.detalleAlergia.message}</p>
          )}
          <div className="flex items-center justify-between">
            <label className="text-2xl text-gray-900">Cicatrización</label>
            <select
              defaultValue={client?.cicatrizacion}
              className="border-2 border-gray-600 p-1 rounded-lg w-[5em] text-center"
              {...register("cicatrizacion")}
              onBlur={() => handleBlur("cicatrizacion")}
            >
              <option value="">-</option>
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
          {errors.cicatrizacion && (
            <p className="h-0 text-red-500">{errors.cicatrizacion.message}</p>
          )}
          <div className="flex items-center justify-between">
            <label className="text-2xl text-gray-900">Fiebre Reumática</label>
            <select
              defaultValue={client?.fiebreReumatica}
              className="border-2 border-gray-600 p-1 rounded-lg w-[5em] text-center"
              {...register("fiebreReumatica")}
              onBlur={() => handleBlur("fiebreReumatica")}
            >
              <option value="">-</option>
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
          {errors.fiebreReumatica && (
            <p className="h-0 text-red-500">{errors.fiebreReumatica.message}</p>
          )}
          <div className="flex items-center justify-between">
            <label className="text-2xl text-gray-900">Diabetes</label>
            <select
              defaultValue={client?.diabetes}
              className="border-2 border-gray-600 p-1 rounded-lg w-[5em] text-center"
              {...register("diabetes")}
              onBlur={() => handleBlur("diabetes")}
            >
              <option value="">-</option>
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
          {errors.diabetes && (
            <p className="h-0 text-red-500">{errors.diabetes.message}</p>
          )}
          <div className="flex items-center justify-between">
            <label className="text-2xl text-gray-900">
              Problemas Cardíacos
            </label>
            <select
              defaultValue={client?.problemasCardiacos}
              className="border-2 border-gray-600 p-1 rounded-lg w-[5em] text-center"
              {...register("problemasCardiacos")}
              onBlur={() => handleBlur("problemasCardiacos")}
            >
              <option value="">-</option>
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
          {errors.problemasCardiacos && (
            <p className="h-0 text-red-500">
              {errors.problemasCardiacos.message}
            </p>
          )}
          <div className="flex items-center justify-between">
            <label className="text-2xl text-gray-900">Aspirinas</label>
            <select
              defaultValue={client?.aspirinas}
              className="border-2 border-gray-600 p-1 rounded-lg w-[5em] text-center"
              {...register("aspirinas")}
              onBlur={() => handleBlur("aspirinas")}
            >
              <option value="">-</option>
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
          {errors.aspirinas && (
            <p className="h-0 text-red-500">{errors.aspirinas.message}</p>
          )}
          <div className="flex items-center justify-between">
            <label className="text-2xl text-gray-900">Anticoagulantes</label>
            <select
              defaultValue={client?.anticoagulante}
              className="border-2 border-gray-600 p-1 rounded-lg w-[5em] text-center"
              {...register("anticoagulante")}
              onBlur={() => handleBlur("anticoagulante")}
            >
              <option value="">-</option>
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
          {errors.anticoagulante && (
            <p className="h-0 text-red-500">{errors.anticoagulante.message}</p>
          )}
          <div className="flex items-center justify-between">
            <label className="text-2xl text-gray-900">Tabaquísmo</label>
            <select
              defaultValue={client?.tabaquismo}
              className="border-2 border-gray-600 p-1 rounded-lg w-[5em] text-center"
              {...register("tabaquismo")}
              onBlur={() => handleBlur("tabaquismo")}
            >
              <option value="">-</option>
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
          {errors.tabaquismo && (
            <p className="h-0 text-red-500">{errors.tabaquismo.message}</p>
          )}
          <div className="flex items-center justify-between">
            <label className="text-2xl text-gray-900">Embarazo</label>
            <select
              defaultValue={client?.embarazo}
              className="border-2 border-gray-600 p-1 rounded-lg w-[5em] text-center"
              {...register("embarazo")}
              onBlur={() => handleBlur("embarazo")}
            >
              <option value="">-</option>
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
          {errors.embarazo && (
            <p className="h-0 text-red-500">{errors.embarazo.message}</p>
          )}
          {client.mesesEmbarazo && (
            <input
              defaultValue={client?.mesesEmbarazo}
              className="border p-2 rounded w-[17em]"
              type="number"
              min={0}
              max={9}
              placeholder="Cuantos Meses?"
              {...register("mesesEmbarazo", {
                validate: (val) => {
                  if (watch("embarazo") == "true" && !val) {
                    return "Debe aclarar cuantos meses";
                  }
                  return true;
                },
              })}
              onBlur={() => handleBlur("mesesEmbarazo")}
            />
          )}
          {errors.mesesEmbarazo && (
            <p className="h-0 text-red-500">{errors.mesesEmbarazo.message}</p>
          )}
          <div className="flex items-center justify-between">
            <label className="text-2xl text-gray-900">HipertenYesón</label>
            <select
              defaultValue={client?.hipertenYeson}
              className="border-2 border-gray-600 p-1 rounded-lg w-[5em] text-center"
              {...register("hipertenYeson")}
              onBlur={() => handleBlur("hipertenYeson")}
            >
              <option value="">-</option>
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
          {errors.hipertenYeson && (
            <p className="h-0 text-red-500">{errors.hipertenYeson.message}</p>
          )}
        </div>
        <div className=" p-4 flex flex-col gap-4 md:w-1/2 xs:w-full">
          <div className="flex items-center justify-between">
            <label className="text-2xl text-gray-900">HipotenYesón</label>
            <select
              defaultValue={client?.hipotenYeson}
              className="border-2 border-gray-600 p-1 rounded-lg w-[5em] text-center"
              {...register("hipotenYeson")}
              onBlur={() => handleBlur("hipotenYeson")}
            >
              <option value="">-</option>
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
          {errors.hipotenYeson && (
            <p className="h-0 text-red-500">{errors.hipotenYeson.message}</p>
          )}
          <div className="flex items-center justify-between">
            <label className="text-2xl text-gray-900">Problemas Renales</label>
            <select
              defaultValue={client?.problemasRenales}
              className="border-2 border-gray-600 p-1 rounded-lg w-[5em] text-center"
              {...register("problemasRenales")}
              onBlur={() => handleBlur("problemasRenales")}
            >
              <option value="">-</option>
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
          {errors.problemasRenales && (
            <p className="h-0 text-red-500">
              {errors.problemasRenales.message}
            </p>
          )}
          <div className="flex items-center justify-between">
            <label className="text-2xl text-gray-900">
              Problemas Gástricos
            </label>
            <select
              defaultValue={client?.problemasGastricos}
              className="border-2 border-gray-600 p-1 rounded-lg w-[5em] text-center"
              {...register("problemasGastricos")}
              onBlur={() => handleBlur("problemasGastricos")}
            >
              <option value="">-</option>
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
          {errors.problemasGastricos && (
            <p className="h-0 text-red-500">
              {errors.problemasGastricos.message}
            </p>
          )}
          {client.detalleGastricos && (
            <input
              defaultValue={client?.detalleGastricos}
              className="border p-2 rounded w-[17em]"
              type="text"
              placeholder="Cual?"
              {...register("detalleGastricos", {
                validate: (val) => {
                  if (watch("problemasGastricos") == "true" && !val) {
                    return "Debe aclarar que problema/s";
                  }
                  return true;
                },
              })}
              onBlur={() => handleBlur("detalleGastricos")}
            />
          )}
          {errors.detalleGastricos && (
            <p className="h-0 text-red-500">
              {errors.detalleGastricos.message}
            </p>
          )}
          <div className="flex items-center justify-between">
            <label className="text-2xl text-gray-900">ConvulYesones</label>
            <select
              defaultValue={client?.convulYesones}
              className="border-2 border-gray-600 p-1 rounded-lg w-[5em] text-center"
              {...register("convulYesones")}
              onBlur={() => handleBlur("convulYesones")}
            >
              <option value="">-</option>
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
          {errors.convulYesones && (
            <p className="h-0 text-red-500">{errors.convulYesones.message}</p>
          )}
          <div className="flex items-center justify-between">
            <label className="text-2xl text-gray-900">EpilepYesa</label>
            <select
              defaultValue={client?.epilepYesa}
              className="border-2 border-gray-600 p-1 rounded-lg w-[5em] text-center"
              {...register("epilepYesa")}
              onBlur={() => handleBlur("epilepYesa")}
            >
              <option value="">-</option>
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
          {errors.epilepYesa && (
            <p className="h-0 text-red-500">{errors.epilepYesa.message}</p>
          )}
          <div className="flex items-center justify-between">
            <label className="text-2xl text-gray-900">HIV</label>
            <select
              defaultValue={client?.YesfilisGoNorreaHIV}
              className="border-2 border-gray-600 p-1 rounded-lg w-[5em] text-center"
              {...register("YesfilisGoNorreaHIV")}
              onBlur={() => handleBlur("YesfilisGoNorreaHIV")}
            >
              <option value="">-</option>
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
          {errors.YesfilisGoNorreaHIV && (
            <p className="h-0 text-red-500">
              {errors.YesfilisGoNorreaHIV.message}
            </p>
          )}
          <div className="flex items-center justify-between">
            <label className="text-2xl text-gray-900">Operaciones</label>
            <select
              defaultValue={client?.operacion}
              className="border-2 border-gray-600 p-1 rounded-lg w-[5em] text-center"
              {...register("operacion")}
              onBlur={() => handleBlur("operacion")}
            >
              <option value="">-</option>
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
          {errors.operacion && (
            <p className="h-0 text-red-500">{errors.operacion.message}</p>
          )}
          {client.detalleOperacion && (
            <input
              defaultValue={client?.detalleOperacion}
              className="border p-2 rounded w-[17em]"
              type="text"
              placeholder="Cual?"
              {...register("detalleOperacion", {
                validate: (val) => {
                  if (watch("operacion") == "true" && !val) {
                    return "Debe aclarar que operacion/es";
                  }
                  return true;
                },
              })}
              onBlur={() => handleBlur("detalleOperacion")}
            />
          )}
          {errors.detalleOperacion && (
            <p className="h-0 text-red-500">
              {errors.detalleOperacion.message}
            </p>
          )}
          <div className="flex items-center justify-between">
            <label className="text-2xl text-gray-900">
              Problemas Respiratorios
            </label>
            <select
              defaultValue={client?.problemasRespiratorios}
              className="border-2 border-gray-600 p-1 rounded-lg w-[5em] text-center"
              {...register("problemasRespiratorios")}
              onBlur={() => handleBlur("problemasRespiratorios")}
            >
              <option value="">-</option>
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
          {errors.problemasRespiratorios && (
            <p className="h-0 text-red-500">
              {errors.problemasRespiratorios.message}
            </p>
          )}
          {client.detalleRespiratorios && (
            <input
              defaultValue={client?.detalleRespiratorios}
              className="border p-2 rounded w-[17em]"
              type="text"
              placeholder="Cual?"
              {...register("detalleRespiratorios", {
                validate: (val) => {
                  if (watch("problemasRespiratorios") == "true" && !val) {
                    return "Debe aclarar que problema/s";
                  }
                  return true;
                },
              })}
              onBlur={() => handleBlur("detalleRespiratorios")}
            />
          )}
          {errors.detalleRespiratorios && (
            <p className="h-0 text-red-500">
              {errors.detalleRespiratorios.message}
            </p>
          )}
          <div className="flex items-center justify-between">
            <label className="text-2xl text-gray-900">Tiroides</label>
            <select
              defaultValue={client?.tiroides}
              className="border-2 border-gray-600 p-1 rounded-lg w-[5em] text-center"
              {...register("tiroides")}
              onBlur={() => handleBlur("tiroides")}
            >
              <option value="">-</option>
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
          {errors.tiroides && (
            <p className="h-0 text-red-500">{errors.tiroides.message}</p>
          )}
          {client.detalleTiroides && (
            <input
              defaultValue={client?.detalleTiroides}
              className="border p-2 rounded w-[17em]"
              type="text"
              placeholder="Cual?"
              {...register("detalleTiroides", {
                validate: (val) => {
                  if (watch("tiroides") == "true" && !val) {
                    return "Debe aclarar que tipo/s";
                  }
                  return true;
                },
              })}
              onBlur={() => handleBlur("detalleTiroides")}
            />
          )}
          {errors.detalleTiroides && (
            <p className="h-0 text-red-500">{errors.detalleTiroides.message}</p>
          )}
          <div className="flex items-center justify-between">
            <label className="text-2xl text-gray-900">Otros</label>
            <select
              defaultValue={client?.otros}
              className="border-2 border-gray-600 p-1 rounded-lg w-[5em] text-center"
              {...register("otros")}
              onBlur={() => handleBlur("otros")}
            >
              <option value="">-</option>
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
          {errors.otros && (
            <p className="h-0 text-red-500">{errors.otros.message}</p>
          )}
          {client.detalleOtros && (
            <input
              defaultValue={client?.detalleOtros}
              className="border p-2 rounded w-[17em]"
              type="text"
              placeholder="Cual?"
              {...register("detalleOtros", {
                validate: (val) => {
                  if (watch("otros") == "true" && !val) {
                    return "Debe aclarar que otro/s detalle/s";
                  }
                  return true;
                },
              })}
              onBlur={() => handleBlur("detalleOtros")}
            />
          )}
          {errors.detalleOtros && (
            <p className="h-0 text-red-500">{errors.detalleOtros.message}</p>
          )}
        </div>
      </div>
      <div className="px-5 w-full">
        <div className=" h-[8em] overflow-y-auto scrollbar-default flex items-center justify-between">
          <label className=" text-1xl text-center text-gray-900 px-1">
            <p className="hidden md:flex">
              By modifying this information, I declare that all the data
              provided regarding my health status is true and that I have
              understood all the explanations given to me in clear and Yesmple
              language. All my doubts have been clarified, so I fully agree with
              the treatments that will be carried out on me.
            </p>
            <p className="flex md:hidden">
              The individual affirms the accuracy of their health information,
              understands explanations, and fully agrees with planned treatments
              after having doubts clarified.
            </p>
            <input
              className="border p-2 rounded w-full mt-3"
              type="checkbox"
              {...register("consentimiento", {
                required: "Debe aceptar el consentimiento",
              })}
              defaultChecked={false}
              onBlur={() => handleBlur("consentimiento")}
              onClick={(e) => {}}
            />
          </label>
        </div>
        {errors.consentimiento && (
          <p className="h-0 text-red-500">{errors.consentimiento.message}</p>
        )}
      </div>
      <div className="flex justify-center mt-2">
        <button
          className="font-semibold w-[8em] ring-2 ring-icon-100 text-icon-100 hover:bg-icon-100 hover:text-white rounded-md my-5 py-3  text-2xl"
          type="submit"
          onClick={handleSubmit(onSubmit)}
        >
          Actualizar
        </button>
      </div>
    </form>
  );
};

export default PatientMedicalHistory;
