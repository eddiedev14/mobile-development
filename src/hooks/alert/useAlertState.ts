import { useState } from "react";
import { AlertData } from "../../interfaces/alert.interface";

export const useAlertState = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [alertData, setAlertData] = useState<AlertData | null>(null);

  const openAlert = (data: AlertData) => {
    setAlertData(data);
    setIsOpen(true);
  };

  const closeAlert = () => {
    setIsOpen(false);
    setAlertData(null);
  };

  return {
    isOpen,
    alertData,
    openAlert,
    closeAlert,
  };
};
