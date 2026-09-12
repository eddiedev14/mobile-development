import { Header } from "../components/Header";
import { PatientForm } from "../components/PatientForm";
import { PatientList } from "../components/PatientList";

const MediClinic = () => {
  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-4 py-6 items-center">
      <Header
        title="Sistema de MediClinic"
        paragraph="Administra tus pacientes aquí (PWA)"
      />

      <main className="w-full grid grid-cols-2 gap-4">
        <PatientForm />
        <PatientList />
      </main>
    </div>
  );
};

export default MediClinic;
