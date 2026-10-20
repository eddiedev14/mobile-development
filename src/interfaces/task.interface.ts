import { SupabaseRow } from "../supabase/types/supabase.types";

export interface Task {
  name: string;
  description: string;
  completed: boolean;
}

export type TaskDoc = SupabaseRow<Task>;
export type TaskFormData = Omit<Task, "completed">;
