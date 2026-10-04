import { useState } from "react";
import { Camera } from "@capacitor/camera";

export const useCamera = () => {
  // Almacena la ruta de la fotografía tomada.
  const [photo, setPhoto] = useState<string | null>(null);

  /**
   * Abre la cámara del dispositivo, toma una fotografía
   * y guarda la ruta de la imagen obtenida.
   */
  const takePhoto = async (): Promise<void> => {
    try {
      const image = await Camera.takePhoto({
        quality: 90,
      });

      if (image.webPath) {
        setPhoto(image.webPath);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error al tomar la fotografía:", error);
      } else {
        console.error("Ocurrió un error desconocido al tomar la fotografía.");
      }
    }
  };

  return {
    photo,
    takePhoto,
  };
};
