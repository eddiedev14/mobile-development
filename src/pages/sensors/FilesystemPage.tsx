import { IonContent, IonPage } from "@ionic/react";
import PageHeader from "../../components/shared/PageHeader";
import FilesystemSensor from "../../components/sensors/FilesystemSensor";

const FilesystemPage = () => {
  return (
    <IonPage>
      <PageHeader title="Filesystem" backHref="/" />
      <IonContent fullscreen>
        <main className="max-w-2xl mx-auto py-8 px-4">
          <FilesystemSensor />
        </main>
      </IonContent>
    </IonPage>
  );
};

export default FilesystemPage;
