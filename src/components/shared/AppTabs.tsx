import { IonIcon, IonLabel, IonTabBar, IonTabButton } from "@ionic/react";
import { addOutline, listOutline } from "ionicons/icons";

const AppTabs = () => {
  return (
    <IonTabBar slot="bottom" className="pb-[env(safe-area-inset-bottom)]">
      <IonTabButton tab="form" href="/new">
        <IonIcon icon={addOutline} />
        <IonLabel>Agregar</IonLabel>
      </IonTabButton>

      <IonTabButton tab="tasks" href="/tasks">
        <IonIcon icon={listOutline} />
        <IonLabel>Lista</IonLabel>
      </IonTabButton>
    </IonTabBar>
  );
};

export default AppTabs;
