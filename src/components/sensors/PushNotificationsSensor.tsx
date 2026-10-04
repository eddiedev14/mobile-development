import { IonButton } from "@ionic/react";
import { usePushNotifications } from "../../hooks/sensors/usePushNotifications";

const PushNotificationsSensor = () => {
  const { requestPermission, token, notification, error } = usePushNotifications();

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">Push Notifications</h2>
      <IonButton onClick={requestPermission}>Activar Push</IonButton>
      <p>Token: {token}</p>
      {error && <p className="text-red-500">Error: {error.error}</p>}
      {notification && (
        <p>
          Última: {notification.title} - {notification.body}
        </p>
      )}
    </section>
  );
};

export default PushNotificationsSensor;
