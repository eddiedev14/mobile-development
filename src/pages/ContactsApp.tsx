import { useEffect, useState } from "react";
import { PageHeader } from "../components/PageHeader";
import { ContactForm } from "../components/ContactForm";

export const ContactsApp = () => {
  const [loading, setLoading] = useState(true);

  // Se muestra el loader 3 segundos y luego se quita
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 3000);

    // Función de limpieza del timers
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  // Si loading es true se muestra el loader con ayuda de las clases de Daisy UI
  if (loading) {
    return (
      <div className="min-h-dvh flex items-center justify-center">
        <span
          className="loading loading-spinner loading-xl"
          role="status"
          aria-live="polite"
        ></span>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-8 flex flex-col gap-8">
      <PageHeader
        title="Contacts App"
        paragraph="Aplicación de lista de contactos - Challenge 01"
      />

      <main className="grid grid-cols-2 gap-6">
        <ContactForm />
      </main>
    </div>
  );
};
