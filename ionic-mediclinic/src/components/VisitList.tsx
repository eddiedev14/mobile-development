import { IonBadge, IonItem, IonLabel, IonList, IonText } from "@ionic/react";
import { visitStatusLabels } from "../constants/visit.constant";
import { useVisits } from "../hooks/visits/useVisits";
import type { VisitStatus } from "../interfaces/visit.interface";

const statusBadgeColor: Record<VisitStatus, string> = {
  pendiente: "warning",
  en_camino: "primary",
  finalizada: "success",
};

const VisitList = () => {
  const { todayVisits } = useVisits();

  return (
    <div>
      <h2 className="text-2xl font-semibold">Visitas del día</h2>

      {todayVisits.length === 0 ? (
        <IonText color="medium" className="p-4">
          <p className="text-sm font-light text-center">
            No hay visitas programadas para hoy.
          </p>
        </IonText>
      ) : (
        <IonList className="mt-2">
          {todayVisits.map((visit) => (
            <IonItem key={visit.id} routerLink={`/visitas/${visit.id}`}>
              <IonLabel>
                <h3>
                  {visit.patientName} {visit.patientLastname}
                </h3>
                <p>
                  {visit.time} · {visit.reason}
                </p>
              </IonLabel>
              <IonBadge
                color={statusBadgeColor[visit.status]}
                slot="end"
                className="p-2"
              >
                {visitStatusLabels[visit.status]}
              </IonBadge>
            </IonItem>
          ))}
        </IonList>
      )}
    </div>
  );
};

export default VisitList;
