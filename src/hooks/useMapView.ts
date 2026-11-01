import { useEffect, useState } from 'react';
import { useGeolocation } from '../hooks/sensors/useGeolocation';
import { OpenCageResponse } from '../interfaces/opencage.interface';
import { getAddress } from '../actions/getAddress.action';

export const useMapView = () => {
  const { position, getCurrentLocation, startTracking, stopTracking } =
    useGeolocation();
  const [coordinates, setCoordinates] = useState<[number, number][]>([]);
  const [address, setAddress] = useState<OpenCageResponse | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  useEffect(() => {
    if (position) {
      setReady(true);
      setCoordinates((prev) => [
        ...prev,
        [position.coords.latitude, position.coords.longitude],
      ]);
    }
  }, [position]);

  const handleGetAddress = async () => {
    if (!position) return;
    const address = await getAddress(
      position?.coords.latitude,
      position?.coords.longitude,
    );
    setAddress(address);
  };

  return {
    position,
    coordinates,
    address,
    ready,
    startTracking,
    stopTracking,
    handleGetAddress,
  };
};
