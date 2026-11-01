import { useEffect, useState } from 'react';
import { Device } from '@capacitor/device';

const POLL_MS = 30_000;

export const useBattery = () => {
  const [level, setLevel] = useState<number | null>(null); // 0 a 1
  const [isCharging, setIsCharging] = useState(false);

  useEffect(() => {
    const read = async () => {
      const info = await Device.getBatteryInfo();
      setLevel(info.batteryLevel ?? null);
      setIsCharging(info.isCharging ?? false);
    };

    read().catch(() => {});
    // El plugin Device no tiene evento de batería, por eso se consulta cada cierto tiempo
    const id = setInterval(() => read().catch(() => {}), POLL_MS);
    return () => clearInterval(id);
  }, []);

  return { level, isCharging };
};
