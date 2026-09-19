import { toast } from "react-toastify";
import { useAuth } from "../auth/useAuth";

export const useAppHeader = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success("Sesión cerrada correctamente.");
  };

  return {
    handleLogout,
  };
};
