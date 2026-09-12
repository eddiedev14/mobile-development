import type { User } from "../../interfaces/user.interface";
import { validUsers } from "../../data/validUsers";
import { useAuth } from "./useAuth";
import { useToast } from "../toast/useToast";

export const useLoginForm = () => {
  const { login } = useAuth();
  const { showToast } = useToast();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form: HTMLFormElement = e.currentTarget;

    // Obtener valores del form con formData
    const { email, password } = Object.fromEntries(
      new FormData(form),
    ) as unknown as User;

    // Validar datos vacíos
    if (email.trim() === "" || password.trim() === "") {
      showToast("Todos los campos son obligatorios.", "danger");
      return;
    }

    // Validar respecto a credenciales apropiadas
    const userFound = validUsers.find(
      (user) => user.email === email && user.password === password,
    );

    if (!userFound) {
      showToast("Credenciales inválidas.", "danger");
      return;
    }

    login(userFound);
    showToast("Inicio de sesión completado!", "success");
  };

  return { handleLogin };
};