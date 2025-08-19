import React from "react";
import DienteForm from "../components/Dientes/DienteForm";
import { apiService } from "../services/api";
import { handleError, handleSuccess } from "../utils/errorHandler";

const Diente = () => {
  const handleSubmit = async (data) => {
    try {
      // First, check if a tooth with the same number exists
      const existingTeeth = await apiService.teeth.getByNumber(data.numero);

      if (existingTeeth.length > 0) {
        // If exists, update that tooth
        const existingTooth = existingTeeth[0];
        await apiService.teeth.update(existingTooth.id, data);
        handleSuccess("Tooth updated successfully!");
      } else {
        // If not exists, create a new tooth
        await apiService.teeth.create(data);
        handleSuccess("Tooth created successfully!");
      }
    } catch (error) {
      handleError(error, "Tooth Operation");
    }
  };

  const handleCancel = () => {
    // Aquí puedes realizar alguna acción cuando se cancele el formulario
    alert("Formulario cancelado");
  };

  return (
    <div class="diente">
      <h1>Crear o editar un Diente</h1>
      <DienteForm onSubmit={handleSubmit} onCancel={handleCancel} />
    </div>
  );
};

export default Diente;
