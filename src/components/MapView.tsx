import { IonButton } from '@ionic/react';
import { useMapView } from '../hooks/useMapView';
import {
  CircleMarker,
  MapContainer,
  Polyline,
  TileLayer,
  useMap,
} from 'react-leaflet';

// MapContainer solo lee `center` al montarse, por eso se recentra con el mapa
const RecenterMap = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  map.setView(center);
  return null;
};

export const MapView = () => {
  const {
    position,
    coordinates,
    address,
    ready,
    startTracking,
    stopTracking,
    handleGetAddress,
  } = useMapView();

  return (
    <div className="p-6">
      <div className="flex gap-4 items-center">
        <IonButton onClick={() => startTracking()}>Iniciar</IonButton>
        <IonButton onClick={() => stopTracking()}>Detener</IonButton>
        <IonButton onClick={() => handleGetAddress()}>
          Obtener dirección
        </IonButton>
      </div>
      <p className="mt-2">Dirección: {address?.results[0]?.formatted}</p>

      {ready && position ? (
        <MapContainer
          center={[position.coords.latitude, position.coords.longitude]}
          zoom={18}
          className="map-container"
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/* CircleMarker evita el problema de los íconos por defecto de Leaflet con Vite */}
          <CircleMarker
            center={[position.coords.latitude, position.coords.longitude]}
            radius={8}
          />
          <Polyline positions={coordinates} />
          <RecenterMap
            center={[position.coords.latitude, position.coords.longitude]}
          />
        </MapContainer>
      ) : (
        <div
          className="map-container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <p>Obteniendo ubicación...</p>
        </div>
      )}
    </div>
  );
};
