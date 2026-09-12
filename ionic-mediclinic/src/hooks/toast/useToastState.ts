import { useState } from "react";

export const useToastState = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("primary");

  const showToast = (message: string, color = "primary") => {
    setMessage(message);
    setColor(color);
    setIsOpen(true);
  };

  const closeToast = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    message,
    color,
    showToast,
    closeToast,
  };
};