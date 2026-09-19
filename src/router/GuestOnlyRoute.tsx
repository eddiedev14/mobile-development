import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/auth/useAuth";

interface Props {
  children: React.ReactNode;
}

const GuestOnlyRoute = ({ children }: Props) => {
  const { user } = useAuth();
  return user ? <Navigate to="/tasks" replace /> : children;
};

export default GuestOnlyRoute;
