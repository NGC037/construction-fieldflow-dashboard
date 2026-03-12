/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { PROJECTS } from "../../constants/projects.js";

const STORAGE_KEY = "fieldflow_dprs";

const DprContext = createContext(null);

function readStoredDprs() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

function writeStoredDprs(dprs) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dprs));
  } catch {
    // ignore
  }
}

export function DprProvider({ children }) {
  const [dprs, setDprs] = useState(() => readStoredDprs());

  useEffect(() => {
    writeStoredDprs(dprs);
  }, [dprs]);

  const addDpr = useCallback((input) => {
    setDprs((prev) => [...prev, input]);
  }, []);

  const getDprById = useCallback((id) => {
    return dprs.find((d) => d.id === id) || null;
  }, [dprs]);

  const stats = useMemo(() => {
    const total = dprs.length;
    return { total };
  }, [dprs]);

  const value = useMemo(
    () => ({
      dprs,
      addDpr,
      getDprById,
      stats,
    }),
    [dprs, stats, addDpr, getDprById],
  );

  return <DprContext.Provider value={value}>{children}</DprContext.Provider>;
}

export function useDprs() {
  const ctx = useContext(DprContext);
  if (!ctx) throw new Error("useDprs must be used within DprProvider");
  return ctx;
}

