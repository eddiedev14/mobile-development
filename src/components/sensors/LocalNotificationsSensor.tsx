import { IonButton, IonSpinner } from "@ionic/react";
import { useLocalNotifications } from "../../hooks/sensors/useLocalNotifications";

const LocalNotificationsSensor = () => {
  const {
    permission,
    error,
    requestPermission,
    sendNotification,
    scheduleNotification,
  } = useLocalNotifications();

  if (permission === null) {
    return <IonSpinner></IonSpinner>;
  }

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">Local Notifications</h2>
      <div className="flex flex-wrap gap-2">
        {permission !== "granted" && (
          <IonButton onClick={requestPermission}>Permisos</IonButton>
        )}

        {permission === "granted" && (
          <>
            <IonButton
              onClick={() =>
                sendNotification({
                  title: "Hola",
                  body: "Notificación inmediata",
                })
              }
            >
              Enviar ahora
            </IonButton>

            <IonButton
              onClick={() =>
                scheduleNotification({
                  title: "Recordatorio",
                  body: "En 5 segundos",
                  seconds: 5,
                })
              }
            >
              Programar
            </IonButton>
          </>
        )}
      </div>
      {error && <p className="text-red-500">Error: {error.message}</p>}
    </section>
  );
};

export default LocalNotificationsSensor;
