import {
  IonAvatar,
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
} from "@ionic/react";
import ProfilePicture from "/profile-picture.png";
import AppHeader from "../components/AppHeader";
import { useAuth } from "../hooks/auth/useAuth";

const PerfilPage = () => {
  const { user } = useAuth();

  return (
    <IonPage>
      <AppHeader />
      <IonContent fullscreen>
        <main className="max-w-2xl mx-auto p-4 flex flex-col items-center gap-4">
          <IonAvatar className="size-32">
            <img src={ProfilePicture} alt="Doctor" />
          </IonAvatar>

          <h2 className="text-2xl font-semibold text-center">Mi Perfil</h2>

          <IonList className="w-full">
            <IonItem>
              <IonLabel>Nombre: {user?.name}</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Email: {user?.email}</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Rol: Médico</IonLabel>
            </IonItem>
          </IonList>
        </main>
      </IonContent>
    </IonPage>
  );
};

export default PerfilPage;