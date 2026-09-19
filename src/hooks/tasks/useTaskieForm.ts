import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Task } from "../../interfaces/task.interface";
import { useTaskie } from "./useTaskie";

export const useTaskieForm = (isEdit = false) => {
  const { id } = useParams<{ id: string }>();
  const { tasks, isPending, addTask, updateTask } = useTaskie();
  const navigate = useNavigate();

  const task = isEdit ? tasks.find((task) => task.id === id) : undefined;
  const isLoading = isEdit && !task && isPending;

  //* States
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  //? Precarga los datos de la tarea cuando se está editando
  useEffect(() => {
    if (!task) return;
    setName(task.name);
    setDescription(task.description);
  }, [task]);

  //* Handlers
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validar datos vacíos
    if (name.trim() === "" || description.trim() === "") {
      toast.error("Todos los campos son obligatorios.");
      return;
    }

    if (isEdit && id) {
      const error = await updateTask(id, {
        name: name.trim(),
        description: description.trim(),
      });
      if (error) {
        toast.error(error);
        return;
      }

      toast.success("Tarea actualizada correctamente.");
      navigate("/tasks");
      return;
    }

    const taskToAdd: Task = {
      name: name.trim(),
      description: description.trim(),
      completed: false,
    };

    const error = await addTask(taskToAdd);
    if (error) {
      toast.error(error);
      return;
    }

    toast.success("Tarea agregada correctamente.");
    setName("");
    setDescription("");
  };

  return {
    handleSubmit,
    name,
    setName,
    description,
    setDescription,
    isLoading,
    isEdit,
    task,
  };
};