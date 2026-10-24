import { IonContent, IonPage } from "@ionic/react";
import AppHeader from "../components/shared/AppHeader";
import ProgressSummary from "../components/missions/ProgressSummary";
import MissionList from "../components/missions/MissionList";
import { useMissions } from "../hooks/missions/useMissions";
import { useMissionActions } from "../hooks/missions/useMissionActions";

const HomePage = () => {
  const { missions, totalPoints, completedCount, totalCount, percent } =
    useMissions();
  const { handleMissionAction } = useMissionActions();

  return (
    <IonPage>
      <AppHeader />
      <IonContent fullscreen>
        <main className="max-w-2xl mx-auto py-4 flex flex-col gap-4">
          <p className="px-4 text-sm">Eddie Santiago Delgado Campo - 2235060</p>

          <ProgressSummary
            totalPoints={totalPoints}
            completedCount={completedCount}
            totalCount={totalCount}
            percent={percent}
          />

          <MissionList missions={missions} onAction={handleMissionAction} />
        </main>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
