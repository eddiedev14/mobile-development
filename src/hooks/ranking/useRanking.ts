import { useState } from "react";
import type { RankingEntry } from "../../interfaces/mission.interface";
import { useAuth } from "../auth/useAuth";

export const useRanking = () => {
  const { user } = useAuth();

  //* States
  const [ranking] = useState<RankingEntry[]>([]);
  const [isPending] = useState(false);

  //TODO: Suscribirse (useCollection<User>("users").suscribe) con orderBy("points", "desc") y limit(5)
  //TODO: Mapear los documentos a RankingEntry { id, username, points }
  //TODO: Si el usuario actual no está en el top 5, mostrarlo igualmente frente a los otros 4

  return { ranking, isPending, currentUserId: user?.id };
};
