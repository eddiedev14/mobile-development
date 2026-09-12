import { IonButton, IonHeader, IonTitle, IonToolbar } from "@ionic/react";
import { useAppHeader } from "../hooks/useAppHeader";

const AppHeader = () => {
  const { handleLogout } = useAppHeader();

  return (
    <IonHeader>
      <IonToolbar>
        <div className="flex justify-between items-center px-2">
          <IonTitle>MediClinic</IonTitle>
          <IonButton
            onClick={handleLogout}
            color="danger"
            fill="outline"
            size="small"
          >
            Cerrar Sesión
          </IonButton>
        </div>
      </IonToolbar>
    </IonHeader>
  );
};

export default AppHeader;