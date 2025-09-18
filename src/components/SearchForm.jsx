// src/components/SearchForm.jsx
import { useContext, useState, useEffect, useMemo } from "react";
import { DataContext } from "../context/DataContext";

export default function SearchForm() {
  const { filters, setFilters, capsules } = useContext(DataContext);
  const [local, setLocal] = useState(filters);

  useEffect(() => setLocal(filters), [filters]);

  useEffect(() => {
    const t = setTimeout(() => setFilters(local), 300);
    return () => clearTimeout(t);
  }, [local, setFilters]);

  //  Dynamically extract unique types & statuses from capsules
  const types = useMemo(() => {
    return [...new Set(capsules.map((c) => c.type).filter(Boolean))];
  }, [capsules]);

  const statuses = useMemo(() => {
    return [...new Set(capsules.map((c) => c.status).filter(Boolean))];
  }, [capsules]);

  return (
    <form className="flex flex-wrap gap-3 items-center py-4">
      {/*  Capsule Type dropdown */}
      <select
        value={local.type}
        onChange={(e) => setLocal({ ...local, type: e.target.value })}
        className="border rounded p-2 flex-1 min-w-[150px] bg-gray-900 text-white"
      >
        <option value="">All Types</option>
        {types.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>

      {/*  Status dropdown */}
      <select
        value={local.status}
        onChange={(e) => setLocal({ ...local, status: e.target.value })}
        className="border rounded p-2 min-w-[120px] bg-gray-900 text-white"
      >
        <option value="">All Status</option>
        {statuses.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      {/*  Launch date picker */}
      <input
        type="date"
        value={local.launch}
        onChange={(e) => setLocal({ ...local, launch: e.target.value })}
        className="border rounded p-2 bg-gray-900 text-white"
      />

      <button
        type="button"
        onClick={() => {
          setLocal({ type: "", status: "", launch: "" });
          setFilters({ type: "", status: "", launch: "" });
        }}
        className="ml-auto text-sm text-gray-300 hover:text-white"
      >
        Clear
      </button>
    </form>
  );
}
