import { useCallback, useMemo, useState } from "react";
import { MISSIONS } from "../../constants/missions.constant";
import type {
  GeneralStatus,
  MissionProgress,
  MissionView,
} from "../../interfaces/mission.interface";

const initialProgress = (): MissionProgress[] =>
  MISSIONS.map(({ id }) => ({ id, completed: false }));

export const useMissionsState = () => {
  //* States
  const [progress, setProgress] = useState<MissionProgress[]>(initialProgress);

  //TODO: Al iniciar, cargar el progreso desde Firestore (useAuth().user ya trae points y missions de users/{uid} en tiempo real) y hacer setProgress con él

  //* Derived values
  const missions = useMemo<MissionView[]>(
    () =>
      MISSIONS.map((mission) => {
        const completed = progress.find((p) => p.id === mission.id)?.completed;
        const unlocked =
          mission.unlockedBy === undefined ||
          progress.find((p) => p.id === mission.unlockedBy)?.completed;

        return {
          ...mission,
          status: completed ? "completed" : unlocked ? "pending" : "locked",
        };
      }),
    [progress],
  );

  const totalPoints = missions.reduce(
    (acc, m) => (m.status === "completed" ? acc + m.points : acc),
    0,
  );
  const completedCount = missions.filter((m) => m.status === "completed").length;
  const totalCount = missions.length;
  const percent = totalCount === 0 ? 0 : (completedCount / totalCount) * 100;

  const generalStatus: GeneralStatus =
    completedCount === 0
      ? "not-started"
      : completedCount === totalCount
        ? "completed"
        : "in-progress";

  //* Functions
  const completeMission = useCallback(async (id: number) => {
    setProgress((prev) =>
      prev.map((p) => (p.id === id ? { ...p, completed: true } : p)),
    );

    //TODO: Enviar el progreso { points, missions } a Firestore (users/{uid}) con useCollection<User>("users").update
    //TODO: Notificación local "Has completado una misión"
    //TODO: Si falta exactamente 1 misión, notificación local "Te falta 1 misión para completar"
  }, []);

  return {
    missions,
    totalPoints,
    completedCount,
    totalCount,
    percent,
    generalStatus,
    completeMission,
  };
};
