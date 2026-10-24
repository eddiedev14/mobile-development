import { useCallback, useEffect, useMemo, useState } from 'react';
import { INITIAL_PROGRESS, MISSIONS } from '../../constants/missions.constant';
import type {
  GeneralStatus,
  MissionProgress,
  MissionView,
} from '../../interfaces/mission.interface';
import { useCollection } from '../../firebase/hooks/useCollection';
import { useAuth } from '../auth/useAuth';
import { useLocalNotifications } from '../sensors/useLocalNotifications';
import { User } from '../../interfaces/user.interface';
import {
  getLocalProgress,
  saveLocalProgress,
} from '../../utils/progressStorage';

export const useMissionsState = () => {
  //* States & Context
  const { user } = useAuth();
  const [progress, setProgress] = useState<MissionProgress[]>(
    user ? user.missions : INITIAL_PROGRESS,
  );

  //* Firebase & Custom Hooks
  const { notify } = useLocalNotifications();
  const { update } = useCollection<User>('users');

  //* Effects
  useEffect(() => {
    if (!user) {
      setProgress(INITIAL_PROGRESS);
      return;
    }

    // Firestore manda; si el documento no trae misiones se usa lo guardado localmente
    setProgress(
      user.missions ??
        getLocalProgress(user.id)?.missions ??
        INITIAL_PROGRESS,
    );
  }, [user]);

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
          status: completed ? 'completed' : unlocked ? 'pending' : 'locked',
        };
      }),
    [progress],
  );

  const totalPoints = missions.reduce(
    (acc, m) => (m.status === 'completed' ? acc + m.points : acc),
    0,
  );
  const completedCount = missions.filter(
    (m) => m.status === 'completed',
  ).length;
  const totalCount = missions.length;
  const percent = totalCount === 0 ? 0 : (completedCount / totalCount) * 100;

  const generalStatus: GeneralStatus =
    completedCount === 0
      ? 'not-started'
      : completedCount === totalCount
        ? 'completed'
        : 'in-progress';

  //* Functions
  const completeMission = useCallback(
    async (id: number) => {
      // Calcular el nuevo estado del progreso
      const newProgressState = progress.map((p) =>
        p.id === id ? { ...p, completed: true } : p,
      );

      // Calcular los nuevos puntos totales
      const newTotalPoints = MISSIONS.reduce((acc, mission) => {
        const isCompleted = newProgressState.some(
          (p) => p.id === mission.id && p.completed,
        );
        return isCompleted ? acc + mission.points : acc;
      }, 0);

      const isOneMissing =
        newProgressState.filter((p) => !p.completed).length === 1;

      if (!user) return;

      // Guardar localmente primero: así no se pierde aunque Firestore falle
      saveLocalProgress(user.id, {
        points: newTotalPoints,
        missions: newProgressState,
      });

      // Actualizar documento de user en Firestore
      const updated = await update(user.id, {
        points: newTotalPoints,
        missions: newProgressState,
      });

      if (!updated) {
        console.error('Hubo un error actualizando');
        return;
      }

      // Enviar notificación local
      notify({
        title: isOneMissing
          ? 'Te falta 1 misión para completar'
          : 'Misión completada',
        body: `Has completado una misión. Puntaje Total: ${newTotalPoints}`,
      });

      // Actualizar el estado
      setProgress(newProgressState);
    },
    [progress, user, update, notify],
  );

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
