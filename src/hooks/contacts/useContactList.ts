import { toast } from "react-toastify";
import { useContacts } from "./useContacts";
import { useAlert } from "../alert/useAlert";

export const useContactList = () => {
  // * Contexts
  const { removeContact } = useContacts();
  const { openAlert } = useAlert();

  // * Handlers
  const onDeleteContact = (id: number, name: string) => {
    openAlert({
      header: "¿Estás seguro?",
      message: `Si continúas, el contacto "${name}" será eliminado de tu lista de contactos.`,
      onConfirm: () => {
        removeContact(id);
        toast.success("Contacto eliminado correctamente.");
      },
    });
  };

  return {
    onDeleteContact,
  };
};
