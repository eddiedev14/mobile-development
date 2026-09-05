import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import Loader from "../components/Loader";
import ContactList from "../components/ContactList";
import Alert from "../components/Alert";
import { useLoader } from "../hooks/useLoader";
import { useContacts } from "../hooks/useContacts";

const ListPage = () => {
  const { contacts, onConfirmDeleteAlert } = useContacts();
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
          <ContactList contacts={contacts} />
          <Alert onConfirm={onConfirmDeleteAlert} />
        </main>
      </IonContent>
    </IonPage>
  );
};

export default ListPage;
