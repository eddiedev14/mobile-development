//? Una clave por usuario para que la foto de una cuenta no aparezca en otra
const keyFor = (uid: string) => `parcial-02:photo:${uid}`;

export const getLocalPhoto = (uid: string): string | null => {
  try {
    return localStorage.getItem(keyFor(uid));
  } catch {
    return null;
  }
};

//? Devuelve false si no se pudo guardar (localStorage lleno o bloqueado)
export const saveLocalPhoto = (uid: string, dataUrl: string): boolean => {
  try {
    localStorage.setItem(keyFor(uid), dataUrl);
    return true;
  } catch {
    return false;
  }
};
