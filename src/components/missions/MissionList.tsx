import { IonList } from "@ionic/react";
import type { MissionView } from "../../interfaces/mission.interface";
import MissionItem from "./MissionItem";

interface Props {
  missions: MissionView[];
  onAction: (id: number) => void;
  //? Fotos de evidencia por id de misión (ej. { 1: "data:image/jpeg;base64,..." })
  photos?: Record<number, string>;
}

const MissionList = ({ missions, onAction, photos }: Props) => {
  //TODO: Pasar liveText a la misión en curso (distancia recorrida / cuenta regresiva) cuando exista ese estado
  return (
    <IonList>
      {missions.map((mission) => (
        <MissionItem
          key={mission.id}
          mission={mission}
          onAction={onAction}
          photoUrl={photos?.[mission.id]}
        />
      ))}
    </IonList>
  );
};

export default MissionList;
