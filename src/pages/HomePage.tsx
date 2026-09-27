import { IonContent, IonPage } from "@ionic/react";
import AppHeader from "../components/shared/AppHeader";

const HomePage = () => {
  return (
    <IonPage>
      <AppHeader />
      <IonContent fullscreen>
        <main className="max-w-2xl mx-auto px-8 py-24 flex flex-col items-center gap-4 text-center">
          <h1 className="text-4xl font-semibold tracking-tight">
            Challenge 06
          </h1>

          <p className="text-base font-light opacity-70">
            Prueba todas las funcionalidades de Firebase Storage y Dexie.
            Navega por nuestras tabs.
          </p>
        </main>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
