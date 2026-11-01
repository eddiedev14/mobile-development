import { OpenCageResponse } from '../interfaces/opencage.interface';

const API_KEY = import.meta.env.VITE_OPENCAGE_API_KEY;

export const getAddress = async (
  lat: number,
  lng: number,
): Promise<OpenCageResponse> => {
  const res = await fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${API_KEY}`,
  );
  const data = (await res.json()) as OpenCageResponse;
  return data;
};
