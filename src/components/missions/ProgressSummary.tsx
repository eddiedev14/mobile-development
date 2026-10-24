import { IonProgressBar } from "@ionic/react";

interface Props {
  totalPoints: number;
  completedCount: number;
  totalCount: number;
  percent: number;
}

//? Puntos acumulados + barra de progreso (% y misiones completadas / total)
const ProgressSummary = ({
  totalPoints,
  completedCount,
  totalCount,
  percent,
}: Props) => {
  return (
    <section className="flex flex-col gap-2 px-4">
      <p>Puntos: {totalPoints}</p>
      <IonProgressBar value={percent / 100} />
      <p className="text-sm">
        {completedCount} de {totalCount} misiones completadas (
        {Math.round(percent)}%)
      </p>
    </section>
  );
};

export default ProgressSummary;
