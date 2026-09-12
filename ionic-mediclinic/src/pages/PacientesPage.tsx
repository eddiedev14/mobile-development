import { IonContent, IonItem, IonLabel, IonList, IonPage, IonText } from "@ionic/react";
import AppHeader from "../components/AppHeader";
import { useVisits } from "../hooks/visits/useVisits";
import type { Visit } from "../interfaces/visit.interface";

const PacientesPage = () => {
  const { visits } = useVisits();

  const patients = Array.from(
    visits
      .reduce((map, visit) => {
        if (!map.has(visit.cc)) map.set(visit.cc, visit);
        return map;
      }, new Map<string, Visit>())
      .values(),
  );

  return (
    <IonPage>
      <AppHeader />
      <IonContent fullscreen>
        <main className="max-w-2xl mx-auto p-4">
          <h2 className="text-2xl font-semibold">Pacientes</h2>

          {patients.length === 0 ? (
            <IonText color="medium" className="p-4">
              <p className="text-sm font-light text-center">
                Aún no hay pacientes registrados.
              </p>
            </IonText>
          ) : (
            <IonList className="mt-2">
              {patients.map((patient) => (
                <IonItem key={patient.cc}>
                  <IonLabel>
                    <h3>
                      {patient.patientName} {patient.patientLastname}
                    </h3>
                    <p>Cédula: {patient.cc}</p>
                    <p>Teléfono: {patient.phone}</p>
                  </IonLabel>
                </IonItem>
              ))}
            </IonList>
          )}
        </main>
      </IonContent>
    </IonPage>
  );
};

export default PacientesPage;