import { useState } from "react";
import { initialContacts } from "../../data/contacts.data";
import type { Contact } from "../../interfaces/contact.interface";

export const useContactsState = () => {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);

  //* Functions
  const addContact = (contact: Contact) => {
    setContacts((prev) => [...prev, contact]);
  };

  const removeContact = (deleteId: number) => {
    setContacts((prev) =>
      [...prev].filter((contact) => contact.id !== deleteId),
    );
  };

  return {
    contacts,
    addContact,
    removeContact,
  };
};
