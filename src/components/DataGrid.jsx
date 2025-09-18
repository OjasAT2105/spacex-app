// src/components/DataGrid.jsx
import { useState } from "react";
import Popup from "./Popup";

export default function DataGrid({ data = [], loading, error }) {
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);
  const perPage = 10;

  // pagination
  const pageCount = Math.max(1, Math.ceil(data.length / perPage));
  if (page > pageCount) setPage(1);

  const pageItems = data.slice((page - 1) * perPage, page * perPage);

  // loading / error states
  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <section style={{ padding: "20px", background: "#0b1120", color: "white" }}>
      {/* Results Info */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "12px",
        }}
      >
        <p>Showing {data.length} results</p>
        <p>
          Page {page} / {pageCount}
        </p>
      </div>

      {/* Data Grid */}
      <div
        style={{
          display: "grid",
          gap: "16px",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        }}
      >
        {pageItems.map((item) => (
          <article
            key={item.id || item.capsule_serial}
            onClick={() => setSelected(item)}
            style={{
              border: "1px solid #334155",
              borderRadius: "12px",
              padding: "16px",
              cursor: "pointer",
              background: "#1e293b",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.boxShadow =
                "0 0 15px rgba(59, 130, 246, 0.5)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
          >
            <h4 style={{ fontSize: "18px", marginBottom: "6px" }}>
              {item.capsule_serial || item.name || "No Title"}
            </h4>
            <p>Type: {item.type || "N/A"}</p>
            <p>Status: {item.status || "N/A"}</p>
            <p style={{ fontSize: "14px", marginTop: "6px", color: "#94a3b8" }}>
              {item.original_launch
                ? new Date(item.original_launch).toLocaleDateString()
                : item.first_flight
                ? new Date(item.first_flight).toLocaleDateString()
                : "No date"}
            </p>
          </article>
        ))}
      </div>

      {/* Pagination Buttons */}
      <div style={{ marginTop: "16px", textAlign: "center" }}>
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          style={{ marginRight: "8px" }}
        >
          Prev
        </button>
        <button onClick={() => setPage(page + 1)} disabled={page === pageCount}>
          Next
        </button>
      </div>

      {/* Popup */}
      {selected && (
        <Popup
          data={{
            ...selected,
            last_updated: new Date().toLocaleString(),
          }}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  );
}
