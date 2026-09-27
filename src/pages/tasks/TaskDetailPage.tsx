import { useParams } from "react-router-dom";
import {
  IonCheckbox,
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonText,
} from "@ionic/react";
import PageHeader from "../../components/shared/PageHeader";
import { useTaskie } from "../../hooks/tasks/useTaskie";

const TaskDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { tasks, toggleComplete } = useTaskie();
  const task = tasks.find((task) => task.id === id);

  if (!task) {
    return (
      <IonPage>
        <PageHeader title="Tareas" backHref="/" />
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
      <PageHeader title="Detalle de Tarea" backHref="/tasks/list" />
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

export default TaskDetailPage;
