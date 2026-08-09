import { useState } from "react";
import { initialContacts } from "../data/contacts.data";
import type { Contact } from "../interfaces/contact.type";

export const useContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);

  return {
    contacts,
    setContacts,
  };
};
