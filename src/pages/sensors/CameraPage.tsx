import { IonContent, IonPage } from "@ionic/react";
import PageHeader from "../../components/shared/PageHeader";
import CameraSensor from "../../components/sensors/CameraSensor";

const CameraPage = () => {
  return (
    <IonPage>
      <PageHeader title="Camera" backHref="/" />
      <IonContent fullscreen>
        <main className="max-w-2xl mx-auto py-8 px-4">
          <CameraSensor />
        </main>
      </IonContent>
    </IonPage>
  );
};

export default CameraPage;
