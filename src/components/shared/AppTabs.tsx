import { IonIcon, IonLabel, IonTabBar, IonTabButton } from "@ionic/react";
import { homeOutline, podiumOutline, statsChartOutline } from "ionicons/icons";

//? Tabs principales de la app
const AppTabs = () => {
  return (
    <IonTabBar slot="bottom" className="pb-[env(safe-area-inset-bottom)]">
      <IonTabButton tab="home" href="/">
        <IonIcon icon={homeOutline} />
        <IonLabel>Inicio</IonLabel>
      </IonTabButton>

      <IonTabButton tab="results" href="/results">
        <IonIcon icon={statsChartOutline} />
        <IonLabel>Resultados</IonLabel>
      </IonTabButton>

      <IonTabButton tab="ranking" href="/ranking">
        <IonIcon icon={podiumOutline} />
        <IonLabel>Ranking</IonLabel>
      </IonTabButton>
    </IonTabBar>
  );
};

export default AppTabs;
