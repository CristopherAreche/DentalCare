import React, { useEffect, useState } from "react";
import Store from "./Store/Store.js";
import Tooth from "./Tooth.jsx";
import Toolbar from "./Toolbar.jsx";
import "./OdontogramComponent.css";
import axios from "axios";
import { useParams } from "react-router-dom";

const OdontogramComponent = () => {
  const { id } = useParams();
  const [state, setState] = useState({ ...Store, value: 0 });
  const endpointUrl = import.meta.env.VITE_ENDPOINT;

  const handleChange = (event, value) => {
    setState({ ...state, value });
  };

  const handleAction = (cor, nome) => {
    setState({ ...state, marked: { selecionado: nome, cor } });
  };

  const toggleTooth = (data) => {
    const newData = { ...data, status: !data.status };
    setState({ ...state, data: newData });
  };

  const setFace = (face, index, data) => {
    const acao = state.marked.cor;
    const newData = { ...data };
    if (acao === newData.faces[index].estado) {
      newData.faces[index].estado = "white";
    } else {
      newData.faces[index].estado = acao;
    }
    setState({ ...state, data: newData });
  };

  const { value } = state;

  const saveData = () => {
    const url = `${endpointUrl}/odontogramas/${id}`;
    axios
      .post(url, state)
      .then((response) => {
        console.log("Datos guardados con éxito", response.data);
      })
      .catch((error) => {
        console.error("Error al guardar los datos", error);
      });
  };

  return (
    <div className="flex flex-col justify-center items-center gap-8">
      <main className="bg-white w-[90%] flex flex-col justify-center items-center p-0 m-0">
        <nav
          className="justify-evenly flex h-12 w-full mb-4"
          value={value}
          onChange={handleChange}
        >
          <button
            className={`text cursor-pointer  h-full ${
              value === 0
                ? "bg-background-100 text-white px-10"
                : "px-10 ring-1 ring-background-100 text-background-100"
            }`}
            onClick={() => handleChange(null, 0)}
          >
            Adulto
          </button>
          <button
            className={`text cursor-pointer  h-full ${
              value === 1
                ? "bg-background-100 text-white px-10"
                : "px-10 ring-1 ring-background-100 text-background-100"
            }`}
            onClick={() => handleChange(null, 1)}
          >
            Infantil
          </button>
        </nav>

        {value === 0 && (
          <div className="m-4 h-auto py-5 md:max-h-[15em] flex flex-wrap justify-center overflow-y-hidden">
            {state.arcada.adulto.map((item, index) => {
              return (
                <Tooth
                  key={item.id}
                  index={index}
                  data={item}
                  toggleTooth={toggleTooth}
                  setFace={setFace}
                />
              );
            })}
          </div>
        )}

        {value === 1 && (
          <div className="lg:px-[9em] py-5 m-4 h-[15em] flex flex-wrap justify-center overflow-y-hidden">
            {state.arcada.infantil.map((item, index) => {
              return (
                <Tooth
                  key={item.id}
                  index={index}
                  data={item}
                  toggleTooth={toggleTooth}
                  setFace={setFace}
                />
              );
            })}
          </div>
        )}

        <Toolbar
          toolbar={state.toolbar}
          handleAction={handleAction}
          cor={state.marked.cor}
        />
      </main>
      <button
        onClick={saveData}
        className="ring-2 ring-background-100 text-background-100 hover:bg-background-100 hover:text-white py-2 px-6 uppercase rounded-md text-center"
      >
        Save
      </button>
    </div>
  );
};

export default OdontogramComponent;
