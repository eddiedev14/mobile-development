import { useEffect } from "react";
import { useCollection } from "../../firebase/hooks/useCollection";
import { useAuth } from "../auth/useAuth";
import { Task } from "../../interfaces/task.interface";

export const useTaskieState = () => {
  //* Collection hook
  const { user } = useAuth();
  const userId = user?.id;
  const {
    results: tasks,
    isPending,
    add,
    suscribe,
    update,
    remove,
  } = useCollection<Task>(`users/${userId}/tasks`);

  //* Effects
  useEffect(() => {
    if (!userId) return;
    return suscribe();
  }, [suscribe, userId]);

  //* Functions
  const addTask = async (task: Task): Promise<string | null> => {
    const taskId = await add(task);
    return taskId ? null : "Hubo un error añadiendo la tarea";
  };

  const toggleComplete = async (id: string): Promise<string | null> => {
    const current = tasks.find((task) => task.id === id);
    if (!current) return "Tarea no encontrada";

    const success = await update(id, { completed: !current.completed });
    return success ? null : "Hubo un error actualizando la tarea";
  };

  const removeTask = async (id: string): Promise<string | null> => {
    const success = await remove(id);
    return success ? null : "Hubo un error eliminando la tarea";
  };

  return {
    tasks,
    isPending,
    totalTasks: tasks.length,
    totalCompleted: tasks.filter((task) => task.completed).length,
    addTask,
    toggleComplete,
    removeTask,
  };
};
