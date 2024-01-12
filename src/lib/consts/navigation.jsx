import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faChartSimple,
  faBoxesStacked,
  faUsers,
  faUser,
  faQuestion,
  faNotesMedical,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(
  faChartSimple,
  faBoxesStacked,
  faUsers,
  faQuestion,
  faNotesMedical,
  faUser
);
export const DASHBOARD_SIDEBAR_LINKS = [
  {
    key: "citas",
    label: "Appointments",
    path: "/citas",
    icon: <FontAwesomeIcon icon={faChartSimple} />,
  },
  {
    key: "inventario",
    label: "Inventory",
    path: "/inventario",
    icon: <FontAwesomeIcon icon={faBoxesStacked} />,
  },
  {
    key: "pacientes",
    label: "Patients",
    path: "/pacientes",
    icon: <FontAwesomeIcon icon={faUsers} />,
  },
];

export const USER_SIDEBAR_LINKS = [
  {
    key: "turnos",
    label: "Appointments",
    path: "/citas",
    icon: <FontAwesomeIcon icon={faChartSimple} />,
  },
  {
    key: "Datos Personales",
    label: "My Info",
    path: "/datos",
    icon: <FontAwesomeIcon icon={faUser} />,
  },
  {
    key: "Historial Médico",
    label: "Medical History",
    path: "/historial",
    icon: <FontAwesomeIcon icon={faNotesMedical} />,
  },
];
// Esto es un comentario random
