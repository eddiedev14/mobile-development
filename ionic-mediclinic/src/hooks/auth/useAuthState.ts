import { useState } from "react";
import type { User } from "../../interfaces/user.interface";

export const useAuthState = () => {
  const [logged, setLogged] = useState<boolean>(() => {
    return localStorage.getItem("logged") === "true";
  });

  const [user, setUser] = useState<User | null>(() => {
    const userStored = localStorage.getItem("user");
    return userStored ? JSON.parse(userStored) : null;
  });

  const login = (user: User) => {
    setUser(user);
    setLogged(true);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("logged", "true");
  };

  const logout = () => {
    setUser(null);
    setLogged(false);
    localStorage.removeItem("user");
    localStorage.removeItem("logged");
  };

  return {
    logged,
    user,
    login,
    logout,
  };
};