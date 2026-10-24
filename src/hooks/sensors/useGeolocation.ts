import { useCallback, useEffect, useRef, useState } from 'react';
import { Geolocation, Position } from '@capacitor/geolocation';

export const useGeolocation = () => {
  const [position, setPosition] = useState<Position | null>(null);

  // ID utilizado para identificar y detener la escucha del tracking
  const watchId = useRef<string | null>(null);

  // Al salir de la pantalla se detiene el seguimiento para no dejar el GPS encendido
  useEffect(() => {
    return () => {
      if (watchId.current) {
        Geolocation.clearWatch({ id: watchId.current }).catch(() => {});
        watchId.current = null;
      }
    };
  }, []);

  /**
   * Obtiene la ubicación actual del dispositivo una sola vez
   * y almacena la posición obtenida en el estado.
   */
  const getCurrentLocation = async () => {
    try {
      const currentPosition = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
      });
      setPosition(currentPosition);
      return currentPosition;
    } catch (error) {
      console.error('Error al obtener la ubicación:', error);
      return null;
    }
  };

  /**
   * Comienza a escuchar los cambios de ubicación del dispositivo
   * y actualiza el estado cada vez que se obtiene una nueva posición.
   * Devuelve true si el seguimiento quedó activo y false si no se pudo iniciar.
   */
  const startTracking = async (): Promise<boolean> => {
    // Ya hay un seguimiento activo: no se abre otro
    if (watchId.current) return true;

    try {
      const id = await Geolocation.watchPosition(
        {
          enableHighAccuracy: true,
        },
        (pos: Position | null, err: unknown | null) => {
          if (err) {
            console.error('Error en el seguimiento de ubicación:', err);
            return;
          }

          if (pos) {
            setPosition(pos);
          }
        },
      );

      // Si otra llamada alcanzó a iniciar mientras esperábamos, se descarta este seguimiento
      if (watchId.current) {
        await Geolocation.clearWatch({ id });
        return true;
      }

      watchId.current = id;
      return true;
    } catch (error: unknown) {
      console.error('No se pudo iniciar el seguimiento de ubicación:', error);
      return false;
    }
  };

  /**
   * Deja de escuchar la ubicación actual del dispositivo
   */
  // useCallback: la función es estable y se puede usar como dependencia de un useEffect
  const stopTracking = useCallback(async () => {
    if (!watchId.current) return;

    // Se limpia el ref antes del await para que no se intente detener dos veces
    const id = watchId.current;
    watchId.current = null;
    await Geolocation.clearWatch({ id });
  }, []);

  return {
    position,
    getCurrentLocation,
    startTracking,
    stopTracking,
  };
};
