import { Camera } from '@capacitor/camera';

export const useCamera = () => {
  /**
   * Abre la cámara del dispositivo, toma una fotografía
   * y guarda la ruta de la imagen obtenida.
   * Devuelve la ruta, o null si se canceló o falló.
   */
  const takePhoto = async (): Promise<string | null> => {
    try {
      const image = await Camera.takePhoto({
        quality: 90,
      });

      if (image.webPath) {
        return image.webPath;
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error al tomar la fotografía:', error);
      } else {
        console.error('Ocurrió un error desconocido al tomar la fotografía.');
      }
    }

    return null;
  };

  return {
    takePhoto,
  };
};
