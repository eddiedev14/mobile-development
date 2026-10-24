import type { MissionView } from "../../interfaces/mission.interface";
import MissionItem from "./MissionItem";
import { MOVE_DISTANCE_METERS } from "../../constants/missions.constant";

interface Props {
  missions: MissionView[];
  onAction: (id: number) => void;
  //? Fotos de evidencia por id de misión (ej. { 1: "data:image/jpeg;base64,..." })
  photos?: Record<number, string>;
  //? Metros recorridos en la misión 2 (null si no está en curso)
  liveDistance?: number | null;
}

const MissionList = ({
  missions,
  onAction,
  photos,
  liveDistance,
}: Props) => {
  return (
    <div className="flex flex-col gap-4 px-4">
      {missions.map((mission) => (
        <MissionItem
          key={mission.id}
          mission={mission}
          onAction={onAction}
          photoUrl={photos?.[mission.id]}
          liveText={
            mission.id === 2 && liveDistance != null
              ? `Has recorrido ${Math.round(liveDistance)} m de ${MOVE_DISTANCE_METERS} m`
              : undefined
          }
        />
      ))}
    </div>
  );
};

export default MissionList;
