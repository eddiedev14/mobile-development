import { IonContent, IonPage } from "@ionic/react";
import PageHeader from "../../components/shared/PageHeader";
import LocalNotificationsSensor from "../../components/sensors/LocalNotificationsSensor";

const LocalNotificationsPage = () => {
  return (
    <IonPage>
      <PageHeader title="Local Notifications" backHref="/" />
      <IonContent fullscreen>
        <main className="max-w-2xl mx-auto py-8 px-4">
          <LocalNotificationsSensor />
        </main>
      </IonContent>
    </IonPage>
  );
};

export default LocalNotificationsPage;
