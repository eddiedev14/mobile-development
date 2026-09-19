import { IonContent, IonPage } from "@ionic/react";
import { AuthForm } from "../components/auth/AuthForm";
import { Loader } from "../components/shared/Loader";
import { useAuth } from "../hooks/auth/useAuth";

const AuthPage = ({ isSignup = false }) => {
  const { userLoading } = useAuth();
  if (userLoading) return <Loader />;

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="min-h-screen flex items-center justify-center">
          <AuthForm isSignup={isSignup} />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AuthPage;
