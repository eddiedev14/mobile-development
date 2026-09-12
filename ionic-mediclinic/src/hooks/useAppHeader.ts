import { useAuth } from "./auth/useAuth";
import { useToast } from "./toast/useToast";

export const useAppHeader = () => {
  const { logout } = useAuth();
  const { showToast } = useToast();

  const handleLogout = () => {
    logout();
    showToast("Sesión cerrada correctamente.", "success");
  };

  return {
    handleLogout,
  };
};