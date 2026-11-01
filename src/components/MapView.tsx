import { useState } from 'react';
import {
  IonButton,
  IonItem,
  IonLabel,
  IonList,
  IonSelect,
  IonSelectOption,
} from '@ionic/react';
import { useMapView } from '../hooks/useMapView';
import {
  CircleMarker,
  MapContainer,
  Polyline,
  TileLayer,
  Tooltip,
  useMap,
} from 'react-leaflet';
import { metersBetween } from '../utils/distance';
import { RADIUS_KM } from '../actions/getNearbyPlaces.action';

// En español: OpenCage busca por nombre local
const CATEGORIES = ['restaurante', 'farmacia', 'hospital', 'supermercado'];

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
    places,
    photo,
    ready,
    isTracking,
    isOnline,
    batteryLevel,
    handleStart,
    handleStop,
    handleGetAddress,
    handleGetPlaces,
    handleTakePhoto,
  } = useMapView();
  const [category, setCategory] = useState(CATEGORIES[0]);

  return (
    <div className="p-6">
      <div className="flex flex-wrap gap-4 items-center">
        <IonButton disabled={isTracking} onClick={() => handleStart()}>
          Iniciar
        </IonButton>
        <IonButton disabled={!isTracking} onClick={() => handleStop()}>
          Detener
        </IonButton>
        <IonButton disabled={!isOnline} onClick={() => handleGetAddress()}>
          Obtener dirección
        </IonButton>
        <IonButton disabled={!position} onClick={() => handleTakePhoto()}>
          Tomar foto
        </IonButton>
      </div>

      <p className="mt-2">
        Estado: {isTracking ? 'Rastreando' : 'Detenido'} · Red:{' '}
        {isOnline ? 'conectado' : 'sin conexión'} · Batería:{' '}
        {batteryLevel === null ? '--' : `${Math.round(batteryLevel * 100)}%`}
      </p>
      <p className="mt-2">Dirección: {address?.results[0]?.formatted}</p>

      {photo && (
        <img src={photo} alt="Foto con ubicación" className="mt-2 max-w-3xl" />
      )}

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
          {places?.map((place) => (
            <CircleMarker
              key={place.formatted}
              center={[place.geometry.lat, place.geometry.lng]}
              radius={6}
              pathOptions={{ color: 'red' }}
            >
              <Tooltip>{place.formatted}</Tooltip>
            </CircleMarker>
          ))}
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

      <div className="flex gap-4 items-center mt-4">
        <IonSelect
          label="Categoría"
          value={category}
          onIonChange={(e) => setCategory(e.detail.value)}
        >
          {CATEGORIES.map((c) => (
            <IonSelectOption key={c} value={c}>
              {c}
            </IonSelectOption>
          ))}
        </IonSelect>
        <IonButton
          disabled={!isOnline || !position}
          onClick={() => handleGetPlaces(category)}
        >
          Lugares a {RADIUS_KM} km
        </IonButton>
      </div>

      {places?.length === 0 && (
        <p className="mt-2">No se encontraron lugares en {RADIUS_KM} km.</p>
      )}

      <IonList>
        {places?.map((place) => (
          <IonItem key={place.formatted}>
            <IonLabel>
              {place.formatted}
              {position && (
                <p>
                  A{' '}
                  {Math.round(
                    metersBetween(
                      [position.coords.latitude, position.coords.longitude],
                      [place.geometry.lat, place.geometry.lng],
                    ),
                  )}{' '}
                  m
                </p>
              )}
            </IonLabel>
          </IonItem>
        ))}
      </IonList>
    </div>
  );
};
