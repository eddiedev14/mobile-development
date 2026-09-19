import { IonContent, IonPage } from "@ionic/react";
import AppHeader from "../components/shared/AppHeader";
import TaskieForm from "../components/tasks/TaskieForm";
import Alert from "../components/shared/Alert";

interface Props {
  isEdit?: boolean;
}

const FormPage = ({ isEdit = false }: Props) => {
  return (
    <IonPage>
      <AppHeader />
      <IonContent fullscreen>
        <main className="max-w-5xl mx-auto py-8 gap-8">
          <TaskieForm isEdit={isEdit} />
          <Alert />
        </main>
      </IonContent>
    </IonPage>
  );
};

export default FormPage;
