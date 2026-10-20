import { IonIcon, IonLabel, IonTabBar, IonTabButton } from "@ionic/react";
import { checkboxOutline } from "ionicons/icons";

//? Tabs principales de la app (se muestran únicamente en la página de inicio)
const AppTabs = () => {
  return (
    <IonTabBar slot="bottom" className="pb-[env(safe-area-inset-bottom)]">
      <IonTabButton tab="tasks" href="/tasks/list">
        <IonIcon icon={checkboxOutline} />
        <IonLabel>Tareas</IonLabel>
      </IonTabButton>
    </IonTabBar>
  );
};

export default AppTabs;
