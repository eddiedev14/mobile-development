/* eslint-disable react-refresh/only-export-components */
import { createContext, ReactNode } from "react";
import { useFruitsState } from "../hooks/fruits/useFruitsState";

interface IProvider {
  children: ReactNode;
}

export const FruitsContext = createContext<ReturnType<
  typeof useFruitsState
> | null>(null);

export const FruitsProvider = ({ children }: IProvider) => {
  const fruitsState = useFruitsState();

  return (
    <FruitsContext.Provider value={fruitsState}>
      {children}
    </FruitsContext.Provider>
  );
};
