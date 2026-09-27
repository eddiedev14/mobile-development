import { toast } from "react-toastify";
import { PHONE_REGEX } from "../../constants/regex.constant";
import { ContactFormData } from "../../interfaces/contact.interface";
import { useContacts } from "./useContacts";

export const useContactForm = () => {
  //* Contexts
  const { addContact } = useContacts();

  //* Handlers
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    // Obtener valores del form con formData
    const { name, phone } = Object.fromEntries(
      new FormData(form),
    ) as unknown as ContactFormData;

    // Validar datos vacíos
    if (name.trim() === "" || phone.trim() === "") {
      toast.error("Todos los campos son obligatorios.");
      return;
    }

    // Validar formato del teléfono con la regex
    if (!PHONE_REGEX.test(phone)) {
      toast.error("El teléfono introducido no es válido");
      return;
    }

    const error = await addContact({ name: name.trim(), phone: phone.trim() });
    if (error) {
      toast.error(error);
      return;
    }

    toast.success("Contacto agregado correctamente.");
    form.reset();
  };

  return {
    handleSubmit,
  };
};
