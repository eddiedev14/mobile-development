import { IonButton, IonHeader, IonTitle, IonToolbar } from "@ionic/react";
import { useAppHeader } from "../../hooks/shared/useAppHeader";

const AppHeader = () => {
  const { handleLogout } = useAppHeader();

  return (
    <IonHeader>
      <IonToolbar>
        <div className="flex justify-between items-center px-8">
          <IonTitle>Taskie</IonTitle>
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
