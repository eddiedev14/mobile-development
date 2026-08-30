import { IonAlert } from "@ionic/react";
import { useTaskie } from "../hooks/useTaskie";
import { useAlert } from "../hooks/useAlert";

const Alert = () => {
  const { onConfirmDeleteAlert } = useTaskie();
  const { isOpen, alertData, closeAlert } = useAlert();

  return (
    <IonAlert
      isOpen={isOpen}
      onDidDismiss={closeAlert}
      header="¿Estás Seguro?"
      message={`Si continúas, tu tarea '${alertData.name ?? ""}' será eliminada.`}
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
              onConfirmDeleteAlert(alertData.id);
            }
          },
        },
      ]}
    />
  );
};

export default Alert;
