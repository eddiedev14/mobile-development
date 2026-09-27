import { Navigate, Route } from "react-router-dom";
import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { addOutline, listOutline } from "ionicons/icons";
import ContactsFormPage from "./ContactsFormPage";
import ContactsListPage from "./ContactsListPage";

const ContactsTabs = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route index element={<Navigate to="/contacts/list" replace />} />
        <Route path="/contacts/list" element={<ContactsListPage />} />
        <Route path="/contacts/new" element={<ContactsFormPage />} />
      </IonRouterOutlet>

      <IonTabBar slot="bottom" className="pb-[env(safe-area-inset-bottom)]">
        <IonTabButton tab="list" href="/contacts/list">
          <IonIcon icon={listOutline} />
          <IonLabel>Listado</IonLabel>
        </IonTabButton>

        <IonTabButton tab="new" href="/contacts/new">
          <IonIcon icon={addOutline} />
          <IonLabel>Agregar</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default ContactsTabs;
