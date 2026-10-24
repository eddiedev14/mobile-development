import type { User } from '../interfaces/user.interface';

//? Lo que se guarda por usuario: { points, missions }
type UserProgress = Pick<User, 'points' | 'missions'>;

//? Una clave por usuario para que el progreso de distintas cuentas no se mezcle
const keyFor = (uid: string) => `parcial-02:progress:${uid}`;

export const getLocalProgress = (uid: string): UserProgress | null => {
  try {
    const raw = localStorage.getItem(keyFor(uid));
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    if (typeof parsed?.points !== 'number' || !Array.isArray(parsed?.missions)) {
      return null;
    }

    return parsed as UserProgress;
  } catch {
    //? localStorage bloqueado o JSON dañado: se trata como si no hubiera nada guardado
    return null;
  }
};

export const saveLocalProgress = (uid: string, progress: UserProgress) => {
  try {
    localStorage.setItem(keyFor(uid), JSON.stringify(progress));
  } catch {
    //? Sin espacio o localStorage bloqueado: el progreso igual queda en Firestore
  }
};
