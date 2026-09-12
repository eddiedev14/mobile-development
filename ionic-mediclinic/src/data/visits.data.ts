import type { Visit } from "../interfaces/visit.interface";
import { todayISO } from "../utils/date.util";

const today = todayISO();

const initialVisits: Visit[] = [
  {
    id: 1,
    patientName: "Eddie",
    patientLastname: "Delgado",
    cc: "1234567890",
    phone: "3123125321",
    date: today,
    time: "08:30",
    reason: "Consulta general",
    status: "pendiente",
  },
  {
    id: 2,
    patientName: "María",
    patientLastname: "López",
    cc: "987654321",
    phone: "3214567890",
    date: today,
    time: "10:00",
    reason: "Control de tensión arterial",
    status: "en_camino",
  },
  {
    id: 3,
    patientName: "Carlos",
    patientLastname: "García",
    cc: "4567891234",
    phone: "3154001122",
    date: today,
    time: "09:15",
    reason: "Revisión de exámenes de laboratorio",
    status: "finalizada",
  },
  {
    id: 4,
    patientName: "Ana",
    patientLastname: "Martínez",
    cc: "789123456",
    phone: "3189003344",
    date: today,
    time: "11:45",
    reason: "Seguimiento de tratamiento",
    status: "pendiente",
  },
  {
    id: 5,
    patientName: "Luis",
    patientLastname: "Pérez",
    cc: "1122334455",
    phone: "3175556677",
    date: today,
    time: "13:00",
    reason: "Control metabólico",
    status: "en_camino",
  },
];

export { initialVisits };