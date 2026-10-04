import { useEffect, useState } from "react";
import { PermissionState, PluginListenerHandle } from "@capacitor/core";
import { LocalNotifications } from "@capacitor/local-notifications";

// Android exige IDs de 32 bits; Date.now() los desborda.
const generateId = () => Date.now() % 2147483647;

interface Notification {
  id?: number;
  title: string;
  body: string;
  seconds?: number;
}

export const useLocalNotifications = () => {
  const [permission, setPermission] = useState<PermissionState | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const requestPermission = async () => {
    try {
      const result = await LocalNotifications.requestPermissions();
      setPermission(result.display);
      return result.display === "granted";
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error);
      } else {
        setError(new Error("Ocurrió un error al pedir los permisos"));
      }
    }
  };

  const checkPermission = async () => {
    try {
      const result = await LocalNotifications.checkPermissions();
      setPermission(result.display);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error);
      } else {
        setError(new Error("Ocurrió un error al verificar los permisos"));
      }
    }
  };

  const sendNotification = async ({
    id = generateId(),
    title = "Notificación",
    body = "Mensaje",
  }: Notification) => {
    try {
      await LocalNotifications.schedule({
        notifications: [
          {
            id,
            title,
            body,
          },
        ],
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error);
      } else {
        setError(new Error("Ocurrió un error al enviar la notificación."));
      }
    }
  };

  const scheduleNotification = async ({
    id = generateId(),
    title = "Recordatorio",
    body = "Tienes algo pendiente",
    seconds = 5,
  }: Notification) => {
    try {
      await LocalNotifications.schedule({
        notifications: [
          {
            id,
            title,
            body,
            schedule: {
              at: new Date(Date.now() + seconds * 1000),
            },
          },
        ],
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error);
      } else {
        setError(new Error("Ocurrió un error al programar la notificación."));
      }
    }
  };

  const cancelNotification = async ({ id }: { id: number }) => {
    try {
      await LocalNotifications.cancel({
        notifications: [{ id }],
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error);
      } else {
        setError(new Error("Ocurrió un error al cancelar la notificación."));
      }
    }
  };

  useEffect(() => {
    let listener: PluginListenerHandle | undefined;

    const setupListener = async () => {
      listener = await LocalNotifications.addListener(
        "localNotificationActionPerformed",
        (notification) => {
          console.log("Notificación tocada:", notification);
        },
      );
    };

    setupListener();

    return () => {
      listener?.remove();
    };
  }, []);

  useEffect(() => {
    checkPermission();
  }, []);

  return {
    permission,
    error,
    requestPermission,
    checkPermission,
    sendNotification,
    scheduleNotification,
    cancelNotification,
  };
};
