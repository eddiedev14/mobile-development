import { IonButton } from "@ionic/react";
import { useCamera } from "../../hooks/sensors/useCamera";

const CameraSensor = () => {
  const { photo, takePhoto } = useCamera();

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">Camera</h2>
      <IonButton onClick={takePhoto}>Tomar foto</IonButton>
      {photo && <img src={photo} />}
    </section>
  );
};

export default CameraSensor;
