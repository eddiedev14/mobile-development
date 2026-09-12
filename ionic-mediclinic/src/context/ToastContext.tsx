/* eslint-disable react-refresh/only-export-components */
import { createContext, type ReactNode } from "react";
import { useToastState } from "../hooks/toast/useToastState";

interface IProvider {
  children: ReactNode;
}

export const ToastContext = createContext<ReturnType<
  typeof useToastState
> | null>(null);

export const ToastProvider = ({ children }: IProvider) => {
  const toastState = useToastState();

  return (
    <ToastContext.Provider value={toastState}>{children}</ToastContext.Provider>
  );
};