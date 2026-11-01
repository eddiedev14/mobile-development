import { useState } from 'react';
import {
  IonApp,
  IonContent,
  IonLabel,
  IonPage,
  IonSegment,
  IonSegmentButton,
  setupIonicReact,
} from '@ionic/react';

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
import { HistoryView } from './components/HistoryView';

setupIonicReact();

const App = () => {
  const [tab, setTab] = useState<'map' | 'history'>('map');

  return (
    <IonApp>
      <IonPage>
        <PageHeader title="Leaflet Challenge" />
        <IonContent>
          <IonSegment
            value={tab}
            onIonChange={(e) => setTab(e.detail.value as 'map' | 'history')}
          >
            <IonSegmentButton value="map">
              <IonLabel>Mapa</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="history">
              <IonLabel>Historial</IonLabel>
            </IonSegmentButton>
          </IonSegment>

          {/* MapView se oculta en vez de desmontarse: si no, cambiar de pestaña detendría el tracking */}
          <div className={tab === 'map' ? '' : 'hidden'}>
            <MapView />
          </div>
          {tab === 'history' && <HistoryView />}
        </IonContent>
      </IonPage>
    </IonApp>
  );
};

export default App;
