import { use } from "react";
import { AlertContext } from "../../context/AlertContext";

export const useAlert = () => {
  const context = use(AlertContext);
  if (!context) {
    throw new Error("useAlert debe usarse dentro de un AlertProvider");
  }
  return context;
};
