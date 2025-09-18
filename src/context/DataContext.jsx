// src/context/DataContext.jsx
import React, { createContext, useState, useEffect } from "react";
import { fetchCapsules } from "../services/spacexApi";

export const DataContext = createContext();

export function DataProvider({ children }) {
  const [capsules, setCapsules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // filters: type, status, launch (YYYY-MM-DD string)
  const [filters, setFilters] = useState({ type: "", status: "", launch: "" });

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      try {
        const data = await fetchCapsules();
        if (mounted) setCapsules(data);
      } catch (err) {
        if (mounted) setError(err.message || "Failed to fetch");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <DataContext.Provider
      value={{ capsules, setCapsules, loading, error, filters, setFilters }}
    >
      {children}
    </DataContext.Provider>
  );
}
