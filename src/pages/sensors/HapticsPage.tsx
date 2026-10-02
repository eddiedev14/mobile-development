import { IonContent, IonPage } from "@ionic/react";
import PageHeader from "../../components/shared/PageHeader";
import HapticsSensor from "../../components/sensors/HapticsSensor";

const HapticsPage = () => {
  return (
    <IonPage>
      <PageHeader title="Haptics" backHref="/" />
      <IonContent fullscreen>
        <main className="max-w-2xl mx-auto py-8 px-4">
          <HapticsSensor />
        </main>
      </IonContent>
    </IonPage>
  );
};

export default HapticsPage;
