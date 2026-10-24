import { IonItem, IonLabel, IonList } from "@ionic/react";
import type { GeneralStatus } from "../../interfaces/mission.interface";

interface Props {
  totalPoints: number;
  completedCount: number;
  totalCount: number;
  generalStatus: GeneralStatus;
}

const STATUS_LABEL: Record<GeneralStatus, string> = {
  "not-started": "Sin iniciar",
  "in-progress": "En progreso",
  completed: "Completado",
};

const ResultsSummary = ({
  totalPoints,
  completedCount,
  totalCount,
  generalStatus,
}: Props) => {
  return (
    <IonList>
      <IonItem>
        <IonLabel>Puntos totales</IonLabel>
        <IonLabel slot="end">{totalPoints}</IonLabel>
      </IonItem>

      <IonItem>
        <IonLabel>Misiones completadas</IonLabel>
        <IonLabel slot="end">
          {completedCount} / {totalCount}
        </IonLabel>
      </IonItem>

      <IonItem>
        <IonLabel>Estado general</IonLabel>
        <IonLabel slot="end">{STATUS_LABEL[generalStatus]}</IonLabel>
      </IonItem>
    </IonList>
  );
};

export default ResultsSummary;
