import { toast } from "react-toastify";
import { useAuth } from "../auth/useAuth";

export const useAppHeader = () => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    const error = await logout();

    if (error) {
      toast.error(error);
      return;
    }

    toast.success("Sesión cerrada correctamente.");
  };

  return {
    handleLogout,
  };
};
