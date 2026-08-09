import { PageHeader } from "../components/PageHeader";

export const ContactsApp = () => {
  return (
    <div className="py-8 flex flex-col gap-6 max-w-5xl mx-auto">
      <PageHeader
        title="Contacts App"
        paragraph="Aplicación de lista de contactos - Challenge 01"
      />

      <main className="grid grid-cols-2 gap-6"></main>
    </div>
  );
};
