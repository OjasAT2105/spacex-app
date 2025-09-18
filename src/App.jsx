import { useContext, useState, useMemo } from "react";
import Banner from "./components/Banner";
import SearchForm from "./components/SearchForm";
import DataGrid from "./components/DataGrid";
import { DataContext } from "./context/DataContext";

function App() {
  const { capsules, loading, error, filters } = useContext(DataContext);
  const [page, setPage] = useState(1);
  const perPage = 10;

  // Filtered data
  const filtered = useMemo(() => {
    if (!capsules) return [];
    return capsules.filter((c) => {
      if (
        filters.type &&
        !(c.type || "").toLowerCase().includes(filters.type.toLowerCase())
      )
        return false;
      if (
        filters.status &&
        !(c.status || "").toLowerCase().includes(filters.status.toLowerCase())
      )
        return false;
      if (filters.launch) {
        if (!c.original_launch) return false;
        if (!c.original_launch.startsWith(filters.launch)) return false;
      }
      return true;
    });
  }, [capsules, filters]);

  // Pagination
  const pageCount = Math.max(1, Math.ceil(filtered.length / perPage));
  if (page > pageCount) setPage(1);
  const pageItems = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <main className="min-h-screen bg-[#0b1120] text-white">
      {/* Banner is always shown */}
      <Banner />

      <div className="max-w-6xl mx-auto px-4">
        <SearchForm />

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}

        {!loading && !error && (
          <DataGrid
            data={pageItems}
            total={filtered.length}
            page={page}
            pageCount={pageCount}
            onPageChange={setPage}
          />
        )}
      </div>
    </main>
  );
}

export default App;
