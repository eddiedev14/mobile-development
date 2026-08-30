/* eslint-disable react-refresh/only-export-components */
import { createContext, ReactNode } from "react";
import { useAlertState } from "../hooks/useAlertState";

interface IProvider {
  children: ReactNode;
}

export const AlertContext = createContext<ReturnType<
  typeof useAlertState
> | null>(null);

export const AlertProvider = ({ children }: IProvider) => {
  const alertState = useAlertState();

  return (
    <AlertContext.Provider value={alertState}>{children}</AlertContext.Provider>
  );
};
