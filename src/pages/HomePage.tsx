import { IonButton, IonContent, IonIcon, IonPage } from "@ionic/react";
import AppHeader from "../components/shared/AppHeader";
import { SENSORS } from "../constants/sensors.constant";

const HomePage = () => {
  return (
    <IonPage>
      <AppHeader />
      <IonContent fullscreen>
        <main className="max-w-2xl mx-auto px-8 py-12 flex flex-col items-center gap-4 text-center">
          <h1 className="text-4xl font-semibold tracking-tight">
            Challenge 07
          </h1>

          <p className="text-base font-light opacity-70">
            Prueba los sensores de Capacitor. Elige uno para abrir su página.
          </p>

          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
            {SENSORS.map(({ label, path, icon }) => (
              <IonButton key={path} routerLink={path} expand="block">
                <IonIcon slot="start" icon={icon} />
                {label}
              </IonButton>
            ))}
          </div>
        </main>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
