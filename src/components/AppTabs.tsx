import { IonTabBar, IonTabButton, IonIcon, IonLabel } from "@ionic/react";
import { addCircleOutline, callOutline } from "ionicons/icons";

const AppTabs = () => {
  return (
    <IonTabBar slot="bottom">
      <IonTabButton tab="home" href="/">
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
