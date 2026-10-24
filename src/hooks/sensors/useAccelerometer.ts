import { useCallback, useEffect, useRef, useState } from 'react';
import { PluginListenerHandle } from '@capacitor/core';
import { Motion } from '@capacitor/motion';

export const useAccelerometer = () => {
  const [isMoving, setIsMoving] = useState(false);

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
    if (listenerRef.current) return;

    // Un valor viejo de una ejecución anterior no debe contar como movimiento
    setIsMoving(false);

    listenerRef.current = await Motion.addListener('accel', (e) => {
      const acc = e.acceleration;
      if (!acc) return;
      const { x, y, z } = acc;
      const total = Math.abs(x) + Math.abs(y) + Math.abs(z);

      /**
       * Consideramos que el dispositivo está en movimiento
       * cuando la magnitud supera 1.
       */
      setIsMoving(total > 1);
    });
  }, []);

  const stop = useCallback(async (): Promise<void> => {
    if (listenerRef.current) {
      await listenerRef.current.remove();
      listenerRef.current = null;
    }
  }, []);

  useEffect(
    () => () => {
      void stop();
    },
    [stop],
  );

  return {
    isMoving,
    start,
    stop,
  };
};
