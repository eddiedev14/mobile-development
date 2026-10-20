import { useState } from "react";
import { toast } from "react-toastify";
import type { UserLogin, UserRegister } from "../../interfaces/user.interface";
import type { UserPhoto } from "../../interfaces/photo.interface";
import { passwordRegex } from "../../constants/regex.constant";
import { useAuth } from "./useAuth";

export const useAuthForm = (isSignup: boolean) => {
  const { registerWithEmailAndPassword, loginWithEmailAndPassword } = useAuth();
  const [submitting, setSubmitting] = useState(false);

  const handleRegister = async (
    e: React.FormEvent<HTMLFormElement>,
    photo: UserPhoto | null,
  ) => {
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

    // Validar foto de perfil
    if (!photo) {
      toast.error("La foto de perfil es obligatoria.");
      return;
    }

    // Validar password
    if (!passwordRegex.test(password)) {
      toast.error("La contraseña no cumple con las condiciones de seguridad.");
      return;
    }

    setSubmitting(true);
    const error = await registerWithEmailAndPassword(
      { email, password, username },
      photo,
    );
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

  //? La foto sólo se usa en el registro; el login la ignora
  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    photo: UserPhoto | null = null,
  ) => (isSignup ? handleRegister(e, photo) : handleLogin(e));

  return { handleSubmit, submitting };
};
