import { useEffect, useMemo } from 'react';
import { orderBy } from 'firebase/firestore';
import type { RankingEntry } from '../../interfaces/mission.interface';
import { useAuth } from '../auth/useAuth';
import { useCollection } from '../../firebase/hooks/useCollection';
import { User } from '../../interfaces/user.interface';

//? Cantidad de filas que muestra el ranking
const RANKING_SIZE = 5;

export const useRanking = () => {
  const { user } = useAuth();
  const { results, isPending, suscribe } = useCollection<User>('users');

  //* Effects
  useEffect(() => {
    // Se leen todos los usuarios ordenados (sin limit): hace falta para conocer la
    // posición real de quien no está entre los primeros
    const unsuscribe = suscribe([orderBy('points', 'desc')]);
    return unsuscribe;
  }, [suscribe]);

  //* Valores derivados
  const ranking = useMemo<RankingEntry[]>(() => {
    const all: RankingEntry[] = results.map((doc, _index, docs) => ({
      id: doc.id,
      username: doc.username,
      points: doc.points,
      // Los empates comparten posición: es la del primer usuario con esos puntos
      position: docs.findIndex((d) => d.points === doc.points) + 1,
    }));

    const myIndex = all.findIndex((entry) => entry.id === user?.id);

    // Estás dentro del top (o no tienes puntaje todavía): se muestran los primeros
    if (myIndex < RANKING_SIZE) return all.slice(0, RANKING_SIZE);

    // Estás fuera del top: se compara contra los 4 mejores
    return [...all.slice(0, RANKING_SIZE - 1), all[myIndex]];
  }, [results, user?.id]);

  return { ranking, isPending, currentUserId: user?.id };
};
