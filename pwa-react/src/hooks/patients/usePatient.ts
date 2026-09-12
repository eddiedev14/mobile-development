import { use } from "react";
import { PatientContext } from "../../context/PatientContext";

export const usePatient = () => {
  const context = use(PatientContext);
  if (!context) {
    throw new Error("usePatient debe usarse dentro de un PatientProvider");
  }
  return context;
};
