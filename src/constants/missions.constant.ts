import { cameraOutline, locationOutline, timerOutline } from 'ionicons/icons';
import type { MissionDefinition } from '../interfaces/mission.interface';

//? Distancia (en metros) que se debe mover el usuario para la misión 2
const MOVE_DISTANCE_METERS = 50;

//? Segundos que el usuario debe permanecer quieto en la misión 3
const STILL_SECONDS = 10;

const MISSIONS: MissionDefinition[] = [
  {
    id: 1,
    title: 'Evidencia',
    description: 'Toma una foto con la cámara y guárdala.',
    points: 50,
    icon: cameraOutline,
    actionLabel: 'Tomar foto',
  },
  {
    id: 2,
    title: 'Movimiento real',
    description: `Muévete más de ${MOVE_DISTANCE_METERS} metros desde tu posición original.`,
    points: 40,
    icon: locationOutline,
    actionLabel: 'Empezar a moverme',
  },
  {
    id: 3,
    title: 'Permanencia activa',
    description: `Quédate quieto ${STILL_SECONDS} segundos. Al terminar, tu celular vibrará.`,
    points: 30,
    icon: timerOutline,
    actionLabel: 'Quedarme quieto',
    unlockedBy: 2,
  },
];

export { MISSIONS, MOVE_DISTANCE_METERS, STILL_SECONDS };
