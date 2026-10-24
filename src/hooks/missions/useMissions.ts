import { use } from "react";
import { MissionsContext } from "../../context/MissionsContext";

export const useMissions = () => {
  const context = use(MissionsContext);
  if (!context) {
    throw new Error("useMissions debe usarse dentro de un MissionsProvider");
  }
  return context;
};
