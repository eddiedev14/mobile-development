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
import FruitsFormPage from "./FruitsFormPage";
import FruitsListPage from "./FruitsListPage";

const FruitsTabs = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route index element={<Navigate to="/fruits/list" replace />} />
        <Route path="/fruits/list" element={<FruitsListPage />} />
        <Route path="/fruits/new" element={<FruitsFormPage />} />
        <Route path="/fruits/edit/:id" element={<FruitsFormPage isEdit />} />
      </IonRouterOutlet>

      <IonTabBar slot="bottom" className="pb-[env(safe-area-inset-bottom)]">
        <IonTabButton tab="list" href="/fruits/list">
          <IonIcon icon={listOutline} />
          <IonLabel>Listado</IonLabel>
        </IonTabButton>

        <IonTabButton tab="new" href="/fruits/new">
          <IonIcon icon={addOutline} />
          <IonLabel>Agregar</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default FruitsTabs;
