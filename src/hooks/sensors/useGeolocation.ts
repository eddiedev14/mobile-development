import { useState } from "react";
import { Geolocation, Position } from "@capacitor/geolocation";

export const useGeolocation = () => {
  const [position, setPosition] = useState<Position | null>(null);

  // ID utilizado para identificar y detener la escucha del tracking
  const [watchId, setWatchId] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);

  /**
   * Obtiene la ubicación actual del dispositivo una sola vez
   * y almacena la posición obtenida en el estado.
   */
  const getCurrentLocation = async () => {
    try {
      const currentPosition = await Geolocation.getCurrentPosition();
      setPosition(currentPosition);
      setError(null);
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
      } else {
        setError(new Error("Ocurrió un error desconocido"));
      }
    }
  };

  /**
   * Comienza a escuchar los cambios de ubicación del dispositivo
   * y actualiza el estado cada vez que se obtiene una nueva posición.
   */
  const startTracking = async (): Promise<void> => {
    try {
      const id = await Geolocation.watchPosition(
        {
          enableHighAccuracy: true,
        },
        (pos: Position | null, err: unknown | null) => {
          if (err) {
            if (err instanceof Error) {
              setError(err);
            } else {
              setError(new Error("Ocurrió un error desconocido"));
            }

            return;
          }

          if (pos) {
            setPosition(pos);
            setError(null);
          }
        },
      );

      setWatchId(id);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error);
      } else {
        setError(new Error("Ocurrió un error desconocido"));
      }
    }
  };

  /**
   * Deja de escuchar la ubicación actual del dispositivo
   */
  const stopTracking = async () => {
    if (watchId) {
      await Geolocation.clearWatch({ id: watchId });
      setWatchId(null);
    }
  };

  return {
    position,
    error,
    getCurrentLocation,
    startTracking,
    stopTracking,
  };
};
