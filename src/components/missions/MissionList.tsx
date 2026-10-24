import { IonList } from "@ionic/react";
import type { MissionView } from "../../interfaces/mission.interface";
import MissionItem from "./MissionItem";

interface Props {
  missions: MissionView[];
  onAction: (id: number) => void;
}

const MissionList = ({ missions, onAction }: Props) => {
  //TODO: Pasar liveText a la misión en curso (distancia recorrida / cuenta regresiva) cuando exista ese estado
  return (
    <IonList>
      {missions.map((mission) => (
        <MissionItem key={mission.id} mission={mission} onAction={onAction} />
      ))}
    </IonList>
  );
};

export default MissionList;
