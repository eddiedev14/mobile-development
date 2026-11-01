import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

// Toma una foto y le dibuja `text` en una franja inferior. Devuelve la imagen como data URL.
// Lanza error si el usuario cancela la cámara.
export const takePhotoWithWatermark = async (text: string) => {
  const photo = await Camera.getPhoto({
    quality: 80,
    resultType: CameraResultType.DataUrl,
    source: CameraSource.Camera,
  });

  const img = new Image();
  img.src = photo.dataUrl!;
  await img.decode();

  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext('2d')!;
  ctx.drawImage(img, 0, 0);

  const size = Math.round(canvas.width / 25); // el texto escala con la foto
  ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
  ctx.fillRect(0, canvas.height - size * 2, canvas.width, size * 2);
  ctx.fillStyle = 'white';
  ctx.font = `${size}px sans-serif`;
  ctx.fillText(text, size / 2, canvas.height - size * 0.6);

  return canvas.toDataURL('image/jpeg', 0.9);
};
