import { IonButton, IonInput, IonItem, IonList } from "@ionic/react";
import { useTaskieForm } from "../../hooks/tasks/useTaskieForm";

const TaskieForm = () => {
  const { handleSubmit } = useTaskieForm();

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

        <IonItem>
          <IonInput
            name="description"
            label="Descripción"
            labelPlacement="floating"
            placeholder="e.g. Estudiar Ionic para mejorar mis habilidades"
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
