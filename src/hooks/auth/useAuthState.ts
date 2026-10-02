//* React
import { useEffect, useState } from "react";

//* Firebase
import { auth } from "../../firebase/config";
import {
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

// * Types & utils
import {
  UserLogin,
  UserDoc,
  UserRegister,
} from "../../interfaces/user.interface";
import { getAuthErrorMessage } from "../../firebase/utils/helper";

const loginWithEmailAndPassword = async (
  credentials: UserLogin,
): Promise<string | null> => {
  try {
    await signInWithEmailAndPassword(
      auth,
      credentials.email,
      credentials.password,
    );
    return null;
  } catch (err) {
    return getAuthErrorMessage(err);
  }
};

const logout = async (): Promise<string | null> => {
  try {
    await signOut(auth);
    return null;
  } catch {
    return "Unable to log out. Please try again.";
  }
};

export default function useAuthState() {
  //* States
  const [user, setUser] = useState<UserDoc | null>(null);
  const [userLoading, setUserLoading] = useState(true);

  //* Effects
  useEffect(() => {
    setPersistence(auth, browserSessionPersistence).catch(() => {});
  }, []);

  useEffect(() => {
    let isFirstNotification = true;

    const unsubscribeAuth = onAuthStateChanged(auth, (fbUser) => {
      const forceLogout = fbUser && isFirstNotification;
      isFirstNotification = false;

      if (forceLogout) {
        signOut(auth).catch(() => {});
        return; //? el propio signOut dispara una nueva notificación, ya con null
      }

      if (!fbUser) {
        setUser(null);
        setUserLoading(false);
        return;
      }

      //? Firebase Auth es la fuente de verdad: el username vive en displayName
      setUser({
        id: fbUser.uid,
        email: fbUser.email ?? "",
        username: fbUser.displayName ?? "",
      });
      setUserLoading(false);
    });

    return () => {
      unsubscribeAuth();
    };
  }, []);

  //* Functions
  const registerWithEmailAndPassword = async (
    user: UserRegister,
  ): Promise<string | null> => {
    let error: string | null = null;
    const { email, password, username } = user;

    // Proceed with the register in Firebase Auth
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      await updateProfile(userCredential.user, { displayName: username });
      setUser({ id: userCredential.user.uid, email, username });
    } catch (err) {
      error = getAuthErrorMessage(err);
    }

    return error;
  };

  return {
    user,
    userLoading,
    registerWithEmailAndPassword,
    loginWithEmailAndPassword,
    logout,
  };
}
