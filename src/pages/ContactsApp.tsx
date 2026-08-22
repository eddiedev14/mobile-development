import Logo from "/logo.webp";
import { PageHeader } from "../components/PageHeader";
import { ContactForm } from "../components/ContactForm";
import { ContactList } from "../components/ContactList";
import { useContactsApp } from "../hooks/useContactsApp";

export const ContactsApp = () => {
  //* Custom Hooks
  const { loading, contacts, handleSubmit, showDeleteConfirmDialog } =
    useContactsApp();

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
    <div className="max-w-5xl mx-auto py-24 flex flex-col gap-8">
      <img src={Logo} className="absolute top-0 left-24 w-64" />

      <PageHeader
        title="Contacts App"
        paragraph="Aplicación de lista de contactos - Challenge 01"
      />

      <main className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <ContactForm onSubmit={handleSubmit} />
        <ContactList
          contacts={contacts}
          onDeleteClick={showDeleteConfirmDialog}
        />
      </main>
    </div>
  );
};
