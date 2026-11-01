import { IonApp, IonPage, setupIonicReact } from '@ionic/react';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import '@ionic/react/css/palettes/dark.system.css';
import './theme/variables.css';
import PageHeader from './components/shared/PageHeader';
import { MapView } from './components/MapView';
import ConnectionGuard from './components/shared/ConnectionGuard';

setupIonicReact();

const App = () => {
  return (
    <IonApp>
      <ConnectionGuard>
        <IonPage>
          <PageHeader title="Leaflet Challenge" />
          <MapView />
        </IonPage>
      </ConnectionGuard>
    </IonApp>
  );
};

export default App;
