import { useSupabaseTable } from "../../supabase/hooks/useSupabaseTable";
import { Task } from "../../interfaces/task.interface";
import { useAuth } from "../auth/useAuth";

export const useTaskieState = () => {
  const { user } = useAuth();

  //* Supabase Custom Hook
  //? Este hook vive en un provider que se monta antes del login. `enabled` hace
  //? que sólo consulte y se suscriba a realtime cuando hay un usuario (y se cierre
  //? y reabra al cambiar de sesión); sin esto la lista no cargaba tras el login
  const {
    results: tasks,
    isPending,
    add,
    update,
    remove,
  } = useSupabaseTable<Task>("tasks", { enabled: !!user });

  //* Functions
  const addTask = async (task: Task): Promise<string | null> => {
    const result = await add(task);
    return result;
  };

  const toggleComplete = async (id: string): Promise<string | null> => {
    const current = tasks.find((task) => task.id === id);
    const result = await update(id, { completed: !current?.completed });
    return result;
  };

  const updateTask = async (
    id: string,
    data: Partial<Task>,
  ): Promise<string | null> => {
    const result = await update(id, data);
    return result;
  };

  const removeTask = async (id: string): Promise<string | null> => {
    const result = await remove(id);
    return result;
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
