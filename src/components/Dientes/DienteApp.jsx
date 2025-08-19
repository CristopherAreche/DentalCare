import React from "react";
import DienteForm from "./DienteForm";
import axios from "axios";

const DienteApp = () => {
  const apiUrl = import.meta.env.VITE_ENDPOINT;

  const handleSubmit = (data) => {
    axios
      .post(`${apiUrl}/dientes`, data)
      .then((response) => {
        console.log("Respuesta del servidor:", response.data);
      })
      .catch((error) => {
        console.error("Error al enviar los datos:", error);
      });
  };

  const handleCancel = () => {
    alert("Formulario cancelado");
  };

  return (
    <div>
      <h1>Formulario de Diente</h1>
      <DienteForm onSubmit={handleSubmit} onCancel={handleCancel} />
    </div>
  );
};

export default DienteApp;
