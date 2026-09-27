import type { ReactNode } from "react";
import { IonContent, IonIcon, IonPage, IonText } from "@ionic/react";
import { cloudOfflineOutline } from "ionicons/icons";
import PageHeader from "./PageHeader";
import { useNetwork } from "../../hooks/sensors/useNetwork";

interface Props {
  //? Contenido de la app que requiere conexión (por ejemplo <TasksTabs />)
  children: ReactNode;
}

//? Envuelve una app que necesita internet. Mientras haya conexión renderiza el
//? contenido normal; si se pierde, muestra la pantalla de aviso.
const ConnectionGuard = ({ children }: Props) => {
  const { isOnline } = useNetwork();
  if (isOnline) return <>{children}</>;

  return (
    <IonPage>
      <PageHeader title="Sin conexión" backHref="/" />
      <IonContent fullscreen>
        <div className="min-h-dvh flex flex-col items-center justify-center gap-4 px-6 text-center">
          <IonIcon
            icon={cloudOfflineOutline}
            color="medium"
            className="text-5xl"
          />

          <IonText color="medium">
            <h2 className="text-xl font-semibold">
              No tienes conexión para acceder a esta pantalla
            </h2>
          </IonText>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ConnectionGuard;
