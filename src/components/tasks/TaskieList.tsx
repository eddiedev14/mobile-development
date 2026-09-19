import { useNavigate } from "react-router-dom";
import {
  IonButton,
  IonCheckbox,
  IonIcon,
  IonItem,
  IonList,
} from "@ionic/react";
import { createOutline, trashOutline } from "ionicons/icons";
import { useTaskie } from "../../hooks/tasks/useTaskie";
import { useTaskieList } from "../../hooks/tasks/useTaskieList";

const TaskieList = () => {
  const { tasks, totalTasks, totalCompleted, toggleComplete } = useTaskie();
  const { openDeleteAlert } = useTaskieList();
  const navigate = useNavigate();

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
            <span
              className="text-sm font-medium w-96 truncate cursor-pointer hover:underline"
              onClick={() => navigate(`/tasks/${task.id}`)}
            >
              {task.name}
            </span>

            <div className="flex items-center gap-4">
              <IonCheckbox
                checked={task.completed}
                onIonChange={() => toggleComplete(task.id)}
              ></IonCheckbox>

              <IonButton
                shape="round"
                color="primary"
                className="size-8 flex items-center justify-center"
                routerLink={`/edit/${task.id}`}
              >
                <IonIcon slot="icon-only" icon={createOutline} />
              </IonButton>

              <IonButton
                shape="round"
                color="danger"
                className="size-8 flex items-center justify-center"
                onClick={() => openDeleteAlert(task)}
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
