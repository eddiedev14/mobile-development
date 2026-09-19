import { toast } from "react-toastify";
import { TaskDoc } from "../../interfaces/task.interface";
import { useAlert } from "../alert/useAlert";
import { useTaskie } from "./useTaskie";

export const useTaskieList = () => {
  const { openAlert, closeAlert } = useAlert();
  const { removeTask } = useTaskie();

  const openDeleteAlert = (task: TaskDoc) => {
    openAlert({
      header: "Eliminar tarea",
      message: `¿Seguro que deseas eliminar la tarea "${task.name}"?`,
      onConfirm: async () => {
        const error = await removeTask(task.id);
        if (error) {
          toast.error(error);
          return;
        }
        closeAlert();
        toast.success("Tarea eliminada correctamente.");
      },
    });
  };

  return {
    openDeleteAlert,
  };
};
