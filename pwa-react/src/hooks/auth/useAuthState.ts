import { useState } from "react";

export const useAuthState = () => {
  const [logged, setLogged] = useState<boolean>(() => {
    return localStorage.getItem("logged") === "true";
  });

  const login = () => {
    setLogged(true);
    localStorage.setItem("logged", "true");
  };

  const logout = () => {
    setLogged(false);
    localStorage.removeItem("logged");
  };

  return {
    logged,
    login,
    logout,
  };
};
