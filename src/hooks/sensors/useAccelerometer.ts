import { useCallback, useEffect, useRef, useState } from "react";
import { PluginListenerHandle } from "@capacitor/core";
import { Motion } from "@capacitor/motion";

/**
 * Configuración que recibe el custom hook.
 *
 * threshold: valor mínimo de aceleración total necesario
 *            para considerar que el dispositivo está siendo agitado.
 *
 * interval: tiempo mínimo entre actualizaciones de los datos
 *           del acelerómetro, expresado en milisegundos.
 *
 * shakeDelay: tiempo mínimo que debe pasar entre dos detecciones
 *             de movimiento brusco.
 */
interface Props {
  threshold?: number;
  interval?: number;
  shakeDelay?: number;
}

/**
 * Representa los valores de aceleración en los tres ejes
 * del dispositivo.
 */
interface Acceleration {
  x: number;
  y: number;
  z: number;
}

export const useAccelerometer = ({
  threshold = 20,
  interval = 100,
  shakeDelay = 100,
}: Props) => {
  const [acceleration, setAcceleration] = useState<Acceleration>({
    x: 0,
    y: 0,
    z: 0,
  });

  const [magnitude, setMagnitude] = useState(0);
  const [isShaking, setIsShaking] = useState(false);
  const [isMoving, setIsMoving] = useState(false);

  /**
   * Guarda el momento en el que se procesó la última actualización.
   */
  const lastUpdate = useRef(0);

  /**
   * Guarda el momento en el que se detectó la última sacudida.
   */
  const lastShake = useRef(0);

  /**
   * Guarda la referencia al listener del acelerómetro.
   */
  const listenerRef = useRef<PluginListenerHandle | null>(null);

  /**
   * Comienza a escuchar los datos del acelerómetro.
   *
   * Cada vez que el dispositivo se mueve, Capacitor ejecuta
   * la función callback y nos proporciona los valores de
   * aceleración de los ejes X, Y y Z.
   */
  const start = useCallback(async () => {
    listenerRef.current = await Motion.addListener("accel", (e) => {
      const now = Date.now();

      /**
       * Evita procesar datos demasiado rápido.
       *
       * Por ejemplo, si interval = 100, solo procesaremos
       * una actualización cada 100 ms.
       */
      if (now - lastUpdate.current < interval) return;
      lastUpdate.current = now;

      const acc = e.acceleration;

      const x = acc.x;
      const y = acc.y;
      const z = acc.z;

      setAcceleration({ x, y, z });
      const total = Math.abs(x) + Math.abs(y) + Math.abs(z);
      setMagnitude(total);

      /**
       * Consideramos que el dispositivo está en movimiento
       * cuando la magnitud supera 2.
       */
      setIsMoving(total > 2);

      /**
       * Comprobamos si el movimiento es suficientemente fuerte
       * como para considerarlo una sacudida.
       *
       * También comprobamos shakeDelay para evitar detectar
       * varios shakes prácticamente al mismo tiempo.
       */
      if (total > threshold && now - lastShake.current > shakeDelay) {
        lastShake.current = now;
        setIsShaking(true);

        /**
         * Después de 500 ms dejamos de considerar que
         * el dispositivo está siendo agitado.
         */
        setTimeout(() => {
          setIsShaking(false);
        }, 500);
      }
    });
  }, [interval, shakeDelay, threshold]);

  const stop = useCallback(async (): Promise<void> => {
    if (listenerRef.current) {
      await listenerRef.current.remove();
      listenerRef.current = null;
    }
  }, []);

  /**
   * Inicia automáticamente el acelerómetro cuando el componente
   * que utiliza este hook se monta.
   */
  useEffect(() => {
    void start();

    return () => {
      void stop();
    };
  }, [start, stop]);
  return {
    acceleration,
    magnitude,
    isShaking,
    isMoving,
    start,
    stop,
  };
};
