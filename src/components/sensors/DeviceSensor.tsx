import { IonSpinner } from "@ionic/react";
import { useDevice } from "../../hooks/sensors/useDevice";

const DeviceSensor = () => {
  const { battery, info, deviceId, loading } = useDevice();

  if (loading) {
    return <IonSpinner></IonSpinner>;
  }

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">Device</h2>
      <p>Batería: {(battery?.batteryLevel || 0) * 100}%</p>
      <p>{battery?.isCharging ? "Cargando" : "No cargando"}</p>

      <p>Modelo: {info?.model}</p>
      <p>Plataforma: {info?.platform}</p>
      <p>OS: {info?.operatingSystem}</p>

      <p>ID: {deviceId}</p>
    </section>
  );
};

export default DeviceSensor;
