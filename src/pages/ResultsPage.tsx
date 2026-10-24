import { IonContent, IonPage } from "@ionic/react";
import AppHeader from "../components/shared/AppHeader";
import ResultsSummary from "../components/results/ResultsSummary";
import { useMissions } from "../hooks/missions/useMissions";

const ResultsPage = () => {
  const { totalPoints, completedCount, totalCount, generalStatus } =
    useMissions();

  return (
    <IonPage>
      <AppHeader title="Resultados" />
      <IonContent fullscreen>
        <main className="max-w-2xl mx-auto py-4">
          <ResultsSummary
            totalPoints={totalPoints}
            completedCount={completedCount}
            totalCount={totalCount}
            generalStatus={generalStatus}
          />
        </main>
      </IonContent>
    </IonPage>
  );
};

export default ResultsPage;
