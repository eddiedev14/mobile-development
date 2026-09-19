import { IonButton, IonHeader, IonTitle, IonToolbar } from "@ionic/react";
import { useAppHeader } from "../../hooks/shared/useAppHeader";
import { useAuth } from "../../hooks/auth/useAuth";

const AppHeader = () => {
  const { user } = useAuth();
  const { handleLogout } = useAppHeader();

  return (
    <IonHeader>
      <IonToolbar>
        <div className="flex justify-between items-center px-8">
          <IonTitle>Taskie</IonTitle>
          <div className="flex gap-4">
            <span>@{user?.username}</span>
            <IonButton
              onClick={handleLogout}
              color="danger"
              fill="outline"
              size="small"
            >
              Cerrar Sesión
            </IonButton>
          </div>
        </div>
      </IonToolbar>
    </IonHeader>
  );
};

export default AppHeader;
