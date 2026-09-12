import { use } from "react";
import { ToastContext } from "../../context/ToastContext";

export const useToast = () => {
  const context = use(ToastContext);
  if (!context) {
    throw new Error("useToast debe usarse dentro de un ToastProvider");
  }
  return context;
};