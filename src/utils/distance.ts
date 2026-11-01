// Distancia en metros entre dos puntos [lat, lng] (fórmula de Haversine)
export const metersBetween = (
  [lat1, lng1]: [number, number],
  [lat2, lng2]: [number, number],
): number => {
  const rad = (deg: number) => (deg * Math.PI) / 180;
  const a =
    Math.sin(rad(lat2 - lat1) / 2) ** 2 +
    Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(rad(lng2 - lng1) / 2) ** 2;
  return 2 * 6371000 * Math.asin(Math.sqrt(a));
};
