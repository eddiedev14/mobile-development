import { useState } from "react";
import { toast } from "react-toastify";
import { useAlert } from "./useAlert";
import { initialTasks } from "../data/tasks.data";
import { Task, TaskFormData } from "../interfaces/task.interface";

export const useTaskieState = () => {
  //* States
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  //* Contexts
  const { closeAlert } = useAlert();

  //* Functions
  const addTask = (task: Task) => {
    setTasks((prev) => [...prev, task]);
  };

  const toggleComplete = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const removeTask = (id: number) => {
    setTasks((prev) => [...prev].filter((task) => task.id !== id));
  };

  //* Handlers
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    // Obtener valore del form con formData
    const { name } = Object.fromEntries(new FormData(form)) as TaskFormData;

    // Validar datos vacíos
    if (name.trim() === "") {
      toast.error("El nombre de la tarea es obligatorio");
      return;
    }

    const task: Task = {
      id: Date.now(),
      name,
      completed: false,
    };

    addTask(task);
    toast.success("Tarea agregada correctamente.");
    form.reset();
  };

  const onConfirmDeleteAlert = (id: number) => {
    removeTask(id);
    closeAlert();
    toast.success("Tarea eliminada correctamente.");
  };

  return {
    tasks,
    totalTasks: tasks.length,
    totalCompleted: tasks.filter((task) => task.completed).length,
    handleSubmit,
    toggleComplete,
    onConfirmDeleteAlert,
  };
};
