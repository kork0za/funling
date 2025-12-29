import React from "react";

export default function Main({ children }) {
  return (
    <main className="relative mx-auto w-full max-w-6xl px-4 pb-24 pt-10 md:px-8">
      {children}
    </main>
  );
}
