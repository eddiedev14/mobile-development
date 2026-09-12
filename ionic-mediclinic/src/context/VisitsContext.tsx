/* eslint-disable react-refresh/only-export-components */
import { createContext, type ReactNode } from "react";
import { useVisitsState } from "../hooks/visits/useVisitsState";

interface IProvider {
  children: ReactNode;
}

export const VisitsContext = createContext<ReturnType<
  typeof useVisitsState
> | null>(null);

export const VisitsProvider = ({ children }: IProvider) => {
  const visitsState = useVisitsState();

  return (
    <VisitsContext.Provider value={visitsState}>
      {children}
    </VisitsContext.Provider>
  );
};