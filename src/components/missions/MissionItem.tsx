import { IonButton, IonIcon, IonItem, IonLabel } from "@ionic/react";
import { checkmarkCircle } from "ionicons/icons";
import type { MissionView } from "../../interfaces/mission.interface";

interface Props {
  mission: MissionView;
  onAction: (id: number) => void;
  //? Texto en vivo de la misión en curso (ej. "Has recorrido 23 m" o "Quieto: 4 s")
  liveText?: string;
  //? Foto de evidencia (data URL) que se muestra debajo de la misión
  photoUrl?: string;
}

const STATUS_LABEL = {
  pending: "Pendiente",
  completed: "Completada",
  locked: "Bloqueada",
};

const MissionItem = ({ mission, onAction, liveText, photoUrl }: Props) => {
  return (
    <IonItem>
      <IonIcon slot="start" icon={mission.icon} />

      <IonLabel className="ion-text-wrap">
        <h2>{mission.title}</h2>
        <p>{mission.description}</p>
        <p>
          {mission.points} pts · {STATUS_LABEL[mission.status]}
        </p>
        {liveText && <p>{liveText}</p>}
        {photoUrl && (
          <img
            src={photoUrl}
            alt={`Evidencia de la misión ${mission.id}`}
            className="mt-2 w-full max-h-56 object-cover rounded"
          />
        )}
      </IonLabel>

      {mission.status === "completed" ? (
        <IonIcon slot="end" icon={checkmarkCircle} color="success" />
      ) : (
        <IonButton
          slot="end"
          size="small"
          disabled={mission.status === "locked"}
          onClick={() => onAction(mission.id)}
        >
          Iniciar
        </IonButton>
      )}
    </IonItem>
  );
};

export default MissionItem;
