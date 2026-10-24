import { Haptics } from '@capacitor/haptics';
import { useCallback } from 'react';

export const useHaptics = () => {
  const vibrate = useCallback(async (duration = 800) => {
    try {
      await Haptics.vibrate({ duration });
    } catch {
      // Sin vibración disponible (ej. navegador): no debe romper la misión
    }
  }, []);

  return {
    vibrate,
  };
};
