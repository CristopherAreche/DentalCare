import React, { useState, useEffect } from "react";
import { apiService } from "../services/api";
import { handleError } from "../utils/errorHandler";
import OdontogramComponent from "../components/Odontograma/OdontogramComponent";

const OdontogramaView = () => {
  const [odontograma, setOdontograma] = useState({ dientes: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOdontograma();
  }, []);

  const fetchOdontograma = async () => {
    try {
      setLoading(true);
      const response = await apiService.odontogram.getAll();
      setOdontograma(response);
    } catch (error) {
      handleError(error, "Fetch Odontogram");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Odontogram</h1>
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <p className="text-lg">
          <strong>Patient:</strong> {odontograma?.paciente || "Not specified"}
        </p>
        <p className="text-lg">
          <strong>Date:</strong> {odontograma?.fecha || "Not specified"}
        </p>
        <p className="text-lg">
          <strong>Observations:</strong>{" "}
          {odontograma?.observaciones || "No observations"}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Teeth:</h2>
        {odontograma?.dientes?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {odontograma.dientes.map((diente) => (
              <OdontogramComponent key={diente?.numero} {...diente} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No teeth data available</p>
        )}
      </div>
    </div>
  );
};

export default OdontogramaView;
