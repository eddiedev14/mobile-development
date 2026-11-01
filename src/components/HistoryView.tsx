import { useEffect, useState } from 'react';
import {
  IonItem,
  IonLabel,
  IonList,
  IonSelect,
  IonSelectOption,
} from '@ionic/react';
import { MapContainer, Polyline, TileLayer } from 'react-leaflet';
import {
  listDays,
  readDay,
  TrackSession,
} from '../actions/trackHistory.action';

export const HistoryView = () => {
  const [days, setDays] = useState<string[]>([]);
  const [day, setDay] = useState<string>();
  const [sessions, setSessions] = useState<TrackSession[]>([]);
  const [selected, setSelected] = useState<TrackSession>();

  useEffect(() => {
    listDays().then((list) => {
      setDays(list);
      setDay(list[0]);
    });
  }, []);

  useEffect(() => {
    if (!day) return;
    readDay(day).then((list) => {
      setSessions(list);
      setSelected(undefined);
    });
  }, [day]);

  if (days.length === 0) {
    return <p className="p-6">Aún no hay recorridos guardados.</p>;
  }

  return (
    <div className="p-6">
      <IonSelect
        label="Día"
        value={day}
        onIonChange={(e) => setDay(e.detail.value)}
      >
        {days.map((d) => (
          <IonSelectOption key={d} value={d}>
            {d}
          </IonSelectOption>
        ))}
      </IonSelect>

      <IonList>
        {sessions.map((s) => (
          <IonItem key={s.startedAt} button onClick={() => setSelected(s)}>
            <IonLabel>
              {new Date(s.startedAt).toLocaleTimeString()} -{' '}
              {new Date(s.endedAt).toLocaleTimeString()}
              <p>{s.coordinates.length} coordenadas</p>
            </IonLabel>
          </IonItem>
        ))}
      </IonList>

      {selected && (
        // key: MapContainer solo lee `bounds` al montarse, así que se remonta al cambiar de recorrido
        <MapContainer
          key={selected.startedAt}
          bounds={selected.coordinates}
          className="map-container"
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Polyline positions={selected.coordinates} />
        </MapContainer>
      )}
    </div>
  );
};
