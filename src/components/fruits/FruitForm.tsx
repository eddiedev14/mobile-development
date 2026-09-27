import { IonButton, IonInput, IonItem, IonList } from "@ionic/react";
import { Loader } from "../shared/Loader";
import { useFruitForm } from "../../hooks/fruits/useFruitForm";

interface Props {
  isEdit?: boolean;
}

const FruitForm = ({ isEdit = false }: Props) => {
  const { name, color, fruit, isLoading, handleSubmit, setName, setColor } =
    useFruitForm(isEdit);

  if (isLoading) return <Loader />;

  if (isEdit && !fruit) {
    return (
      <div className="flex flex-col items-center gap-2 py-16">
        <h2 className="text-2xl font-semibold">Editar Fruta</h2>
        <p className="text-sm font-light">Fruta no encontrada.</p>
      </div>
    );
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-semibold">
        {isEdit ? "Editar Fruta" : "Crear Fruta"}
      </h2>

      <IonList>
        {/* Nombre */}
        <IonItem>
          <IonInput
            name="name"
            label="Nombre"
            labelPlacement="floating"
            placeholder="e.g. Manzana"
            value={name}
            onIonInput={(e) => setName(e.detail.value ?? "")}
          ></IonInput>
        </IonItem>

        {/* Color */}
        <IonItem>
          <IonInput
            name="color"
            label="Color"
            labelPlacement="floating"
            placeholder="e.g. Roja"
            value={color}
            onIonInput={(e) => setColor(e.detail.value ?? "")}
          ></IonInput>
        </IonItem>
      </IonList>

      <IonButton type="submit" className="text-white">
        {isEdit ? "Guardar" : "Crear"}
      </IonButton>
    </form>
  );
};

export default FruitForm;
