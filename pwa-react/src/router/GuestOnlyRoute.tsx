import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/auth/useAuth";

export const GuestOnlyRoute = () => {
  const { logged } = useAuth();
  return logged ? <Navigate to="/mediclinic" /> : <Outlet />;
};
