import type { VisitStatus } from "../interfaces/visit.interface";

const visitStatusLabels: Record<VisitStatus, string> = {
  pendiente: "Pendiente",
  en_camino: "En camino",
  finalizada: "Finalizada",
};

export { visitStatusLabels };