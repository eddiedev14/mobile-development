//? Lógica real de cada misión. Cada función, al cumplirse la condición, debe llamar a completeMission(id)
export const useMissionActions = () => {
  //TODO: const { completeMission } = useMissions(); (import { useMissions } from "./useMissions")

  //* Misión 1: Evidencia
  const takePhoto = async () => {
    //TODO: Camera.getPhoto(...) y guardar la imagen en Firebase Storage (en navegador abre el selector de archivos)
    //TODO: Al guardar la imagen -> await completeMission(1)
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

  return { handleMissionAction };
};
