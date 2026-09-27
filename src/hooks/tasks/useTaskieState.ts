import { useRealTimeCollection } from "../../firebase/hooks/useRTCollection";
import { useAuth } from "../auth/useAuth";
import { Task } from "../../interfaces/task.interface";

export const useTaskieState = () => {
  //* Collection hook
  const { user } = useAuth();
  const userId = user?.id;

  //? En Realtime Database las tareas viven en "users/{uid}/tasks"
  const {
    results: tasks,
    isPending,
    add,
    updateNode,
    removeNode,
  } = useRealTimeCollection<Task>(userId ? `users/${userId}/tasks` : "");

  //* Functions
  const addTask = async (task: Task): Promise<string | null> => {
    const taskId = await add(task);
    return taskId ? null : "Hubo un error añadiendo la tarea";
  };

  const toggleComplete = async (id: string): Promise<string | null> => {
    const current = tasks.find((task) => task.id === id);
    if (!current) return "Tarea no encontrada";

    const success = await updateNode(id, { completed: !current.completed });
    return success ? null : "Hubo un error actualizando la tarea";
  };

  const updateTask = async (
    id: string,
    data: Partial<Task>,
  ): Promise<string | null> => {
    const success = await updateNode(id, data);
    return success ? null : "Hubo un error actualizando la tarea";
  };

  const removeTask = async (id: string): Promise<string | null> => {
    const success = await removeNode(id);
    return success ? null : "Hubo un error eliminando la tarea";
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
