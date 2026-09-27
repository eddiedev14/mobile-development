import { IonContent, IonPage } from "@ionic/react";
import PageHeader from "../../components/shared/PageHeader";
import ContactList from "../../components/contacts/ContactList";

const ContactsListPage = () => {
  return (
    <IonPage>
      <PageHeader title="Contactos" backHref="/" />
      <IonContent fullscreen>
        <main className="max-w-5xl mx-auto py-8 px-4">
          <ContactList />
        </main>
      </IonContent>
    </IonPage>
  );
};

export default ContactsListPage;
