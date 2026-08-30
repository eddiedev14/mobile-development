import {
  IonButton,
  IonCheckbox,
  IonIcon,
  IonItem,
  IonList,
} from "@ionic/react";
import { trashOutline } from "ionicons/icons";
import { useTaskie } from "../hooks/useTaskie";
import { useAlert } from "../hooks/useAlert";

const TaskieList = () => {
  const { tasks, totalTasks, totalCompleted, toggleComplete } = useTaskie();
  const { updateAlertData } = useAlert();

  return (
    <IonList className="bg-base-300 rounded-md shadow-md">
      <IonItem>
        <div className="flex flex-col items-start">
          <h2 className="text-lg font-semibold tracking-wide">
            Lista de Tareas
          </h2>
          <p className="pb-2 text-sm">
            Total: {totalTasks} | Completadas:{" "}
            {`${totalCompleted}/${totalTasks}`}
          </p>
        </div>
      </IonItem>

      {tasks.map((task) => (
        <IonItem key={task.id}>
          <div className="flex w-full items-center justify-between">
            <h3 className="text-sm font-medium w-96 truncate">{task.name}</h3>

            <div className="flex items-center gap-4">
              <IonCheckbox
                checked={task.completed}
                onIonChange={() => toggleComplete(task.id)}
              ></IonCheckbox>

              <IonButton
                shape="round"
                color="danger"
                className="size-8 flex items-center justify-center"
                onClick={() =>
                  updateAlertData({
                    id: task.id,
                    name: task.name,
                  })
                }
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

export default TaskieList;
