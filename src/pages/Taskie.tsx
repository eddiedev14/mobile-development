import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import TaskieForm from "../components/TaskieForm";
import TaskieList from "../components/TaskieList";
import Alert from "../components/Alert";

const Taskie = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="ml-8">Taskie</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <main className="max-w-5xl mx-auto py-8 grid grid-cols-1 gap-8 md:grid-cols-2">
          <TaskieForm />
          <TaskieList />
          <Alert />
        </main>
      </IonContent>
    </IonPage>
  );
};

export default Taskie;
