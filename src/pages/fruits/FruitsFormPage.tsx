import { IonContent, IonPage } from "@ionic/react";
import PageHeader from "../../components/shared/PageHeader";
import FruitForm from "../../components/fruits/FruitForm";

interface Props {
  isEdit?: boolean;
}

const FruitsFormPage = ({ isEdit = false }: Props) => {
  return (
    <IonPage>
      <PageHeader title="Frutas" backHref="/" />
      <IonContent fullscreen>
        <main className="max-w-5xl mx-auto py-8 px-4">
          <FruitForm isEdit={isEdit} />
        </main>
      </IonContent>
    </IonPage>
  );
};

export default FruitsFormPage;
