// src/components/Banner.jsx
import React from "react";

export default function Banner() {
  return (
    <header
      style={{
        background: "linear-gradient(270deg, #0f172a, #1e293b, #0f172a)",
        backgroundSize: "600% 600%",
        animation: "spaceMove 12s ease infinite",
        color: "white",
        padding: "60px 20px",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", marginBottom: "12px" }}>
        🚀 SpaceX Capsules Explorer
      </h1>
      <p style={{ fontSize: "1.1rem", opacity: 0.8 }}>
        Discover all SpaceX missions, capsules, and launch history
      </p>

      {/* inline keyframes for animation */}
      <style>
        {`
          @keyframes spaceMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
    </header>
  );
}
