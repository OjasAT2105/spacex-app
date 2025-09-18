// src/components/SearchForm.jsx
import { useContext, useState, useEffect } from "react";
import { DataContext } from "../context/DataContext";

export default function SearchForm() {
  const { filters, setFilters } = useContext(DataContext);
  const [local, setLocal] = useState(filters);

  useEffect(() => setLocal(filters), [filters]);

  useEffect(() => {
    const t = setTimeout(() => setFilters(local), 300);
    return () => clearTimeout(t);
  }, [local, setFilters]);

  return (
    <form className="flex flex-wrap gap-3 items-center py-4">
      {/* ✅ Capsule Type dropdown */}
      <select
        value={local.type}
        onChange={(e) => setLocal({ ...local, type: e.target.value })}
        className="border rounded p-2 flex-1 min-w-[150px] bg-gray-900 text-white"
      >
        <option value="">All Types</option>
        <option value="dragon1">Dragon 1</option>
        <option value="dragon2">Dragon 2</option>
        <option value="cargo">Cargo</option>
        <option value="crew">Crew</option>
      </select>

      {/* ✅ Status dropdown */}
      <select
        value={local.status}
        onChange={(e) => setLocal({ ...local, status: e.target.value })}
        className="border rounded p-2 min-w-[120px] bg-gray-900 text-white"
      >
        <option value="">All Status</option>
        <option value="active">Active</option>
        <option value="retired">Retired</option>
        <option value="unknown">Unknown</option>
        <option value="destroyed">Destroyed</option>
      </select>

      {/* ✅ Launch date picker */}
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
