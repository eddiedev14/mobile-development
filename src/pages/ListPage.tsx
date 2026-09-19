import { IonContent, IonPage } from "@ionic/react";
import AppHeader from "../components/shared/AppHeader";
import TaskieList from "../components/tasks/TaskieList";
import Alert from "../components/shared/Alert";

const ListPage = () => {
  return (
    <IonPage>
      <AppHeader />
      <IonContent fullscreen>
        <main className="max-w-5xl mx-auto py-8 gap-8">
          <TaskieList />
          <Alert />
        </main>
      </IonContent>
    </IonPage>
  );
};

export default ListPage;
