// src/components/Popup.jsx
import React from "react";

export default function Popup({ data, onClose }) {
  // Fallback placeholder if no image available
  const imageUrl =
    data?.links?.mission_patch ||
    "https://via.placeholder.com/300x200.png?text=No+Image";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl p-6 max-w-lg w-full relative animate-fadeIn">
        {/* Close button */}
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-black"
          onClick={onClose}
        >
          ✖
        </button>

        {/* Image */}
        <img
          src={imageUrl}
          alt="Capsule / Mission"
          className="w-full h-48 object-contain mb-4 rounded"
        />

        {/* Details */}
        <h3 className="text-xl font-semibold mb-2">{data.capsule_serial}</h3>
        <p className="text-gray-600">Type: {data.type}</p>
        <p className="text-gray-600">Status: {data.status}</p>
        <p className="text-gray-500 mt-2">
          {data.original_launch
            ? new Date(data.original_launch).toLocaleDateString()
            : "No launch date"}
        </p>

        {/* Last update */}
        <p className="text-sm text-gray-700 mt-4 italic">
          Last Update: {data.last_update ? data.last_update : "No update info"}
        </p>
      </div>
    </div>
  );
}
