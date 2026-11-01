import { Directory, Encoding, Filesystem } from '@capacitor/filesystem';

export interface TrackSession {
  startedAt: string; // ISO
  endedAt: string; // ISO
  coordinates: [number, number][];
}

const DIR = 'tracking';
const dayPath = (day: string) => `${DIR}/${day}.json`;

// Día local (YYYY-MM-DD). toISOString usaría UTC y movería de día las sesiones de la noche
export const localDay = (date: Date) => date.toLocaleDateString('en-CA');

export const readDay = async (day: string): Promise<TrackSession[]> => {
  try {
    const file = await Filesystem.readFile({
      path: dayPath(day),
      directory: Directory.Data,
      encoding: Encoding.UTF8,
    });
    return JSON.parse(file.data as string);
  } catch {
    return []; // el archivo del día aún no existe
  }
};

// Agrega la sesión al archivo JSON del día en que empezó
export const saveSession = async (session: TrackSession) => {
  if (session.coordinates.length < 2) return; // un solo punto no es un recorrido
  const day = localDay(new Date(session.startedAt));
  const sessions = await readDay(day);

  await Filesystem.writeFile({
    path: dayPath(day),
    directory: Directory.Data,
    encoding: Encoding.UTF8,
    recursive: true,
    data: JSON.stringify([...sessions, session]),
  });
};

// Días con tracking guardado, del más reciente al más antiguo
export const listDays = async (): Promise<string[]> => {
  try {
    const { files } = await Filesystem.readdir({
      path: DIR,
      directory: Directory.Data,
    });
    return files
      .map((f) => f.name.replace('.json', ''))
      .sort()
      .reverse();
  } catch {
    return []; // la carpeta aún no existe
  }
};
