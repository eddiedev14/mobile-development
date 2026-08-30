import { IonButton, IonInput, IonItem, IonList } from "@ionic/react";
import { useTaskie } from "../hooks/useTaskie";

const TaskieForm = () => {
  const { handleSubmit } = useTaskie();

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-semibold">Crear Tarea</h2>

      <IonList>
        {/* Nombre */}
        <IonItem>
          <IonInput
            name="name"
            label="Nombre"
            labelPlacement="floating"
            placeholder="e.g. Estudiar"
          ></IonInput>
        </IonItem>
      </IonList>

      <IonButton type="submit" className="text-white">
        Crear
      </IonButton>
    </form>
  );
};

export default TaskieForm;
