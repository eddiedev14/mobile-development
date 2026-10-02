import { IonContent, IonPage } from "@ionic/react";
import PageHeader from "../../components/shared/PageHeader";
import PushNotificationsSensor from "../../components/sensors/PushNotificationsSensor";

const PushNotificationsPage = () => {
  return (
    <IonPage>
      <PageHeader title="Push Notifications" backHref="/" />
      <IonContent fullscreen>
        <main className="max-w-2xl mx-auto py-8 px-4">
          <PushNotificationsSensor />
        </main>
      </IonContent>
    </IonPage>
  );
};

export default PushNotificationsPage;
