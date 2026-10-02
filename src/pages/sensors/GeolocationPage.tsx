import { IonContent, IonPage } from "@ionic/react";
import PageHeader from "../../components/shared/PageHeader";
import GeolocationSensor from "../../components/sensors/GeolocationSensor";

const GeolocationPage = () => {
  return (
    <IonPage>
      <PageHeader title="Geolocation" backHref="/" />
      <IonContent fullscreen>
        <main className="max-w-2xl mx-auto py-8 px-4">
          <GeolocationSensor />
        </main>
      </IonContent>
    </IonPage>
  );
};

export default GeolocationPage;
