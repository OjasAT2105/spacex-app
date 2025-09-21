// src/components/DataGrid.jsx
import { useState } from "react";
import Popup from "./Popup";

export default function DataGrid({
  data = [],
  total,
  page,
  pageCount,
  onPageChange,
}) {
  const [selected, setSelected] = useState(null);

  return (
    <section style={{ padding: "20px", background: "#0b1120", color: "white" }}>
      {/* Results info */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "12px",
        }}
      >
        <p>Showing {total} results</p>
        <p>
          Page {page} / {pageCount}
        </p>
      </div>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gap: "16px",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        }}
      >
        {data.map((c) => (
          <article
            key={c.id}
            onClick={() => setSelected(c)}
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
              {c.capsule_serial}
            </h4>
            <p>Type: {c.type}</p>
            <p>Status: {c.status}</p>
            <p style={{ fontSize: "14px", marginTop: "6px", color: "#94a3b8" }}>
              {c.original_launch
                ? new Date(c.original_launch).toLocaleDateString()
                : "No launch"}
            </p>
          </article>
        ))}
      </div>

      {/* Pagination */}
      <div style={{ marginTop: "16px", textAlign: "center" }}>
        <button
          onClick={() => onPageChange(Math.max(1, page - 1))}
          disabled={page === 1}
        >
          Prev
        </button>

        {[...Array(pageCount)].map((_, i) => {
          const pageNum = i + 1;
          return (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              style={{
                margin: "0 4px",
                padding: "6px 10px",
                borderRadius: "6px",
                background: pageNum === page ? "#3b82f6" : "#1e293b",
                color: "white",
                border: "1px solid #334155",
              }}
            >
              {pageNum}
            </button>
          );
        })}

        <button
          onClick={() => onPageChange(Math.min(pageCount, page + 1))}
          disabled={page === pageCount}
        >
          Next
        </button>
      </div>

      {/* Popup */}
      {selected && <Popup data={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
