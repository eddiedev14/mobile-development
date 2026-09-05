import { use } from "react";
import { ContactsContext } from "../context/ContactsContext";

export const useContacts = () => {
  const context = use(ContactsContext);
  if (!context) {
    throw new Error("useContacts debe usarse dentro de un ContactsProvider");
  }
  return context;
};
