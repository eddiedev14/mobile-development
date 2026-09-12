import { usePatient } from "../hooks/patients/usePatient";

export const PatientFilter = () => {
  const { filterPatients } = usePatient();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form: HTMLFormElement = e.currentTarget;
    const { search } = Object.fromEntries(new FormData(form)) as {
      search: string;
    };

    filterPatients(search ?? "");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mt-2">
      <input
        name="search"
        id="search"
        placeholder="Buscar un paciente"
        className="p-2 rounded-md border border-gray-800"
      ></input>
      <button
        type="submit"
        className="p-2 text-white bg-green-600 cursor-pointer rounded-md"
      >
        Buscar
      </button>
    </form>
  );
};
