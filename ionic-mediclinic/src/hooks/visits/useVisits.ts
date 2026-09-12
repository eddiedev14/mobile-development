import { use } from "react";
import { VisitsContext } from "../../context/VisitsContext";

export const useVisits = () => {
  const context = use(VisitsContext);
  if (!context) {
    throw new Error("useVisits debe usarse dentro de un VisitsProvider");
  }
  return context;
};