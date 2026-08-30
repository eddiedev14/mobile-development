import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAlert } from "./useAlert";
import { PHONE_REGEX } from "../constants/regex.constant";
import { initialContacts } from "../data/contacts.data";
import type { Contact, ContactFormData } from "../interfaces/contact.interface";

export const useContactsApp = () => {
  //* States
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);

  //* Contexts
  const { closeAlert } = useAlert();

  //* Effects
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  //* Functions
  const addContact = (contact: Contact) => {
    setContacts((prev) => [...prev, contact]);
  };

  const removeContact = (deleteId: number) => {
    setContacts((prev) =>
      [...prev].filter((contact) => contact.id !== deleteId),
    );
  };

  //* Handlers
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    // Obtener valore del form con formData
    const { name, phone } = Object.fromEntries(
      new FormData(form),
    ) as ContactFormData;

    // Validar datos vacíos
    if (name.trim() === "" || phone.trim() === "") {
      toast.error("Todos los campos son obligatorios.");
      return;
    }

    // Validar formato del telefono con la regex
    if (!PHONE_REGEX.test(phone)) {
      toast.error("El teléfono introducido no es válido");
      return;
    }

    const contact: Contact = {
      id: Date.now(),
      name,
      phone,
    };

    addContact(contact);
    toast.success("Contacto agregado correctamente.");
    form.reset();
  };

  const onConfirmDeleteAlert = (id: number) => {
    removeContact(id);
    closeAlert();
    toast.success("Contacto eliminado correctamente.");
  };

  return {
    loading,
    contacts,
    handleSubmit,
    onConfirmDeleteAlert,
  };
};
