import { IonContent, IonPage } from "@ionic/react";
import PageHeader from "../../components/shared/PageHeader";
import FruitList from "../../components/fruits/FruitList";

const FruitsListPage = () => {
  return (
    <IonPage>
      <PageHeader title="Frutas" backHref="/" />
      <IonContent fullscreen>
        <main className="max-w-5xl mx-auto py-8 px-4">
          <FruitList />
        </main>
      </IonContent>
    </IonPage>
  );
};

export default FruitsListPage;
