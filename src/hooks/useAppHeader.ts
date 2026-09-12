import { toast } from "react-toastify";
import { useAlert } from "./alert/useAlert";
import { useAuth } from "./auth/useAuth";

export const useAppHeader = () => {
  // * Contexts
  const { logout } = useAuth();
  const { openAlert } = useAlert();

  // * Handlers
  const handleLogout = () => {
    openAlert({
      header: "¿Estás seguro?",
      message: `Si continúas, tu sesión se cerrará en Contacts App.`,
      onConfirm: () => {
        logout();
        toast.success("Sesión cerrada correctamente.");
      },
    });
  };

  return {
    handleLogout,
  };
};
