import {
  IonContent,
  IonHeader,
  IonPage,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import GifList from "../components/GifList";
import { useGiphy } from "../hooks/useGiphy";

const Giphy = () => {
  const { query, gifs, handleQueryChange, handleSubmit } = useGiphy();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Giphy App</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <main className="max-w-5xl mx-auto p-4 flex flex-col gap-6">
          <div>
            <h1 className="text-2xl font-semibold">Giphy App</h1>
            <p className="text-sm">Eddie Santiago Delgado Campo - 223506092</p>
          </div>

          {/*Input de búsqueda*/}
          <form action="#" onSubmit={handleSubmit}>
            <IonSearchbar
              onIonInput={(e) =>
                handleQueryChange(
                  (e.target as HTMLIonSearchbarElement).value ?? "",
                )
              }
              value={query}
              placeholder="Buscar gifs"
              className="p-0"
            />
          </form>

          {/*Lista de gifs*/}
          <GifList gifs={gifs} />
        </main>
      </IonContent>
    </IonPage>
  );
};

export default Giphy;
