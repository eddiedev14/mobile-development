import {
  IonAvatar,
  IonBadge,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonSkeletonText,
  IonText,
} from "@ionic/react";
import { podiumOutline } from "ionicons/icons";
import type { RankingEntry } from "../../interfaces/mission.interface";

interface Props {
  ranking: RankingEntry[];
  isPending: boolean;
  currentUserId?: string;
}

const MEDALS = ["warning", "medium", "danger"] as const;

const RankingList = ({ ranking, isPending, currentUserId }: Props) => {
  if (isPending) {
    return (
      <IonList>
        {Array.from({ length: 5 }).map((_, i) => (
          <IonItem key={i}>
            <IonLabel>
              <IonSkeletonText animated className="w-3/5" />
            </IonLabel>
          </IonItem>
        ))}
      </IonList>
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
    <IonList>
      {ranking.map((entry, index) => {
        const isMe = entry.id === currentUserId;

        return (
          <IonItem
            key={entry.id}
            color={isMe ? "light" : undefined}
            lines="full"
          >
            <IonAvatar slot="start" className="size-10">
              <IonBadge
                color={MEDALS[index] ?? "tertiary"}
                className="size-full flex items-center justify-center text-base"
              >
                {index + 1}
              </IonBadge>
            </IonAvatar>

            <IonLabel>
              <h2 className={isMe ? "font-bold" : undefined}>
                {entry.username}
                {isMe && " (tú)"}
              </h2>
            </IonLabel>

            <IonLabel slot="end" className="font-semibold">
              {entry.points} pts
            </IonLabel>
          </IonItem>
        );
      })}
    </IonList>
  );
};

export default RankingList;
