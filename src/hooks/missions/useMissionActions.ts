import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { Position } from '@capacitor/geolocation';
import { useAuth } from '../auth/useAuth';
import { useCamera } from '../sensors/useCamera';
import { useGeolocation } from '../sensors/useGeolocation';
import { useMissions } from './useMissions';
import { getLocalPhoto, saveLocalPhoto } from '../../utils/photoStorage';
import { photoToDataUrl } from '../../utils/image';
import { distanceInMeters } from '../../utils/geo';
import {
  MAX_ACCURACY_METERS,
  MOVE_DISTANCE_METERS,
} from '../../constants/missions.constant';

export const useMissionActions = () => {
  const { user } = useAuth();
  const { completeMission } = useMissions();
  const uid = user?.id;

  //* Sensores
  const { takePhoto: takeCameraPhoto } = useCamera();
  const { position, getCurrentLocation, startTracking, stopTracking } =
    useGeolocation();

  //* Estados
  const [photo, setPhoto] = useState<string | null>(null);
  //? Punto de partida de la misión 2. Si hay origen, la misión está en curso
  const [origin, setOrigin] = useState<Position | null>(null);

  //* Refs
  //? Evita iniciar la misión 2 dos veces mientras se espera el permiso de ubicación
  const starting = useRef(false);

  //* Valores derivados
  //? Metros recorridos desde el origen (null si la misión no está en curso o la lectura es imprecisa)
  const liveDistance =
    origin && position && position.coords.accuracy <= MAX_ACCURACY_METERS
      ? distanceInMeters(
          origin.coords.latitude,
          origin.coords.longitude,
          position.coords.latitude,
          position.coords.longitude,
        )
      : null;

  //* Efectos
  useEffect(() => {
    setPhoto(uid ? getLocalPhoto(uid) : null);
  }, [uid]);

  useEffect(() => {
    if (liveDistance === null || liveDistance <= MOVE_DISTANCE_METERS) return;

    // Superó la distancia: se termina el seguimiento y se completa la misión
    setOrigin(null);
    stopTracking();
    completeMission(2);
  }, [liveDistance, stopTracking, completeMission]);

  //? Guarda la foto (data URL) en localStorage y la muestra bajo la misión 1.
  //? Devuelve false si no se pudo guardar, para no completar la misión
  const savePhoto = (dataUrl: string) => {
    if (!uid || !saveLocalPhoto(uid, dataUrl)) return false;
    setPhoto(dataUrl);
    return true;
  };

  //* Misión 1: Evidencia
  const takePhoto = async () => {
    // 1. Abrir la cámara (en navegador abre el selector de archivos)
    const path = await takeCameraPhoto();
    if (!path) {
      toast.error('No se tomó la foto');
      return;
    }

    // 2. Guardar la imagen reducida en localStorage; si no cabe, no se completa la misión
    try {
      const dataUrl = await photoToDataUrl(path);
      if (!savePhoto(dataUrl)) throw new Error('No se pudo guardar');
    } catch {
      toast.error('No se pudo guardar la foto');
      return;
    }

    // 3. Foto guardada -> completar la misión
    await completeMission(1);
  };

  //* Misión 2: Movimiento real
  const trackMovement = async () => {
    if (origin || starting.current) return;
    starting.current = true;

    try {
      const start = await getCurrentLocation();
      if (!start) {
        toast.error('No se pudo obtener la ubicación');
        return;
      }

      // liveDistance compara cada lectura contra este punto de partida
      setOrigin(start);

      const started = await startTracking();
      if (!started) {
        setOrigin(null);
        toast.error('No se pudo iniciar el seguimiento de ubicación');
      }
    } finally {
      starting.current = false;
    }
  };

  //* Misión 3: Permanencia activa (se habilita al completar la misión 2)
  const stayStill = async () => {
    //TODO: Motion.addListener("accel", ...) y detectar que el celular está quieto (sin bloquear pantalla)
    //TODO: Si pasan STILL_SECONDS quieto -> Haptics.vibrate() + await completeMission(3)
    //TODO: Si se mueve, reiniciar la cuenta
  };

  const handleMissionAction = async (id: number) => {
    switch (id) {
      case 1:
        return takePhoto();
      case 2:
        return trackMovement();
      case 3:
        return stayStill();
    }
  };

  //? Fotos por id de misión (solo la misión 1 tiene foto)
  const photos: Record<number, string> = photo ? { 1: photo } : {};

  return { handleMissionAction, photos, liveDistance };
};
