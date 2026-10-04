import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  PushNotifications,
  PushNotificationSchema,
  RegistrationError,
} from "@capacitor/push-notifications";

export const usePushNotifications = () => {
  // Ese token identifica al dispositivo/app para que posteriormente un servidor pueda enviarle una notificación push.
  const [token, setToken] = useState<string | null>(null);
  const [notification, setNotification] =
    useState<PushNotificationSchema | null>(null);
  const [error, setError] = useState<RegistrationError | null>(null);

  const requestPermission = async () => {
    const result = await PushNotifications.requestPermissions();

    if (result.receive === "granted") {
      // registra la aplicación para recibir notificaciones push.
      await PushNotifications.register();
    }
  };

  useEffect(() => {
    PushNotifications.addListener("registration", (token) => {
      setToken(token.value);
    });

    PushNotifications.addListener("registrationError", (err) => {
      setError(err);
    });

    PushNotifications.addListener(
      "pushNotificationReceived",
      (notification) => {
        setNotification(notification);
        toast.info(`${notification.title} - ${notification.body}`);
      },
    );

    PushNotifications.addListener(
      "pushNotificationActionPerformed",
      (action) => {
        console.log("Click", action);
      },
    );

    return () => {
      PushNotifications.removeAllListeners();
    };
  }, []);

  return {
    token,
    notification,
    error,
    requestPermission,
  };
};
