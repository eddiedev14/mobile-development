import { useState } from "react";
import { IonAvatar, IonButton } from "@ionic/react";
import ProfilePicture from "/profile-picture.png";
import PageHeader from "./PageHeader";
import { useAppHeader } from "../../hooks/shared/useAppHeader";
import { useAuth } from "../../hooks/auth/useAuth";

const AppHeader = () => {
  const { user } = useAuth();
  const { handleLogout } = useAppHeader();

  //? URL que falló al cargar. Al compararla con la actual se muestra la imagen
  //? por defecto sólo para esa URL; si cambia (foto nueva) se intenta de nuevo
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const avatarSrc =
    user?.avatarUrl && user.avatarUrl !== failedSrc
      ? user.avatarUrl
      : ProfilePicture;

  return (
    <PageHeader title="Challenge 08">
      <div className="flex items-center gap-2 pr-6">
        <span className="text-sm font-normal">@{user?.username}</span>
        <IonAvatar className="size-8">
          <img
            src={avatarSrc}
            alt="Avatar"
            onError={() => setFailedSrc(user?.avatarUrl ?? null)}
          />
        </IonAvatar>
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
