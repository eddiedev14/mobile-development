import { IonButton } from "@ionic/react";
import { toast } from "react-toastify";
import { useGeolocation } from "../../hooks/sensors/useGeolocation";

const GeolocationSensor = () => {
  const { position, startTracking, stopTracking } = useGeolocation();

  const handleStartTracking = () => {
    startTracking();
    toast.success("Tracking iniciado!");
  };

  const handleStopTracking = () => {
    stopTracking();
    toast.success("Tracking detenido!");
  };

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">Geolocation</h2>
      <div className="flex items-center gap-4">
        <IonButton onClick={handleStartTracking}>Iniciar</IonButton>
        <IonButton onClick={handleStopTracking}>Detener</IonButton>
      </div>
      {position?.coords && (
        <>
          <p>Latitud: {position?.coords.latitude}</p>
          <p>Longitud: {position?.coords.longitude}</p>
        </>
      )}
    </section>
  );
};

export default GeolocationSensor;
