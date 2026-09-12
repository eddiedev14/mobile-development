import { usePatientForm } from "../hooks/patients/usePatientForm";

export const PatientForm = () => {
  const { handleSubmit } = usePatientForm();

  return (
    <div>
      <h2 className="text-xl font-bold">Agregar un Paciente</h2>

      <form onSubmit={handleSubmit} className="mt-2 flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="name">Nombre</label>
          <input
            name="name"
            id="name"
            placeholder="e.g. Eddie"
            className="p-2 rounded-md border border-gray-800"
          ></input>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="lastname">Apellido</label>
          <input
            name="lastname"
            id="lastname"
            placeholder="e.g. Delgado"
            className="p-2 rounded-md border border-gray-800"
          ></input>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="cc">Cedula</label>
          <input
            name="cc"
            id="cc"
            placeholder="e.g. 12345678901"
            className="p-2 rounded-md border border-gray-800"
          ></input>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="phone">Telefono</label>
          <input
            name="phone"
            id="phone"
            placeholder="e.g. 3123125321"
            className="p-2 rounded-md border border-gray-800"
          ></input>
        </div>

        <button
          type="submit"
          className="bg-green-600 py-2 cursor-pointer rounded-md text-white"
        >
          Agregar Paciente
        </button>
      </form>
    </div>
  );
};
