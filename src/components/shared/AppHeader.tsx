import { IonButton } from "@ionic/react";
import PageHeader from "./PageHeader";
import { useAppHeader } from "../../hooks/shared/useAppHeader";
import { useAuth } from "../../hooks/auth/useAuth";

const AppHeader = () => {
  const { user } = useAuth();
  const { handleLogout } = useAppHeader();

  return (
    <PageHeader title="Challenge 06">
      <div className="flex items-center gap-2 pr-6">
        <span className="text-sm font-normal">@{user?.username}</span>
        <IonButton
          onClick={handleLogout}
          color="danger"
          fill="outline"
          size="small"
        >
          Cerrar Sesión
        </IonButton>
      </div>
    </PageHeader>
  );
};

export default AppHeader;
