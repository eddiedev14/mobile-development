import { usePatient } from "../hooks/patients/usePatient";
import { PatientFilter } from "./PatientFilter";

export const PatientList = () => {
  const { filteredPatients } = usePatient();

  return (
    <div>
      <h2 className="text-xl font-bold">Listado de Pacientes</h2>
      <PatientFilter />

      {filteredPatients.length === 0 ? (
        <p className="mt-4 text-sm font-light text-gray-600">
          No se encontraron pacientes.
        </p>
      ) : (
        <ul className="mt-4 flex flex-col gap-4">
          {filteredPatients.map((patient) => (
            <li
              className="p-2 border border-gray-300 rounded-md"
              key={patient.cc}
            >
              <h3>Nombre: {[patient.name, patient.lastname].join(" ")}</h3>
              <p className="text-sm font-light text-gray-600">
                Cedula: {patient.cc}
              </p>
              <p className="text-sm font-light text-gray-600">
                Telefono: {patient.phone}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
