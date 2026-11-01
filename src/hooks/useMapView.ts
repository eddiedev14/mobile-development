import { useEffect, useRef, useState } from 'react';
import { Haptics } from '@capacitor/haptics';
import { useGeolocation } from '../hooks/sensors/useGeolocation';
import { useNetwork } from './sensors/useNetwork';
import { useBattery } from './sensors/useBattery';
import { useMotion } from './sensors/useMotion';
import { OpenCageResponse, Result } from '../interfaces/opencage.interface';
import { getAddress } from '../actions/getAddress.action';
import { getNearbyPlaces } from '../actions/getNearbyPlaces.action';
import { saveSession } from '../actions/trackHistory.action';
import { takePhotoWithWatermark } from '../actions/takePhoto.action';
import { notify } from '../actions/notify.action';
import { metersBetween } from '../utils/distance';

const LOW_BATTERY = 0.2; // por debajo de 20% se detiene el tracking
const IDLE_MS = 5 * 60_000; // tiempo sin moverse para avisar
const MOVE_METERS = 15; // menos que esto se considera ruido del GPS
const FAST_SPEED = 20; // m/s (72 km/h)
const ALERT_COOLDOWN_MS = 2 * 60_000; // para no repetir el aviso de velocidad
const STILL_STOP_MS = 5 * 60_000; // quieto (acelerómetro) este tiempo detiene el tracking

export const useMapView = () => {
  const { position, getCurrentLocation, startTracking, stopTracking } =
    useGeolocation();
  const { isOnline } = useNetwork();
  const { level: batteryLevel, isCharging } = useBattery();
  const { isMoving } = useMotion();
  const lowBattery =
    !isCharging && batteryLevel !== null && batteryLevel < LOW_BATTERY;

  const [coordinates, setCoordinates] = useState<[number, number][]>([]);
  const [address, setAddress] = useState<OpenCageResponse | null>(null);
  const [places, setPlaces] = useState<Result[] | null>(null); // null: aún no se ha buscado;
  const [photo, setPhoto] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [isTracking, setIsTracking] = useState(false);

  // Inicio de la sesión actual; null cuando no hay tracking (también evita guardar dos veces)
  const startedAt = useRef<string | null>(null);
  // Último punto donde el usuario se movió de verdad y cuándo
  const lastMoved = useRef<{ point: [number, number]; at: number } | null>(
    null,
  );
  const lastFastAlert = useRef(0);
  const coordinatesRef = useRef(coordinates);
  coordinatesRef.current = coordinates;
  // Si el usuario (o la batería) detiene el tracking mientras te mueves, no se reinicia
  // solo hasta que el teléfono quede quieto una vez
  const autoStartArmed = useRef(true);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  useEffect(() => {
    if (!position) return;
    setReady(true);
    const { latitude, longitude, speed } = position.coords;
    const here: [number, number] = [latitude, longitude];
    setCoordinates((prev) => [...prev, here]);

    if (!isTracking) return;

    if (
      !lastMoved.current ||
      metersBetween(lastMoved.current.point, here) > MOVE_METERS
    ) {
      lastMoved.current = { point: here, at: Date.now() };
    }

    if (
      speed &&
      speed > FAST_SPEED &&
      Date.now() - lastFastAlert.current > ALERT_COOLDOWN_MS
    ) {
      lastFastAlert.current = Date.now();
      notify(
        'Movimiento rápido',
        `Te mueves a ${Math.round(speed * 3.6)} km/h`,
      );
    }
  }, [position]);

  // Aviso por mucho tiempo quieto
  useEffect(() => {
    if (!isTracking) return;
    const id = setInterval(() => {
      const moved = lastMoved.current;
      if (moved && Date.now() - moved.at > IDLE_MS) {
        moved.at = Date.now(); // vuelve a avisar solo después de otro periodo quieto
        notify('Sin movimiento', 'Llevas más de 5 minutos en el mismo lugar');
      }
    }, 30_000);
    return () => clearInterval(id);
  }, [isTracking]);

  // Aviso de pérdida de conexión mientras se rastrea
  useEffect(() => {
    if (isTracking && !isOnline) {
      notify(
        'Sin conexión',
        'El mapa y las direcciones no funcionarán hasta que vuelva internet',
      );
    }
  }, [isOnline]);

  // Batería baja: detiene el tracking si no está cargando
  useEffect(() => {
    if (isTracking && lowBattery) {
      handleStop();
      notify('Batería baja', 'Se detuvo el seguimiento para ahorrar batería');
    }
  }, [lowBattery, isTracking]);

  // Inicio automático: tras 2 s de movimiento sostenido del teléfono
  useEffect(() => {
    if (!isMoving) autoStartArmed.current = true;
    else if (autoStartArmed.current && !isTracking && !lowBattery)
      handleStart();
  }, [isMoving, isTracking]);

  // Parada automática: teléfono quieto 5 min y sin cambio de lugar según el GPS
  useEffect(() => {
    if (!isTracking || isMoving) return;
    const id = setTimeout(() => {
      const moved = lastMoved.current;
      if (moved && Date.now() - moved.at < STILL_STOP_MS) return;
      handleStop();
      notify('Seguimiento detenido', 'El teléfono estuvo quieto 5 minutos');
    }, STILL_STOP_MS);
    return () => clearTimeout(id);
  }, [isTracking, isMoving]);

  const handleStart = async () => {
    if (startedAt.current) return;
    if (!(await startTracking())) return;

    Haptics.vibrate();
    startedAt.current = new Date().toISOString();
    const first: [number, number][] = position
      ? [[position.coords.latitude, position.coords.longitude]]
      : [];
    setCoordinates(first); // el recorrido guardado empieza al iniciar, no al abrir la app
    lastMoved.current = first[0] ? { point: first[0], at: Date.now() } : null;
    setIsTracking(true);
  };

  const handleStop = async () => {
    const started = startedAt.current;
    if (!started) return;
    startedAt.current = null;
    autoStartArmed.current = false;

    await stopTracking();
    setIsTracking(false);
    await saveSession({
      startedAt: started,
      endedAt: new Date().toISOString(),
      coordinates: coordinatesRef.current,
    });
  };

  const handleGetAddress = async () => {
    if (!position) return;
    const address = await getAddress(
      position?.coords.latitude,
      position?.coords.longitude,
    );
    setAddress(address);
  };

  const handleGetPlaces = async (category: string) => {
    if (!position) return;
    setPlaces(
      await getNearbyPlaces(
        category,
        position.coords.latitude,
        position.coords.longitude,
      ),
    );
  };

  const handleTakePhoto = async () => {
    if (!position) return;
    const { latitude, longitude } = position.coords;
    try {
      setPhoto(
        await takePhotoWithWatermark(
          `${latitude.toFixed(5)}, ${longitude.toFixed(5)} · ${new Date().toLocaleString()}`,
        ),
      );
    } catch {
      // el usuario canceló la cámara
    }
  };

  return {
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
  };
};
