import {
  AuthError,
  isAuthRetryableFetchError,
  User as SupabaseUser,
} from "@supabase/supabase-js";
import { UserDoc } from "../../interfaces/user.interface";
import { supabase } from "../config";

//? Bucket donde se guardan las fotos de perfil
const AVATARS_BUCKET = "avatars";

//? Ruta de la foto de cada usuario dentro del bucket. Va sin extensión para que
//? la URL se pueda armar sólo con el id (el tipo se guarda en el contentType)
const getAvatarPath = (userId: string): string => `${userId}/avatar`;

// Función para obtener la URL pública de la foto de perfil de un usuario
//? Requiere que el bucket sea público. `version` evita que el navegador
//? muestre una copia en caché (o un error) cuando la foto se acaba de subir
const getAvatarUrl = (userId: string, version?: number): string => {
  const { data } = supabase.storage
    .from(AVATARS_BUCKET)
    .getPublicUrl(getAvatarPath(userId));

  return version ? `${data.publicUrl}?v=${version}` : data.publicUrl;
};

// Función para obtener el mensaje de error de Supabase a la hora de autenticarse
const getAuthErrorMessage = (error: unknown): string => {
  if (isAuthRetryableFetchError(error)) {
    return "Error de conexión. Revisa tu conexión a internet";
  }

  if (error instanceof AuthError) {
    switch (error.code) {
      case "email_exists":
      case "user_already_exists":
        return "Este correo ya está en uso";

      case "email_address_invalid":
        return "El correo electrónico no es válido";

      case "weak_password":
        return "La contraseña debe tener al menos 6 caracteres";

      case "invalid_credentials":
        return "Correo o contraseña incorrectos";

      case "email_not_confirmed":
        return "Confirma tu correo antes de iniciar sesión";

      case "signup_disabled":
        return "El registro está deshabilitado por el momento";

      case "user_banned":
        return "Esta cuenta ha sido suspendida";

      case "same_password":
        return "La nueva contraseña debe ser diferente a la actual";

      case "otp_expired":
        return "El enlace ha expirado. Solicita uno nuevo";

      case "session_expired":
      case "session_not_found":
      case "refresh_token_not_found":
        return "Tu sesión ha expirado. Inicia sesión de nuevo";

      case "over_request_rate_limit":
      case "over_email_send_rate_limit":
      case "over_sms_send_rate_limit":
        return "Demasiados intentos. Inténtalo de nuevo más tarde";

      default:
        //? Los mensajes de Supabase vienen en inglés: se muestra uno genérico
        //? en español y el original se deja en consola para depurar
        console.error(error);
        return "Ocurrió un error de autenticación";
    }
  }

  return "Ocurrió un error inesperado";
};

// Función para obtener el mensaje de error de Supabase a la hora de consultar
// o modificar una tabla (errores de PostgREST / Postgres)
const getDbErrorMessage = (error: unknown): string => {
  //? PostgrestError extiende de Error y agrega `code` (código de Postgres o PGRST...)
  const code =
    error instanceof Error && "code" in error
      ? String((error as { code: unknown }).code)
      : "";

  switch (code) {
    case "42501": // insufficient_privilege (lo que devuelve una policy de RLS)
      return "No tienes permiso para realizar esta acción";

    case "23505": // unique_violation
      return "Este registro ya existe";

    case "23503": // foreign_key_violation
      return "Este registro está vinculado a otro";

    case "23502": // not_null_violation
      return "Faltan campos obligatorios";

    case "22P02": // invalid_text_representation (ej. un uuid mal formado)
      return "El formato de los datos no es válido";

    case "PGRST116": // .single() sin filas: no existe o la RLS no deja verla
      return "Registro no encontrado";
  }

  if (error instanceof Error) {
    //? Fallo de red de fetch (sin conexión, servidor caído, etc.)
    if (error.message.toLowerCase().includes("failed to fetch")) {
      return "Error de conexión. Revisa tu conexión a internet";
    }

    //? Los mensajes de Supabase vienen en inglés: se muestra uno genérico en
    //? español y el original se deja en consola para depurar
    console.error(error);
  }

  return "Ocurrió un error inesperado";
};

// Función para convertir el usuario de Supabase a la interface UserDoc
const toUserDoc = (authUser: SupabaseUser): UserDoc => ({
  id: authUser.id,
  email: authUser.email ?? "",
  username: authUser.user_metadata.username ?? "",
  avatarUrl: getAvatarUrl(authUser.id),
});

export {
  AVATARS_BUCKET,
  getAuthErrorMessage,
  getDbErrorMessage,
  getAvatarPath,
  getAvatarUrl,
  toUserDoc,
};
