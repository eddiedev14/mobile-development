import { useEffect, useState } from "react";
import { PageHeader } from "../components/PageHeader";
import { ContactForm } from "../components/ContactForm";
import { ContactList } from "../components/ContactList";
import { useContacts } from "../hooks/useContacts";

export const ContactsApp = () => {
  //* States
  const [loading, setLoading] = useState(true);

  //* Effects
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  //* Custom Hooks
  const { contacts, addContact } = useContacts();

  // Mostrar el loader con ayuda de las clases de Daisy UI
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

      <main className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <ContactForm addContact={addContact} />
        <ContactList contacts={contacts} />
      </main>
    </div>
  );
};
