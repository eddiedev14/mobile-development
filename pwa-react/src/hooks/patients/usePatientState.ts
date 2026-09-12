import { useState } from "react";
import type { Patient } from "../../interfaces/patient.interface";

export const usePatientState = () => {
  const [patients, setPatients] = useState<Patient[]>(() => {
    const patientStored = localStorage.getItem("patients");
    return patientStored ? JSON.parse(patientStored) : [];
  });

  const [filteredPatients, setFilteredPatients] =
    useState<Patient[]>(patients);

  const addPatient = (patient: Patient) => {
    setPatients((prev) => {
      const updatedPatients = [...prev, patient];
      localStorage.setItem("patients", JSON.stringify(updatedPatients));
      return updatedPatients;
    });
  };

  const filterPatients = (term: string) => {
    const query = term.trim().toLowerCase();

    if (query === "") {
      setFilteredPatients(patients);
      return;
    }

    const result = patients.filter((patient) => {
      return (
        patient.name.toLowerCase().includes(query) ||
        patient.lastname.toLowerCase().includes(query) ||
        patient.cc.includes(query)
      );
    });

    setFilteredPatients(result);
  };

  return {
    patients,
    filteredPatients,
    addPatient,
    filterPatients,
  };
};
