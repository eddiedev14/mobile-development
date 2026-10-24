import { IonContent, IonPage } from "@ionic/react";
import AppHeader from "../components/shared/AppHeader";
import RankingList from "../components/ranking/RankingList";
import { useRanking } from "../hooks/ranking/useRanking";

const RankingPage = () => {
  const { ranking, isPending, currentUserId } = useRanking();

  return (
    <IonPage>
      <AppHeader title="Ranking" />
      <IonContent fullscreen>
        <main className="max-w-2xl mx-auto px-4 py-6 flex flex-col gap-2">
          <h2 className="text-lg font-semibold px-1">Top 5</h2>
          <RankingList
            ranking={ranking}
            isPending={isPending}
            currentUserId={currentUserId}
          />
        </main>
      </IonContent>
    </IonPage>
  );
};

export default RankingPage;
