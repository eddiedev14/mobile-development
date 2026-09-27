import { useNavigate } from "react-router-dom";
import { IonButton, IonIcon, IonItem, IonList } from "@ionic/react";
import { createOutline, trashOutline } from "ionicons/icons";
import { useFruits } from "../../hooks/fruits/useFruits";
import { useFruitList } from "../../hooks/fruits/useFruitList";

const FruitList = () => {
  const { fruits, totalFruits } = useFruits();
  const { openDeleteAlert } = useFruitList();
  const navigate = useNavigate();

  return (
    <IonList className="bg-base-300 rounded-md shadow-md">
      <IonItem>
        <div className="flex flex-col items-start">
          <h2 className="text-lg font-semibold tracking-wide">
            Lista de Frutas
          </h2>
          <p className="pb-2 text-sm">Total: {totalFruits}</p>
        </div>
      </IonItem>

      {fruits.map((fruit) => (
        <IonItem key={fruit.id}>
          <div className="flex w-full items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">{fruit.name}</h3>
              <p className="pb-4 text-xs font-medium opacity-60">
                Color: {fruit.color}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <IonButton
                shape="round"
                color="primary"
                className="size-8 flex items-center justify-center"
                onClick={() => navigate(`/fruits/edit/${fruit.id}`)}
              >
                <IonIcon slot="icon-only" icon={createOutline} />
              </IonButton>

              <IonButton
                shape="round"
                color="danger"
                className="size-8 flex items-center justify-center"
                onClick={() => openDeleteAlert(fruit)}
              >
                <IonIcon slot="icon-only" icon={trashOutline} />
              </IonButton>
            </div>
          </div>
        </IonItem>
      ))}
    </IonList>
  );
};

export default FruitList;
