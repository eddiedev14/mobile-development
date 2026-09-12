import { IonAlert } from "@ionic/react";
import { useAlert } from "../hooks/alert/useAlert";

const Alert = () => {
  const { isOpen, alertData, closeAlert } = useAlert();

  return (
    <IonAlert
      isOpen={isOpen}
      onDidDismiss={closeAlert}
      header={alertData?.header}
      message={alertData?.message}
      buttons={[
        {
          text: "Cancelar",
          role: "cancel",
        },
        {
          text: "Continuar",
          role: "confirm",
          handler: alertData?.onConfirm,
        },
      ]}
    />
  );
};

export default Alert;
