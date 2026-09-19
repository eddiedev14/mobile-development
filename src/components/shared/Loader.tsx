import { IonSpinner } from "@ionic/react";

export const Loader = () => {
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
