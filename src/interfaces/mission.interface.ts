export type MissionStatus = 'pending' | 'completed' | 'locked';

//? Definición estática de una misión
export interface MissionDefinition {
  id: number;
  title: string;
  description: string;
  points: number;
  icon: string;
  actionLabel: string;
  //? Id de la misión que debe completarse antes de habilitar esta
  unlockedBy?: number;
}

//? Lo que se persiste por misión (Firebase)
export interface MissionProgress {
  id: number;
  completed: boolean;
}

//? Misión lista para pintar en la UI
export interface MissionView extends MissionDefinition {
  status: MissionStatus;
}

export type GeneralStatus = 'not-started' | 'in-progress' | 'completed';

export interface RankingEntry {
  id: string;
  username: string;
  points: number;
}
