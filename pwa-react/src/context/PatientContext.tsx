/* eslint-disable react-refresh/only-export-components */
import { createContext, type ReactNode } from "react";
import { usePatientState } from "../hooks/patients/usePatientState";

interface IProvider {
  children: ReactNode;
}

export const PatientContext = createContext<ReturnType<
  typeof usePatientState
> | null>(null);

export const PatientProvider = ({ children }: IProvider) => {
  const patientState = usePatientState();

  return (
    <PatientContext.Provider value={patientState}>
      {children}
    </PatientContext.Provider>
  );
};
