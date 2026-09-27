import { IonContent, IonPage } from "@ionic/react";
import PageHeader from "../../components/shared/PageHeader";
import ContactForm from "../../components/contacts/ContactForm";
import { useContactForm } from "../../hooks/contacts/useContactForm";

const ContactsFormPage = () => {
  const { handleSubmit } = useContactForm();

  return (
    <IonPage>
      <PageHeader title="Contactos" backHref="/" />
      <IonContent fullscreen>
        <main className="max-w-5xl mx-auto py-8 px-4">
          <ContactForm onSubmit={handleSubmit} />
        </main>
      </IonContent>
    </IonPage>
  );
};

export default ContactsFormPage;
