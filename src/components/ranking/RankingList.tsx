import { IonIcon, IonSkeletonText, IonText } from "@ionic/react";
import { podiumOutline } from "ionicons/icons";
import type { RankingEntry } from "../../interfaces/mission.interface";

interface Props {
  ranking: RankingEntry[];
  isPending: boolean;
  currentUserId?: string;
}

//? Color Ionic de la posición: oro, plata y bronce; el resto usa "tertiary"
const MEDALS = ["warning", "medium", "danger"] as const;

//? Estilo común de cada fila (mismo bloque con borde que las misiones)
const ROW = "flex items-center gap-4 rounded-xl border px-4 py-3 bg-(--ion-item-background)";
const BORDER = "border-black/10 dark:border-white/15";

const RankingList = ({ ranking, isPending, currentUserId }: Props) => {
  if (isPending) {
    return (
      <div className="flex flex-col gap-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className={`${ROW} ${BORDER}`}>
            <IonSkeletonText animated className="size-9 shrink-0 rounded-full m-0" />
            <IonSkeletonText animated className="w-3/5 m-0" />
          </div>
        ))}
      </div>
    );
  }

  if (ranking.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 py-16 text-center">
        <IonIcon icon={podiumOutline} color="medium" className="text-5xl" />
        <IonText color="medium">
          <p>Aún no hay puntajes en el ranking</p>
        </IonText>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {ranking.map((entry) => {
        const isMe = entry.id === currentUserId;
        const medal = MEDALS[entry.position - 1] ?? "tertiary";

        return (
          <div
            key={entry.id}
            className={`${ROW} ${isMe ? "border-2 border-(--ion-color-primary)" : BORDER}`}
          >
            {/* Posición */}
            <span
              className="size-9 shrink-0 flex items-center justify-center rounded-full text-sm font-semibold"
              style={{
                backgroundColor: `var(--ion-color-${medal})`,
                color: `var(--ion-color-${medal}-contrast)`,
              }}
            >
              {entry.position}
            </span>

            {/* Nombre (se corta con "..." si es muy largo) */}
            <p className={`flex-1 min-w-0 truncate ${isMe ? "font-bold" : ""}`}>
              {entry.username}
              {isMe && " (tú)"}
            </p>

            {/* Puntos */}
            <p className="shrink-0 font-semibold tabular-nums">
              {entry.points} pts
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default RankingList;
