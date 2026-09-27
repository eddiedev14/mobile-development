import { useEffect, useState } from "react";
import { Network } from "@capacitor/network";

export const useNetwork = () => {
  const [isOnline, setIsOnline] = useState(true);

  //* Effects
  useEffect(() => {
    const checkInitialStatus = async () => {
      const status = await Network.getStatus();
      setIsOnline(status.connected);
    };

    checkInitialStatus();

    // Listener para detectar cuándo hay cambios
    const listener = Network.addListener("networkStatusChange", (status) => {
      setIsOnline(status.connected);
    });

    return () => {
      listener.then((l) => l.remove());
    };
  }, []);

  return {
    isOnline,
  };
};
