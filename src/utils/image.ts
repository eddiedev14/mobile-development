//? Convierte la ruta de una foto (blob:, file o capacitor://) en un data URL JPEG reducido.
//? La ruta de la cámara no sobrevive a una recarga y una foto completa no cabe en
//? localStorage (~5 MB), por eso se guarda la imagen reducida y no la ruta.
export const photoToDataUrl = async (
  path: string,
  maxWidth = 800,
  quality = 0.6,
): Promise<string> => {
  const blob = await (await fetch(path)).blob();
  const bitmap = await createImageBitmap(blob, {
    imageOrientation: 'from-image',
  });

  const scale = Math.min(1, maxWidth / bitmap.width);
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);

  canvas.getContext('2d')!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();

  return canvas.toDataURL('image/jpeg', quality);
};
