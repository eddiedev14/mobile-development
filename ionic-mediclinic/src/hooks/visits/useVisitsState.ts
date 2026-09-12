import { useState } from "react";
import { initialVisits } from "../../data/visits.data";
import type { Visit, VisitStatus } from "../../interfaces/visit.interface";
import { todayISO } from "../../utils/date.util";

export const useVisitsState = () => {
  const [visits, setVisits] = useState<Visit[]>(() => {
    const today = todayISO();
    const visitsStored = localStorage.getItem("visits");
    const base = visitsStored
      ? (JSON.parse(visitsStored) as Visit[])
      : initialVisits;

    const visitsWithToday = base.map((visit, index) => ({
      ...visit,
      id: visit.id ?? Date.now() + index,
      status: visit.status ?? "pendiente",
      date: today,
    }));

    localStorage.setItem("visits", JSON.stringify(visitsWithToday));
    return visitsWithToday;
  });

  const todayVisits = visits.filter((visit) => visit.date === todayISO());

  const updateVisitStatus = (id: number, status: VisitStatus) => {
    setVisits((prev) => {
      const updatedVisits = prev.map((visit) =>
        visit.id === id ? { ...visit, status } : visit,
      );
      localStorage.setItem("visits", JSON.stringify(updatedVisits));
      return updatedVisits;
    });
  };

  return {
    visits,
    todayVisits,
    updateVisitStatus,
  };
};