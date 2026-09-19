import { useState } from "react";
import { toast } from "react-toastify";
import type { UserLogin, UserRegister } from "../../interfaces/user.interface";
import { passwordRegex } from "../../constants/regex.constant";
import { useAuth } from "./useAuth";

export const useAuthForm = (isSignup: boolean) => {
  const { registerWithEmailAndPassword, loginWithEmailAndPassword } = useAuth();
  const [submitting, setSubmitting] = useState(false);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form: HTMLFormElement = e.currentTarget;

    // Obtener valores del form con formData
    const { email, password, username } = Object.fromEntries(
      new FormData(form),
    ) as unknown as UserRegister;

    // Validar datos vacíos
    if (
      email.trim() === "" ||
      password.trim() === "" ||
      username.trim() === ""
    ) {
      toast.error("Todos los campos son obligatorios.");
      return;
    }

    // Validar password
    if (!passwordRegex.test(password)) {
      toast.error("La contraseña no cumple con las condiciones de seguridad.");
      return;
    }

    setSubmitting(true);
    const error = await registerWithEmailAndPassword({ email, password, username });
    setSubmitting(false);

    if (error) {
      toast.error(error);
      return;
    }

    toast.success("Usuario registrado correctamente");
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form: HTMLFormElement = e.currentTarget;

    // Obtener valores del form con formData
    const { email, password } = Object.fromEntries(
      new FormData(form),
    ) as unknown as UserLogin;

    // Validar datos vacíos
    if (email.trim() === "" || password.trim() === "") {
      toast.error("Todos los campos son obligatorios.");
      return;
    }

    setSubmitting(true);
    const error = await loginWithEmailAndPassword({ email, password });
    setSubmitting(false);

    if (error) {
      toast.error(error);
      return;
    }

    toast.success("Sesión iniciada correctamente");
  };

  return { handleSubmit: isSignup ? handleRegister : handleLogin, submitting };
};
