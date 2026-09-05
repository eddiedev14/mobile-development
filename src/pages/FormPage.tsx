import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import ContactForm from "../components/ContactForm";
import Loader from "../components/Loader";
import { useLoader } from "../hooks/useLoader";
import { useContacts } from "../hooks/useContacts";

const FormPage = () => {
  const { handleSubmit } = useContacts();
  const { loading } = useLoader();
  if (loading) return <Loader />;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="ml-8">Contacts App</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <main className="max-w-5xl mx-auto p-8 flex flex-col">
          <ContactForm onSubmit={handleSubmit} />
        </main>
      </IonContent>
    </IonPage>
  );
};

export default FormPage;
