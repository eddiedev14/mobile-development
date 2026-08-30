/* eslint-disable react-refresh/only-export-components */
import { createContext, ReactNode } from "react";
import { useTaskieState } from "../hooks/useTaskieState";

interface IProvider {
  children: ReactNode;
}

export const TaskieContext = createContext<ReturnType<
  typeof useTaskieState
> | null>(null);

export const TaskieProvider = ({ children }: IProvider) => {
  const taskieState = useTaskieState();

  return (
    <TaskieContext.Provider value={taskieState}>
      {children}
    </TaskieContext.Provider>
  );
};
