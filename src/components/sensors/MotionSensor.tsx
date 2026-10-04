import { useAccelerometer } from "../../hooks/sensors/useAccelerometer";

const MotionSensor = () => {
  const { acceleration, magnitude, isShaking, isMoving } = useAccelerometer({
    threshold: 18,
  });

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">Motion</h2>
      <p>X: {acceleration.x}</p>
      <p>Y: {acceleration.y}</p>
      <p>Z: {acceleration.z}</p>

      <p>Movimiento: {isMoving ? "Sí" : "No"}</p>
      <p>Magnitud: {magnitude.toFixed(2)}</p>
      {isShaking && <h3>SHAKE DETECTADO</h3>}
    </section>
  );
};

export default MotionSensor;
