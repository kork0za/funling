import React from "react";

export default function Airhead({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Airhead character"
    >
      <path
        d="M40 92c0-30 18-52 40-52s40 22 40 52-18 52-40 52S40 122 40 92Z"
        fill="white"
        stroke="#0F74A6"
        strokeWidth="5"
      />
      <circle cx="66" cy="86" r="12" fill="white" stroke="#0F74A6" strokeWidth="5" />
      <circle cx="104" cy="86" r="12" fill="white" stroke="#0F74A6" strokeWidth="5" />
      <circle cx="68" cy="88" r="4" fill="#0F74A6" />
      <circle cx="106" cy="88" r="4" fill="#0F74A6" />
      <path
        d="M68 112c10 10 26 10 36 0"
        stroke="#0F74A6"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M78 116c0 8-10 12-16 8"
        stroke="#0F74A6"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}
