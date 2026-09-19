import { FirestoreDoc } from "../firebase/types/firestore.types";

export interface Task {
  name: string;
  description: string;
  completed: boolean;
}

export type TaskDoc = FirestoreDoc<Task>;
export type TaskFormData = Omit<Task, "completed">;
