import { toast } from "react-toastify";
import type { Patient } from "../../interfaces/patient.interface";
import { ccRegex, phoneRegex } from "../../constants/regex.constant";
import { usePatient } from "./usePatient";

export const usePatientForm = () => {
  const { addPatient } = usePatient();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form: HTMLFormElement = e.currentTarget;

    // Obtener valore del form con formData
    const { name, lastname, cc, phone } = Object.fromEntries(
      new FormData(form),
    ) as unknown as Patient;

    // Validar datos vacíos
    if (
      name.trim() === "" ||
      lastname.trim() === "" ||
      cc.trim() === "" ||
      phone.trim() === ""
    ) {
      toast.error("Todos los campos son obligatorios.");
      return;
    }

    // Validar cedula
    if (!ccRegex.test(cc)) {
      toast.error("La cédula no cumple un formato valido.");
      return;
    }

    // Validar telefono
    if (!phoneRegex.test(phone)) {
      toast.error("El telefono no cumple un formato valido.");
      return;
    }

    const patient: Patient = {
      name,
      lastname,
      cc,
      phone,
    };

    addPatient(patient);
    toast.success("Paciente creado correctamente!");
  };

  return { handleSubmit };
};
