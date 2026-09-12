import { IonContent, IonPage } from "@ionic/react";
import AppHeader from "../components/AppHeader";
import Loader from "../components/Loader";
import ContactList from "../components/ContactList";
import { useContacts } from "../hooks/contacts/useContacts";
import { useLoader } from "../hooks/useLoader";

const ListPage = () => {
  const { contacts } = useContacts();
  const { loading } = useLoader();
  if (loading) return <Loader />;

  return (
    <IonPage>
      <AppHeader />
      <IonContent fullscreen>
        <main className="max-w-5xl mx-auto p-8 flex flex-col">
          <ContactList contacts={contacts} />
        </main>
      </IonContent>
    </IonPage>
  );
};

export default ListPage;
