import { LocalNotifications } from '@capacitor/local-notifications';

export const notify = async (title: string, body: string) => {
  try {
    // Si el permiso ya estaba concedido, responde sin volver a preguntar
    const { display } = await LocalNotifications.requestPermissions();
    if (display !== 'granted') return;

    await LocalNotifications.schedule({
      // El id debe ser un entero de 32 bits y distinto para cada notificación
      notifications: [{ id: Date.now() % 2_147_483_647, title, body }],
    });
  } catch (error) {
    console.error('No se pudo mostrar la notificación:', error);
  }
};
