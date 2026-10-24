/* eslint-disable react-refresh/only-export-components */
import { createContext, type ReactNode } from "react";
import { useMissionsState } from "../hooks/missions/useMissionsState";

interface IProvider {
  children: ReactNode;
}

export const MissionsContext = createContext<ReturnType<
  typeof useMissionsState
> | null>(null);

export const MissionsProvider = ({ children }: IProvider) => {
  const missionsState = useMissionsState();

  return (
    <MissionsContext.Provider value={missionsState}>
      {children}
    </MissionsContext.Provider>
  );
};
