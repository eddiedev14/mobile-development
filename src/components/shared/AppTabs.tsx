import { IonIcon, IonLabel, IonTabBar, IonTabButton } from "@ionic/react";
import { homeOutline } from "ionicons/icons";

//? Tabs principales de la app
//? TODO: agregar un <IonTabButton> por cada sección que pida el parcial
const AppTabs = () => {
  return (
    <IonTabBar slot="bottom" className="pb-[env(safe-area-inset-bottom)]">
      <IonTabButton tab="home" href="/">
        <IonIcon icon={homeOutline} />
        <IonLabel>Inicio</IonLabel>
      </IonTabButton>
    </IonTabBar>
  );
};

export default AppTabs;
