import { IonContent, IonPage } from "@ionic/react";
import PageHeader from "../../components/shared/PageHeader";
import TaskieForm from "../../components/tasks/TaskieForm";

interface Props {
  isEdit?: boolean;
}

const TasksFormPage = ({ isEdit = false }: Props) => {
  return (
    <IonPage>
      <PageHeader title="Tareas" backHref="/" />
      <IonContent fullscreen>
        <main className="max-w-5xl mx-auto py-8 px-4">
          <TaskieForm isEdit={isEdit} />
        </main>
      </IonContent>
    </IonPage>
  );
};

export default TasksFormPage;
