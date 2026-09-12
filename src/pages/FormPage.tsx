import { IonPage, IonContent } from "@ionic/react";
import AppHeader from "../components/AppHeader";
import ContactForm from "../components/ContactForm";
import Loader from "../components/Loader";
import { useLoader } from "../hooks/useLoader";
import { useContactForm } from "../hooks/contacts/useContactForm";

const FormPage = () => {
  const { handleSubmit } = useContactForm();
  const { loading } = useLoader();
  if (loading) return <Loader />;

  return (
    <IonPage>
      <AppHeader />
      <IonContent fullscreen>
        <main className="max-w-5xl mx-auto p-8 flex flex-col">
          <ContactForm onSubmit={handleSubmit} />
        </main>
      </IonContent>
    </IonPage>
  );
};

export default FormPage;
