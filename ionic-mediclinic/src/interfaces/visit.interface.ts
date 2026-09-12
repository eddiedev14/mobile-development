export type VisitStatus = "pendiente" | "en_camino" | "finalizada";

export interface Visit {
  id: number;
  patientName: string;
  patientLastname: string;
  cc: string;
  phone: string;
  date: string;
  time: string;
  reason: string;
  status: VisitStatus;
}