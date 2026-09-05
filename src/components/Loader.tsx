import { IonSpinner } from "@ionic/react";

const Loader = () => {
  return (
    <div className="min-h-dvh flex items-center justify-center">
      <IonSpinner
        name="crescent"
        color="secondary"
        className="size-16"
      ></IonSpinner>
    </div>
  );
};

export default Loader;
