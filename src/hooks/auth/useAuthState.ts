//* React
import { useState } from "react";

// * Types & utils
import type {
  UserDoc,
  UserLogin,
  UserRegister,
} from "../../interfaces/user.interface";
import type { UserPhoto } from "../../interfaces/photo.interface";

//? TODO: Reemplazar el estado local por Supabase Auth. Por ahora el "usuario"
//? vive sólo en memoria para poder navegar la app sin backend.

export default function useAuthState() {
  //* States
  const [user, setUser] = useState<UserDoc | null>(null);
  //? TODO: Resolver la sesión existente (supabase.auth.getSession) y
  //? suscribirse a onAuthStateChange para actualizar `user` y `userLoading`
  const [userLoading] = useState(false);

  //* Functions
  const registerWithEmailAndPassword = async (
    newUser: UserRegister,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    photo: UserPhoto,
  ): Promise<string | null> => {
    //? TODO: Registrar con supabase.auth.signUp y subir `photo.blob` al bucket "avatars"
    setUser({
      id: crypto.randomUUID(),
      email: newUser.email,
      username: newUser.username,
    });
    return null;
  };

  const loginWithEmailAndPassword = async (
    credentials: UserLogin,
  ): Promise<string | null> => {
    //? TODO: Iniciar sesión con supabase.auth.signInWithPassword
    setUser({
      id: crypto.randomUUID(),
      email: credentials.email,
      username: credentials.email.split("@")[0],
    });
    return null;
  };

  const logout = async (): Promise<string | null> => {
    //? TODO: Cerrar sesión con supabase.auth.signOut
    setUser(null);
    return null;
  };

  return {
    user,
    userLoading,
    registerWithEmailAndPassword,
    loginWithEmailAndPassword,
    logout,
  };
}
