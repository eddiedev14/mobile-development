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
import TaskDetailPage from "./TaskDetailPage";
import TasksFormPage from "./TasksFormPage";
import TasksListPage from "./TasksListPage";

const TasksTabs = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route index element={<Navigate to="/tasks/list" replace />} />
        <Route path="/tasks/list" element={<TasksListPage />} />
        <Route path="/tasks/new" element={<TasksFormPage />} />
        <Route
          path="/tasks/edit/:id"
          element={<TasksFormPage isEdit />}
        />
        <Route path="/tasks/:id" element={<TaskDetailPage />} />
      </IonRouterOutlet>

      <IonTabBar slot="bottom" className="pb-[env(safe-area-inset-bottom)]">
        <IonTabButton tab="list" href="/tasks/list">
          <IonIcon icon={listOutline} />
          <IonLabel>Listado</IonLabel>
        </IonTabButton>

        <IonTabButton tab="new" href="/tasks/new">
          <IonIcon icon={addOutline} />
          <IonLabel>Agregar</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default TasksTabs;
