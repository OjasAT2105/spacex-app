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
    <form className="flex flex-wrap gap-4 items-center py-6 bg-[#111827] rounded-xl px-5 shadow-lg">
      <input
        placeholder="Type"
        value={local.type}
        onChange={(e) => setLocal({ ...local, type: e.target.value })}
        className="flex-1 min-w-[150px] px-3 py-2 rounded-lg bg-[#1f2937] text-white placeholder-gray-400 border border-gray-700 focus:border-indigo-500 focus:ring focus:ring-indigo-500/30 outline-none transition"
      />
      <input
        placeholder="Status"
        value={local.status}
        onChange={(e) => setLocal({ ...local, status: e.target.value })}
        className="min-w-[120px] px-3 py-2 rounded-lg bg-[#1f2937] text-white placeholder-gray-400 border border-gray-700 focus:border-indigo-500 focus:ring focus:ring-indigo-500/30 outline-none transition"
      />
      <input
        type="date"
        value={local.launch}
        onChange={(e) => setLocal({ ...local, launch: e.target.value })}
        className="px-3 py-2 rounded-lg bg-[#1f2937] text-white placeholder-gray-400 border border-gray-700 focus:border-indigo-500 focus:ring focus:ring-indigo-500/30 outline-none transition"
      />
      <button
        type="button"
        onClick={() => {
          setLocal({ type: "", status: "", launch: "" });
          setFilters({ type: "", status: "", launch: "" });
        }}
        className="ml-auto px-4 py-2 text-sm font-medium rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md hover:from-indigo-600 hover:to-purple-700 transition"
      >
        Clear
      </button>
    </form>
  );
}
