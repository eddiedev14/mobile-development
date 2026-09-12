import { toast } from "react-toastify";
import { PHONE_REGEX } from "../../constants/regex.constant";
import { ContactFormData, Contact } from "../../interfaces/contact.interface";
import { useContacts } from "./useContacts";

export const useContactForm = () => {
  //* Contexts
  const { addContact } = useContacts();

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

  return {
    handleSubmit,
  };
};
