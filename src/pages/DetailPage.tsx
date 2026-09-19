import { useParams } from "react-router-dom";
import {
  IonBackButton,
  IonButtons,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useTaskie } from "../hooks/tasks/useTaskie";

const DetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { tasks, toggleComplete } = useTaskie();
  const task = tasks.find((task) => task.id === id);

  if (!task) {
    return (
      <IonPage>
        <IonContent fullscreen>
          <div className="min-h-screen flex items-center justify-center">
            <IonText color="medium">
              <p className="text-sm font-light">Tarea no encontrada.</p>
            </IonText>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/list" />
          </IonButtons>
          <IonTitle>Detalle de Tarea</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <main className="max-w-2xl mx-auto p-4">
          <h2 className="text-2xl font-semibold">{task.name}</h2>

          <IonList className="mt-4">
            <IonItem>
              <IonLabel>ID: {task.id}</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Descripción: {task.description}</IonLabel>
            </IonItem>
            <IonItem>
              ¿Completada?
              <IonCheckbox
                className="ml-2"
                checked={task.completed}
                onIonChange={() => toggleComplete(task.id)}
              ></IonCheckbox>
            </IonItem>
          </IonList>
        </main>
      </IonContent>
    </IonPage>
  );
};

export default DetailPage;
