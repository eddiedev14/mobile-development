import { IonButton, IonInput, IonItem, IonList } from "@ionic/react";

interface Props {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const ContactForm = ({ onSubmit }: Props) => {
  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
      <h2 className="text-2xl font-semibold">Agregar Contacto</h2>

      <IonList>
        {/* Nombre */}
        <IonItem>
          <IonInput
            name="name"
            label="Nombre"
            labelPlacement="floating"
            placeholder="e.g. Eddie Santiago"
          ></IonInput>
        </IonItem>

        {/* Telefono */}
        <IonItem>
          <IonInput
            name="phone"
            label="Teléfono"
            labelPlacement="floating"
            placeholder="e.g. 3111234567"
            type="tel"
          ></IonInput>
        </IonItem>
      </IonList>

      <IonButton type="submit" className="text-white">
        Agregar
      </IonButton>
    </form>
  );
};

export default ContactForm;
