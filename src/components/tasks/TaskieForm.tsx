import { IonButton, IonInput, IonItem, IonList } from "@ionic/react";
import { Loader } from "../shared/Loader";
import { useTaskieForm } from "../../hooks/tasks/useTaskieForm";

interface Props {
  isEdit?: boolean;
}

const TaskieForm = ({ isEdit = false }: Props) => {
  const {
    handleSubmit,
    title,
    setTitle,
    description,
    setDescription,
    isLoading,
    task,
  } = useTaskieForm(isEdit);

  if (isLoading) return <Loader />;

  if (isEdit && !task) {
    return (
      <div className="flex flex-col items-center gap-2 py-16">
        <h2 className="text-2xl font-semibold">Editar Tarea</h2>
        <p className="text-sm font-light">Tarea no encontrada.</p>
      </div>
    );
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-semibold">
        {isEdit ? "Editar Tarea" : "Crear Tarea"}
      </h2>

      <IonList>
        {/* Nombre */}
        <IonItem>
          <IonInput
            name="title"
            label="Nombre"
            labelPlacement="floating"
            placeholder="e.g. Estudiar"
            value={title}
            onIonInput={(e) => setTitle(e.detail.value ?? "")}
          ></IonInput>
        </IonItem>

        {/* Descripción */}
        <IonItem>
          <IonInput
            name="description"
            label="Descripción"
            labelPlacement="floating"
            placeholder="e.g. Estudiar Ionic para mejorar mis habilidades"
            value={description}
            onIonInput={(e) => setDescription(e.detail.value ?? "")}
          ></IonInput>
        </IonItem>
      </IonList>

      <IonButton type="submit" className="text-white">
        {isEdit ? "Guardar" : "Crear"}
      </IonButton>
    </form>
  );
};

export default TaskieForm;
