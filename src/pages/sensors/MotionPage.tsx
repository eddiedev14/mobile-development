import { IonContent, IonPage } from "@ionic/react";
import PageHeader from "../../components/shared/PageHeader";
import MotionSensor from "../../components/sensors/MotionSensor";

const MotionPage = () => {
  return (
    <IonPage>
      <PageHeader title="Motion" backHref="/" />
      <IonContent fullscreen>
        <main className="max-w-2xl mx-auto py-8 px-4">
          <MotionSensor />
        </main>
      </IonContent>
    </IonPage>
  );
};

export default MotionPage;
