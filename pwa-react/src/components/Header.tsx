import { toast } from "react-toastify";
import { useAuth } from "../hooks/auth/useAuth";

interface Props {
  title: string;
  paragraph: string;
}

export const Header = ({ title, paragraph }: Props) => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success("Sesión cerrada!");
  };

  return (
    <header className="flex flex-col gap-2">
      <h1 className="text-3xl text-center font-bold">{title}</h1>
      <p className="text-sm font-light text-gray-600 text-center">
        {paragraph}
      </p>
      <button
        onClick={handleLogout}
        className="absolute right-4 top-4 p-2 text-sm rounded-md text-white cursor-pointer bg-red-500"
      >
        Cerrar Sesión
      </button>
    </header>
  );
};
