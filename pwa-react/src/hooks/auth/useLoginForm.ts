import { toast } from "react-toastify";
import type { User } from "../../interfaces/user.interface";
import { validUsers } from "../../data/validUsers";
import { useAuth } from "./useAuth";

export const useLoginForm = () => {
  const { login } = useAuth();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form: HTMLFormElement = e.currentTarget;

    // Obtener valore del form con formData
    const { email, password } = Object.fromEntries(
      new FormData(form),
    ) as unknown as User;

    // Validar datos vacíos
    if (email.trim() === "" || password.trim() === "") {
      toast.error("Todos los campos son obligatorios.");
      return;
    }

    // Validar respecto a credenciales apropiadas
    const userFound = validUsers.some(
      (user) => user.email === email && user.password === password,
    );

    if (!userFound) {
      toast.error("Credenciales inválidas.");
      return;
    }

    login();
    toast.success("Inicio de sesión completado!");
  };

  return { handleLogin };
};
