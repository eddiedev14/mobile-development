import { use } from "react";
import { FruitsContext } from "../../context/FruitsContext";

export const useFruits = () => {
  const context = use(FruitsContext);
  if (!context) {
    throw new Error("useFruits debe usarse dentro de un FruitsProvider");
  }
  return context;
};
