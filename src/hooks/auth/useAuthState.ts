//* React
import { useEffect, useState } from "react";

//* Firebase
import { auth } from "../../firebase/config";
import { useCollection } from "../../firebase/hooks/useCollection";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

// * Types & utils
import {
  User,
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

  //* Custom hooks
  const { setById, suscribeById } = useCollection<User>("users");

  //* Effects
  //? Authenticate the user when their session status changes
  useEffect(() => {
    let unsubscribeDoc = () => {};

    const unsubscribeAuth = onAuthStateChanged(auth, (fbUser) => {
      unsubscribeDoc();

      if (!fbUser) {
        setUser(null);
        setUserLoading(false);
        return;
      }

      setUserLoading(true);
      unsubscribeDoc = suscribeById(fbUser.uid, (userDoc) => {
        if (!userDoc) return;
        setUser(userDoc);
        setUserLoading(false);
      });
    });

    return () => {
      unsubscribeDoc();
      unsubscribeAuth();
    };
  }, [suscribeById]);

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
      await setById(userCredential.user.uid, { email, username });
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
