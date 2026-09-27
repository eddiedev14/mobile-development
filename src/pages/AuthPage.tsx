import { IonContent, IonPage } from "@ionic/react";
import { AuthForm } from "../components/auth/AuthForm";
import { Loader } from "../components/shared/Loader";
import { useAuth } from "../hooks/auth/useAuth";

const AuthPage = ({ isSignup = false }) => {
  const { userLoading } = useAuth();

  //? El <IonPage> se mantiene montado siempre: si se reemplaza por el <Loader/>
  //? durante la autenticación, el elemento de página se desmonta en mitad de la
  //? navegación y el router puede descartar la página entrante.
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="min-h-dvh flex items-center justify-center">
          {userLoading ? <Loader /> : <AuthForm isSignup={isSignup} />}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AuthPage;
