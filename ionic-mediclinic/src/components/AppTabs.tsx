import { IonIcon, IonLabel, IonTabBar, IonTabButton } from "@ionic/react";
import { calendarOutline, peopleOutline, personOutline } from "ionicons/icons";

const AppTabs = () => {
  return (
    <IonTabBar
      slot="bottom"
      className="pb-[env(safe-area-inset-bottom)]"
    >
      <IonTabButton tab="visitas" href="/visitas">
        <IonIcon icon={calendarOutline} />
        <IonLabel>Visitas</IonLabel>
      </IonTabButton>

      <IonTabButton tab="pacientes" href="/pacientes">
        <IonIcon icon={peopleOutline} />
        <IonLabel>Pacientes</IonLabel>
      </IonTabButton>

      <IonTabButton tab="perfil" href="/perfil">
        <IonIcon icon={personOutline} />
        <IonLabel>Perfil</IonLabel>
      </IonTabButton>
    </IonTabBar>
  );
};

export default AppTabs;