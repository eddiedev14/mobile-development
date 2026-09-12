import { IonToast } from "@ionic/react";
import { useToast } from "../hooks/toast/useToast";

const Toast = () => {
  const { isOpen, message, color, closeToast } = useToast();

  return (
    <IonToast
      isOpen={isOpen}
      onDidDismiss={closeToast}
      message={message}
      color={color}
      duration={2500}
      position="bottom"
      style={{ "--color": "#ffffff", color: "#ffffff" } as React.CSSProperties}
    />
  );
};

export default Toast;