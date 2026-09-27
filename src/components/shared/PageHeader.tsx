import {
  IonBackButton,
  IonButtons,
  IonHeader,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import type { ReactNode } from "react";

interface Props {
  title: string;

  //? Href al que vuelve el botón de "atrás" cuando no hay historial
  backHref?: string;

  //? Acciones que se muestran a la derecha del toolbar
  children?: ReactNode;
}

const PageHeader = ({ title, backHref, children }: Props) => {
  return (
    <IonHeader>
      <IonToolbar>
        {backHref && (
          <IonButtons slot="start">
            <IonBackButton defaultHref={backHref} />
          </IonButtons>
        )}

        <IonTitle className="pl-6">{title}</IonTitle>

        {children && <IonButtons slot="end">{children}</IonButtons>}
      </IonToolbar>
    </IonHeader>
  );
};

export default PageHeader;
