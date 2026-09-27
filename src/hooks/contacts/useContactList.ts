import { toast } from "react-toastify";
import { ContactDoc } from "../../interfaces/contact.interface";
import { useAlert } from "../alert/useAlert";
import { useContacts } from "./useContacts";

export const useContactList = () => {
  // * Contexts
  const { removeContact } = useContacts();
  const { openAlert, closeAlert } = useAlert();

  // * Handlers
  const openDeleteAlert = (contact: ContactDoc) => {
    openAlert({
      header: "Eliminar contacto",
      message: `¿Seguro que deseas eliminar el contacto "${contact.name}"?`,
      onConfirm: async () => {
        const error = await removeContact(contact.id);
        if (error) {
          toast.error(error);
          return;
        }

        closeAlert();
        toast.success("Contacto eliminado correctamente.");
      },
    });
  };

  return {
    openDeleteAlert,
  };
};
