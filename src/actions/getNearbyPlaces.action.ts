import { OpenCageResponse, Result } from '../interfaces/opencage.interface';
import { metersBetween } from '../utils/distance';

const API_KEY = import.meta.env.VITE_OPENCAGE_API_KEY;
export const RADIUS_KM = 3;

export const getNearbyPlaces = async (
  query: string,
  lat: number,
  lng: number,
): Promise<Result[]> => {
  // Cuadro alrededor de la posición: 1° de latitud ≈ 111 km; el de longitud se encoge con cos(lat)
  const dLat = RADIUS_KM / 111;
  const dLng = RADIUS_KM / (111 * Math.cos((lat * Math.PI) / 180));
  const bounds = `${lng - dLng},${lat - dLat},${lng + dLng},${lat + dLat}`;

  const res = await fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(query)}&proximity=${lat},${lng}&bounds=${bounds}&limit=50&no_annotations=1&key=${API_KEY}`,
  );
  const data = (await res.json()) as OpenCageResponse;

  const distance = (r: Result) =>
    metersBetween([lat, lng], [r.geometry.lat, r.geometry.lng]);

  return (data.results ?? [])
    .filter((r) => distance(r) <= RADIUS_KM * 1000)
    .sort((a, b) => distance(a) - distance(b));
};
