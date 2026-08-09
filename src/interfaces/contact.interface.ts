export interface Contact {
  id: number;
  name: string;
  phone: string;
}

export type ContactFormData = Omit<Contact, "id">;
