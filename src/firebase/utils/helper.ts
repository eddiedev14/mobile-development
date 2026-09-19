import { FirebaseError } from "firebase/app";
import { auth } from "../config";

// Función para obtener el mensaje de error de firebase a la hora de autenticarse
const getAuthErrorMessage = (error: unknown): string => {
  if (error instanceof FirebaseError) {
    switch (error.code) {
      case "auth/email-already-in-use":
        return "This email is already in use";

      case "auth/account-exists-with-different-credential":
        return "An account with this email already exists. Please sign in using your original sign-in method.";

      case "auth/invalid-email":
        return "Invalid email address";

      case "auth/weak-password":
        return "Password must be at least 6 characters long";

      case "auth/invalid-credential":
        return "Incorrect email or password. If you signed up with Google/Github, use it to sign in.";

      case "auth/popup-closed-by-user":
        return "The authentication window was closed";

      case "auth/expired-action-code":
        return "Reset link has expired. Please request a new one.";

      case "auth/invalid-action-code":
        return "Reset link is invalid or has already been used.";

      case "auth/network-request-failed":
        return "Connection error. Please check your internet connection";

      case "auth/too-many-requests":
        return "Too many attempts. Please try again later";

      default:
        return error.code;
    }
  }

  return "An unexpected error occurred";
};

// Función para obtener la id del usuario logueado
const getUserId = (): string | undefined => {
  return auth.currentUser?.uid;
};

export { getAuthErrorMessage, getUserId };
