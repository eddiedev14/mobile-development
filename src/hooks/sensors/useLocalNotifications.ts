import { LocalNotifications } from '@capacitor/local-notifications';

// Android exige IDs de 32 bits; Date.now() los desborda.
const generateId = () => Date.now() % 2147483647;

interface Notification {
  id?: number;
  title: string;
  body: string;
}

export const useLocalNotifications = () => {
  const requestPermission = async () => {
    try {
      await LocalNotifications.requestPermissions();
    } catch {
      console.error('Ocurrió un error al pedir los permisos');
    }
  };

  const notify = async ({
    id = generateId(),
    title = 'Notificación',
    body = 'Mensaje',
  }: Notification) => {
    try {
      // Se consulta el permiso real
      const { display } = await LocalNotifications.checkPermissions();
      if (display !== 'granted') return;

      await LocalNotifications.schedule({
        notifications: [
          {
            id,
            title,
            body,
          },
        ],
      });
    } catch {
      console.error('Ocurrió un error al enviar la notificación.');
    }
  };

  return {
    requestPermission,
    notify,
  };
};
