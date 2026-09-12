import { useParams } from "react-router-dom";
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { visitStatusLabels } from "../constants/visit.constant";
import { useToast } from "../hooks/toast/useToast";
import { useVisits } from "../hooks/visits/useVisits";
import type { VisitStatus } from "../interfaces/visit.interface";

const VisitDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { visits, updateVisitStatus } = useVisits();
  const { showToast } = useToast();

  const visit = visits.find((visit) => visit.id === Number(id));

  if (!visit) {
    return (
      <IonPage>
        <IonContent fullscreen>
          <div className="min-h-screen flex items-center justify-center">
            <IonText color="medium">
              <p className="text-sm font-light">Visita no encontrada.</p>
            </IonText>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  const handleStatusChange = (newStatus: VisitStatus) => {
    updateVisitStatus(visit.id, newStatus);
    showToast(
      `Estado actualizado a ${visitStatusLabels[newStatus]}.`,
      "success",
    );
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/visitas" />
          </IonButtons>
          <IonTitle>Detalle de Visita</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <main className="max-w-2xl mx-auto p-4">
          <h2 className="text-2xl font-semibold">
            {visit.patientName} {visit.patientLastname}
          </h2>

          <IonList className="mt-4">
            <IonItem>
              <IonLabel>Cédula: {visit.cc}</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Teléfono: {visit.phone}</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>
                Fecha: {visit.date} · Hora: {visit.time}
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Motivo: {visit.reason}</IonLabel>
            </IonItem>
          </IonList>

          <h3 className="text-lg font-semibold mt-6 mb-2">
            Estado de la visita
          </h3>
          <IonSegment
            value={visit.status}
            onIonChange={(e) =>
              handleStatusChange(e.detail.value as VisitStatus)
            }
          >
            <IonSegmentButton value="pendiente">
              {visitStatusLabels.pendiente}
            </IonSegmentButton>
            <IonSegmentButton value="en_camino">
              {visitStatusLabels.en_camino}
            </IonSegmentButton>
            <IonSegmentButton value="finalizada">
              {visitStatusLabels.finalizada}
            </IonSegmentButton>
          </IonSegment>
        </main>
      </IonContent>
    </IonPage>
  );
};

export default VisitDetailPage;