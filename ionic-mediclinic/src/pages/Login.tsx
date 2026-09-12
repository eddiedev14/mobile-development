import { IonContent, IonPage } from "@ionic/react";
import { LoginForm } from "../components/LoginForm";

const Login = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="min-h-screen flex items-center justify-center">
          <LoginForm />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;