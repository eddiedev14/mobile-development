//* React
import { useEffect, useState } from "react";

//* Firebase
import { auth } from "../../firebase/config";
import { useCollection } from "../../firebase/hooks/useCollection";
import {
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  setPersistence,
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
  useEffect(() => {
    setPersistence(auth, browserSessionPersistence).catch(() => {});
  }, []);

  useEffect(() => {
    let unsubscribeDoc = () => {};
    let isFirstNotification = true;

    const unsubscribeAuth = onAuthStateChanged(auth, (fbUser) => {
      unsubscribeDoc();

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

      setUserLoading(true);
      unsubscribeDoc = suscribeById(fbUser.uid, (userDoc) => {
        //? Firebase Auth es la fuente de verdad: si el documento de Firestore no
        //? existe (usuario creado desde la consola) se arma uno mínimo con los
        //? datos de la sesión, en lugar de dejar `user` en null para siempre
        //? (eso dejaba al usuario atrapado en el loader y además lo expulsaba
        //? a /login en cada carga de la app)
        setUser(
          userDoc ?? {
            id: fbUser.uid,
            email: fbUser.email ?? "",
            username: "",
          },
        );
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
