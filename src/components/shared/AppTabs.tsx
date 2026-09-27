import { IonIcon, IonLabel, IonTabBar, IonTabButton } from "@ionic/react";
import { callOutline, checkboxOutline, nutritionOutline } from "ionicons/icons";

//? Tabs principales de la app (se muestran únicamente en la página de inicio)
const AppTabs = () => {
  return (
    <IonTabBar slot="bottom" className="pb-[env(safe-area-inset-bottom)]">
      <IonTabButton tab="contacts" href="/contacts/list">
        <IonIcon icon={callOutline} />
        <IonLabel>Contactos</IonLabel>
      </IonTabButton>

      <IonTabButton tab="tasks" href="/tasks/list">
        <IonIcon icon={checkboxOutline} />
        <IonLabel>Tareas</IonLabel>
      </IonTabButton>

      <IonTabButton tab="fruits" href="/fruits/list">
        <IonIcon icon={nutritionOutline} />
        <IonLabel>Frutas</IonLabel>
      </IonTabButton>
    </IonTabBar>
  );
};

export default AppTabs;
