export interface Task {
  id: number;
  name: string;
  completed: boolean;
}

export type TaskFormData = Pick<Task, "name">;
