/* eslint-disable react-refresh/only-export-components */
import { createContext, ReactNode } from "react";
import { useContactsState } from "../hooks/useContactsState";

interface IProvider {
  children: ReactNode;
}

export const ContactsContext = createContext<ReturnType<
  typeof useContactsState
> | null>(null);

export const ContactsProvider = ({ children }: IProvider) => {
  const contactsState = useContactsState();

  return (
    <ContactsContext.Provider value={contactsState}>
      {children}
    </ContactsContext.Provider>
  );
};
