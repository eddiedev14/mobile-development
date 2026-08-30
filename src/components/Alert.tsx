import { IonAlert } from "@ionic/react";
import { useAlert } from "../hooks/useAlert";

interface Props {
  onConfirm: (id: number) => void;
}

const Alert = ({ onConfirm }: Props) => {
  const { isOpen, alertData, closeAlert } = useAlert();

  return (
    <IonAlert
      isOpen={isOpen}
      onDidDismiss={closeAlert}
      header="¿Estás Seguro?"
      message={`Si continúas, tu contacto '${alertData.name ?? ""}' será eliminado de tu lista de contactos`}
      buttons={[
        {
          text: "Cancelar",
          role: "cancel",
        },
        {
          text: "OK",
          role: "confirm",
          handler: () => {
            if (alertData.id && alertData.name) {
              onConfirm(alertData.id);
            }
          },
        },
      ]}
    />
  );
};

export default Alert;
