import { IonContent, IonPage } from "@ionic/react";
import PageHeader from "../../components/shared/PageHeader";
import TaskieList from "../../components/tasks/TaskieList";

const TasksListPage = () => {
  return (
    <IonPage>
      <PageHeader title="Tareas" backHref="/" />
      <IonContent fullscreen>
        <main className="max-w-5xl mx-auto py-8 px-4">
          <TaskieList />
        </main>
      </IonContent>
    </IonPage>
  );
};

export default TasksListPage;
