import { IonButton } from "@ionic/react";
import { useHaptics } from "../../hooks/sensors/useHaptics";

const HapticsSensor = () => {
  const { isAvailable, impact, notify, vibrate } = useHaptics();

  if (!isAvailable) {
    return <p>No puedes utilizar esta feature</p>;
  }

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">Haptics</h2>
      <div className="flex items-center gap-4">
        <IonButton onClick={() => impact("light")}>Impacto Suave</IonButton>
        <IonButton onClick={() => impact("heavy")}>Impacto Fuerte</IonButton>
        <IonButton onClick={() => notify("success")}>Éxito</IonButton>
        <IonButton onClick={() => notify("error")}>Error</IonButton>
        <IonButton onClick={() => vibrate(200)}>Vibrar</IonButton>
      </div>
    </section>
  );
};

export default HapticsSensor;
