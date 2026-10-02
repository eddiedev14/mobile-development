import { IonContent, IonPage } from "@ionic/react";
import PageHeader from "../../components/shared/PageHeader";
import DeviceSensor from "../../components/sensors/DeviceSensor";

const DevicePage = () => {
  return (
    <IonPage>
      <PageHeader title="Device" backHref="/" />
      <IonContent fullscreen>
        <main className="max-w-2xl mx-auto py-8 px-4">
          <DeviceSensor />
        </main>
      </IonContent>
    </IonPage>
  );
};

export default DevicePage;
