import { IonButton } from "@ionic/react";
import { Clipboard } from "@capacitor/clipboard";
import { toast } from "react-toastify";
import { usePushNotifications } from "../../hooks/sensors/usePushNotifications";

const PushNotificationsSensor = () => {
  const { requestPermission, token, notification, error } = usePushNotifications();

  const copyToken = async () => {
    if (!token) return;
    try {
      await Clipboard.write({ string: token });
      toast.success("Token copiado al portapapeles");
    } catch {
      toast.error("No se pudo copiar el token");
    }
  };

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">Push Notifications</h2>
      <IonButton onClick={requestPermission}>Activar Push</IonButton>
      <p className="break-all">Token: {token}</p>
      {token && <IonButton onClick={copyToken}>Copiar Token</IonButton>}
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
