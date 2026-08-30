import { use } from "react";
import { TaskieContext } from "../context/TaskieContext";

export const useTaskie = () => {
  const context = use(TaskieContext);
  if (!context) {
    throw new Error("useTaskie debe usarse dentro de un TaskieProvider");
  }
  return context;
};
