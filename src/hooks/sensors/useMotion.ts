import { useEffect, useState } from 'react';
import { Motion } from '@capacitor/motion';

const GRAVITY = 9.81; // m/s²
const THRESHOLD = 1.5; // cuánto debe desviarse la aceleración de la gravedad para contar como movimiento
const SUSTAINED_MS = 2000; // movimiento continuo necesario para considerar que te mueves
const QUIET_MS = 1000; // sin picos por este tiempo se considera que paraste (al caminar hay pausas entre pasos)

// isMoving pasa a true tras 2 s de movimiento sostenido y a false al quedar quieto 1 s
export const useMotion = () => {
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    let movingSince: number | null = null;
    let lastPeak = 0;

    const listener = Motion.addListener('accel', (event) => {
      const { x, y, z } = event.accelerationIncludingGravity;
      const now = Date.now();

      if (Math.abs(Math.hypot(x, y, z) - GRAVITY) > THRESHOLD) {
        lastPeak = now;
        movingSince ??= now;
      } else if (now - lastPeak > QUIET_MS) {
        movingSince = null;
      }

      setIsMoving(movingSince !== null && now - movingSince >= SUSTAINED_MS);
    });

    return () => {
      listener.then((l) => l.remove()).catch(() => {});
    };
  }, []);

  return { isMoving };
};
