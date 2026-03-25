import React, { Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUserData } from "./store/features/usersSlice";

// Lazy loaded views
const Login = React.lazy(() => import("./views/Login"));
const Citas = React.lazy(() => import("./views/Appointments"));
const Inventory = React.lazy(() => import("./views/Inventory"));
const Patients = React.lazy(() => import("./views/Patients"));
const PatientDetails = React.lazy(() => import("./views/PatientDetails"));
const Register = React.lazy(() => import("./views/Register"));
const PassRecovery = React.lazy(() => import("./views/PassRecovery"));
const PassRestore = React.lazy(() => import("./views/PassRestore"));
const ClinicalHistory = React.lazy(() => import("./components/Pacients/ClinicalHistory"));
const PatientData = React.lazy(() => import("./views/PatientData"));
const PatientHistory = React.lazy(() => import("./views/PatientHistory"));
const Diente = React.lazy(() => import("./views/Diente"));
const Odontograma = React.lazy(() => import("./views/Odontograma"));
const Landing = React.lazy(() => import("./views/LandingPage"));
const ClientForm = React.lazy(() => import("./components/Pacients/PacientForm"));

// Loading spinner fallback
const LoadingFallback = () => (
  <div className="w-full h-[50vh] flex flex-col justify-center items-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-500 mb-4"></div>
    <p className="text-gray-500 font-medium">Cargando...</p>
  </div>
);

function App() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);
  
  return (
    <div className="w-full min-h-screen flex justify-center">
      <div className="w-full max-w-[1470px]">
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            {/* Dashboard routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/client-form" element={<ClientForm />} />
            <Route path="/citas" element={<Citas />} />
            <Route path="/inventario" element={<Inventory />} />
            <Route path="/pacientes" element={<Patients />} />
            <Route path="/pacientes/:id" element={<PatientDetails />} />
            <Route path="/recuperacion-contraseña" element={<PassRecovery />} />
            <Route path="/restablecer-contrasena" element={<PassRestore />} />
            <Route path="/historial-medico" element={<ClinicalHistory />} />
            <Route path="/datos" element={<PatientData />} />
            <Route path="/historial" element={<PatientHistory />} />
            {/* Pacients routes */}
            <Route path="/diente" element={<Diente />} />
            <Route path="/odontograma" element={<Odontograma />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
