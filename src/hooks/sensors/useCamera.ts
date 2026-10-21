import { useState } from "react";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { toast } from "react-toastify";
import type { UserPhoto } from "../../interfaces/photo.interface";

export const useCamera = () => {
  //* States
  const [photo, setPhoto] = useState<UserPhoto | null>(null);

  //* Functions
  const takePhoto = async () => {
    try {
      const image = await Camera.getPhoto({
        quality: 80,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        //? Sólo web: usa el selector de archivos en vez de la webcam, para poder
        //? probar en una PC sin cámara. En Android/iOS se ignora y abre la cámara
        webUseInput: true,
      });

      if (!image.webPath) {
        toast.error("No se pudo obtener la foto.");
        return;
      }

      // Convertir la foto en un Blob para poder subirla después
      const response = await fetch(image.webPath);
      const blob = await response.blob();

      setPhoto({ webPath: image.webPath, blob, format: image.format });
    } catch (err) {
      //? Si el usuario cierra la cámara sin tomar la foto no es un error
      const message = err instanceof Error ? err.message : String(err);
      if (message.toLowerCase().includes("cancel")) return;

      toast.error("No se pudo abrir la cámara.");
    }
  };

  return {
    photo,
    takePhoto,
  };
};
