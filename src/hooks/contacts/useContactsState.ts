import { useEffect } from "react";
import { useCollection } from "../../firebase/hooks/useCollection";
import { useAuth } from "../auth/useAuth";
import { Contact } from "../../interfaces/contact.interface";

export const useContactsState = () => {
  //* Collection hook
  const { user } = useAuth();
  const userId = user?.id;

  //? En Firestore los contactos viven en la subcolección "users/{uid}/contacts"
  const {
    results: contacts,
    isPending,
    add,
    suscribe,
    remove,
  } = useCollection<Contact>(`users/${userId}/contacts`);

  //* Effects
  useEffect(() => {
    if (!userId) return;
    return suscribe();
  }, [suscribe, userId]);

  //* Functions
  const addContact = async (contact: Contact): Promise<string | null> => {
    const contactId = await add(contact);
    return contactId ? null : "Hubo un error añadiendo el contacto";
  };

  const removeContact = async (id: string): Promise<string | null> => {
    const success = await remove(id);
    return success ? null : "Hubo un error eliminando el contacto";
  };

  return {
    contacts,
    isPending,
    addContact,
    removeContact,
  };
};
