import { useEffect, useState } from "react";

export const useLoader = () => {
  //* States
  const [loading, setLoading] = useState(true);

  //* Effects
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return {
    loading,
  };
};
