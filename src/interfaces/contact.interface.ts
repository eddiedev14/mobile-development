import { FirestoreDoc } from "../firebase/types/firestore.types";

export interface Contact {
  name: string;
  phone: string;
}

export type ContactDoc = FirestoreDoc<Contact>;
export type ContactFormData = Contact;
