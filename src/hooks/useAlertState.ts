import { useState } from "react";
import { AlertData } from "../interfaces/alert.interface";

export const useAlertState = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [alertData, setAlertData] = useState<AlertData>({
    id: null,
    name: null,
  });

  const updateAlertData = (data: AlertData) => {
    setAlertData(data);
    setIsOpen(true);
  };

  const closeAlert = () => {
    setAlertData({
      id: null,
      name: null,
    });
    setIsOpen(false);
  };

  return {
    isOpen,
    alertData,
    updateAlertData,
    closeAlert,
  };
};
