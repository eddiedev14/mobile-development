import { useState } from "react";
import { Task, TaskDoc } from "../../interfaces/task.interface";

//? TODO: Reemplazar el estado local por la tabla `tasks` de Supabase (con
//? lista en tiempo real). Por ahora las tareas viven sólo en memoria.

export const useTaskieState = () => {
  //* States
  const [tasks, setTasks] = useState<TaskDoc[]>([]);
  const [isPending] = useState(false);

  //* Functions
  const addTask = async (task: Task): Promise<string | null> => {
    setTasks((prev) => [...prev, { ...task, id: crypto.randomUUID() }]);
    return null;
  };

  const toggleComplete = async (id: string): Promise<string | null> => {
    const current = tasks.find((task) => task.id === id);
    if (!current) return "Tarea no encontrada";

    return updateTask(id, { completed: !current.completed });
  };

  const updateTask = async (
    id: string,
    data: Partial<Task>,
  ): Promise<string | null> => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...data } : task)),
    );
    return null;
  };

  const removeTask = async (id: string): Promise<string | null> => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
    return null;
  };

  return {
    tasks,
    isPending,
    totalTasks: tasks.length,
    totalCompleted: tasks.filter((task) => task.completed).length,
    addTask,
    toggleComplete,
    updateTask,
    removeTask,
  };
};
