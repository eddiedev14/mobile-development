import { useState } from "react";
import type { Patient } from "../../interfaces/patient.interface";

export const usePatientState = () => {
  const [patients, setPatients] = useState<Patient[]>(() => {
    const patientStored = localStorage.getItem("patients");
    return patientStored ? JSON.parse(patientStored) : [];
  });

  const [searchTerm, setSearchTerm] = useState("");

  const filteredPatients = patients.filter((patient) => {
    const query = searchTerm.trim().toLowerCase();

    if (query === "") return true;

    return (
      patient.name.toLowerCase().includes(query) ||
      patient.lastname.toLowerCase().includes(query) ||
      patient.cc.includes(query)
    );
  });

  const addPatient = (patient: Patient) => {
    setPatients((prev) => {
      const updatedPatients = [...prev, patient];
      localStorage.setItem("patients", JSON.stringify(updatedPatients));
      return updatedPatients;
    });
  };

  const filterPatients = (term: string) => {
    setSearchTerm(term ?? "");
  };

  return {
    patients,
    filteredPatients,
    addPatient,
    filterPatients,
  };
};