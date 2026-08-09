import { useState } from "react";
import { toast } from "react-toastify";
import { initialContacts } from "../data/contacts.data";
import type { Contact, ContactFormData } from "../interfaces/contact.interface";

export const useContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);

  const addContact = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    // Obtener valore del form con formData
    const { name, phone } = Object.fromEntries(
      new FormData(form),
    ) as ContactFormData;

    if (name.trim() === "" || phone.trim() === "") {
      toast.error("Todos los campos son obligatorios.");
      return;
    }

    const contact: Contact = {
      id: Date.now(),
      name,
      phone,
    };

    // Actualizar el estado contacts
    setContacts((prev) => [...prev, contact]);
    toast.success("Contacto agregado correctamente.");
    form.reset();
  };

  return {
    contacts,
    addContact,
  };
};
