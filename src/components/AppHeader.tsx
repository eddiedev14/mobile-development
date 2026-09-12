import { IonHeader, IonToolbar, IonTitle, IonButton } from "@ionic/react";
import { useAppHeader } from "../hooks/useAppHeader";

const AppHeader = () => {
  const { handleLogout } = useAppHeader();

  return (
    <IonHeader>
      <IonToolbar>
        <div className="flex justify-between mx-8">
          <IonTitle>Contacts App</IonTitle>
          <IonButton
            onClick={handleLogout}
            fill="outline"
            style={{ "--color": "white" }}
          >
            Cerrar Sesión
          </IonButton>
        </div>
      </IonToolbar>
    </IonHeader>
  );
};

export default AppHeader;
