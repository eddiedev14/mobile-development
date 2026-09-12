import { IonTabBar, IonTabButton, IonIcon, IonLabel } from "@ionic/react";
import { addCircleOutline, callOutline } from "ionicons/icons";

const AppTabs = () => {
  return (
    <IonTabBar slot="bottom" className="pb-[env(safe-area-inset-bottom)]">
      <IonTabButton tab="form" href="/form">
        <IonIcon icon={addCircleOutline} />
        <IonLabel>Formulario</IonLabel>
      </IonTabButton>

      <IonTabButton tab="lista" href="/lista">
        <IonIcon icon={callOutline} />
        <IonLabel>Listado</IonLabel>
      </IonTabButton>
    </IonTabBar>
  );
};

export default AppTabs;
