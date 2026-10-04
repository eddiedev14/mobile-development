import { useEffect, useState } from "react";
import { Haptics, ImpactStyle, NotificationType } from "@capacitor/haptics";

type HapticStyle = "light" | "medium" | "heavy";
type Notify = "success" | "warning" | "error";

export const useHaptics = () => {
  /**
   * Indica si la vibración háptica está disponible
   * en el dispositivo actual.
   *
   * Comenzamos suponiendo que está disponible y posteriormente
   * podemos comprobarlo mediante Capacitor.
   */
  const [isAvailable, setIsAvailable] = useState(true);

  const checkAvailabilty = async () => {
    try {
      await Haptics.impact({ style: ImpactStyle.Light });
      setIsAvailable(true);
    } catch {
      setIsAvailable(false);
    }
  };

  useEffect(() => {
    checkAvailabilty();
  }, []);

  const impact = async (style: HapticStyle = "medium") => {
    if (!isAvailable) return;

    const map = {
      light: ImpactStyle.Light,
      medium: ImpactStyle.Medium,
      heavy: ImpactStyle.Heavy,
    };

    await Haptics.impact({
      style: map[style] || ImpactStyle.Medium,
    });
  };

  const notify = async (type: Notify = "success") => {
    if (!isAvailable) return;

    const map = {
      success: NotificationType.Success,
      warning: NotificationType.Warning,
      error: NotificationType.Error,
    };

    await Haptics.notification({
      type: map[type] || NotificationType.Success,
    });
  };

  const vibrate = async (duration = 100) => {
    if (!isAvailable) return;
    await Haptics.vibrate({ duration });
  };

  const selectionStart = async () => {
    if (!isAvailable) return;
    await Haptics.selectionStart();
  };

  const selectionChanged = async () => {
    if (!isAvailable) return;
    await Haptics.selectionChanged();
  };

  const selectionEnd = async () => {
    if (!isAvailable) return;
    await Haptics.selectionEnd();
  };

  return {
    isAvailable,
    impact,
    notify,
    vibrate,
    selectionStart,
    selectionChanged,
    selectionEnd,
  };
};
