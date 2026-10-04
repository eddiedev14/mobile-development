import { IonButton } from "@ionic/react";
import { usePushNotifications } from "../../hooks/sensors/usePushNotifications";
import { toast } from "react-toastify";

const PushNotificationsSensor = () => {
  const { requestPermission, token, notification } = usePushNotifications();

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">Push Notifications</h2>
      <IonButton onClick={requestPermission}>Activar Push</IonButton>
      <p>Token: {token}</p>
      {notification &&
        toast.info(`${notification.title} - ${notification.body}`)}
    </section>
  );
};

export default PushNotificationsSensor;
