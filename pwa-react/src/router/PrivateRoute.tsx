import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/auth/useAuth";

export const PrivateRoute = () => {
  const { logged } = useAuth();
  return logged ? <Outlet /> : <Navigate to="/login" />;
};
