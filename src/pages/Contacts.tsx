import {
  IonContent,
  IonHeader,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import ContactForm from "../components/ContactForm";
import ContactList from "../components/ContactList";
import Alert from "../components/Alert";
import { useContactsApp } from "../hooks/useContactsApp";

const Contacts = () => {
  //* Custom Hooks
  const { loading, contacts, handleSubmit, onConfirmDeleteAlert } =
    useContactsApp();

  if (loading) {
    return (
      <div className="min-h-dvh flex items-center justify-center">
        <IonSpinner
          name="crescent"
          color="secondary"
          className="size-16"
        ></IonSpinner>
      </div>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="ml-8">Contacts App</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <main className="max-w-5xl mx-auto py-8 grid grid-cols-1 gap-8 md:grid-cols-2">
          <ContactForm onSubmit={handleSubmit} />
          <ContactList contacts={contacts} />
          <Alert onConfirm={onConfirmDeleteAlert} />
        </main>
      </IonContent>
    </IonPage>
  );
};

export default Contacts;
