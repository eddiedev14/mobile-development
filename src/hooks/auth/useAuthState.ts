//* React
import { useEffect, useState } from "react";
import type {
  UserDoc,
  UserLogin,
  UserRegister,
} from "../../interfaces/user.interface";
import type { UserPhoto } from "../../interfaces/photo.interface";
import { supabase } from "../../supabase/config";
import {
  AVATARS_BUCKET,
  getAuthErrorMessage,
  getAvatarPath,
  getAvatarUrl,
  toUserDoc,
} from "../../supabase/utils/helper";

export default function useAuthState() {
  //* States
  const [user, setUser] = useState<UserDoc | null>(null);
  const [userLoading, setUserLoading] = useState(true);

  //* Effects
  // Escucha cambios en el estado de autenticación
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ? toUserDoc(session.user) : null);
      setUserLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  //* Functions
  const registerWithEmailAndPassword = async (
    newUser: UserRegister,
    photo: UserPhoto,
  ): Promise<string | null> => {
    const { email, username, password } = newUser;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin,
        data: {
          // Metadatos del usuario
          username,
        },
      },
    });

    if (error) return getAuthErrorMessage(error);

    const authUser = data.user;
    if (!authUser) {
      return "No hay un usuario autenticado";
    }

    //? Sin `session` no hay usuario autenticado y las policies del bucket
    //? "avatars" rechazarían la subida.
    if (!data.session) {
      return "Confirma tu correo para terminar el registro";
    }

    // Subir la foto de perfil al bucket "avatars"
    const { error: uploadError } = await supabase.storage
      .from(AVATARS_BUCKET)
      .upload(getAvatarPath(authUser.id), photo.blob, {
        contentType: photo.blob.type || `image/${photo.format}`,
        upsert: true, // si se vuelve a registrar/subir, reemplaza la anterior
      });

    //? La cuenta ya existe y la sesión está abierta; sólo falló la foto
    if (uploadError) {
      //? El motivo real (RLS, mime type, tamaño, bucket inexistente) sólo se ve aquí
      console.error("Error subiendo el avatar:", uploadError);
      return "Cuenta creada, pero no se pudo subir la foto de perfil";
    }

    //? `onAuthStateChange` ya guardó al usuario antes de que terminara la subida,
    //? así que su avatar apunta a una foto que aún no existía. Se actualiza la URL
    //? con una versión nueva para que el header la vuelva a pedir
    setUser((prev) =>
      prev ? { ...prev, avatarUrl: getAvatarUrl(prev.id, Date.now()) } : prev,
    );

    return null;
  };

  const loginWithEmailAndPassword = async (
    credentials: UserLogin,
  ): Promise<string | null> => {
    const { email, password } = credentials;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    return error ? getAuthErrorMessage(error) : null;
  };

  const logout = async (): Promise<string | null> => {
    const { error } = await supabase.auth.signOut();
    return error ? getAuthErrorMessage(error) : null;
  };

  return {
    user,
    userLoading,
    registerWithEmailAndPassword,
    loginWithEmailAndPassword,
    logout,
  };
}
