import { PageHeader } from "../components/PageHeader";
import { ContactForm } from "../components/ContactForm";

export const ContactsApp = () => {
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
