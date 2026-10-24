import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../auth/useAuth';
import { useCamera } from '../sensors/useCamera';
import { useMissions } from './useMissions';
import { getLocalPhoto, saveLocalPhoto } from '../../utils/photoStorage';
import { photoToDataUrl } from '../../utils/image';

export const useMissionActions = () => {
  const { user } = useAuth();
  const { completeMission } = useMissions();
  const { takePhoto: takeCameraPhoto } = useCamera();
  const uid = user?.id;

  //* Foto de la misión 1 (guardada en localStorage)
  const [photo, setPhoto] = useState<string | null>(null);

  useEffect(() => {
    setPhoto(uid ? getLocalPhoto(uid) : null);
  }, [uid]);

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
    //TODO: Geolocation.getCurrentPosition() como posición original
    //TODO: Geolocation.watchPosition() y calcular la distancia (Haversine) contra la original
    //TODO: Si distancia > MOVE_DISTANCE_METERS -> clearWatch + await completeMission(2)
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

  return { handleMissionAction, photos };
};
