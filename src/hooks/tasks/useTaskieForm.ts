import { toast } from "react-toastify";
import { Task, TaskFormData } from "../../interfaces/task.interface";
import { useTaskie } from "./useTaskie";

export const useTaskieForm = () => {
  const { addTask } = useTaskie();

  //* Handlers
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    // Obtener valores del form con formData
    const { name, description } = Object.fromEntries(
      new FormData(form),
    ) as TaskFormData;

    // Validar datos vacíos
    if (name.trim() === "" || description.trim() === "") {
      toast.error("Todos los campos son obligatorios.");
      return;
    }

    const task: Task = {
      name,
      description: description ?? "",
      completed: false,
    };

    const error = await addTask(task);
    if (error) {
      toast.error(error);
      return;
    }

    toast.success("Tarea agregada correctamente.");
    form.reset();
  };

  return {
    handleSubmit,
  };
};
