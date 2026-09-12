import { IonContent, IonPage } from "@ionic/react";
import AppHeader from "../components/AppHeader";
import Loader from "../components/Loader";
import VisitList from "../components/VisitList";
import { useLoader } from "../hooks/useLoader";

const VisitsPage = () => {
  const { loading } = useLoader();
  if (loading) return <Loader />;

  return (
    <IonPage>
      <AppHeader />
      <IonContent fullscreen>
        <main className="max-w-2xl mx-auto p-4">
          <VisitList />
        </main>
      </IonContent>
    </IonPage>
  );
};

export default VisitsPage;