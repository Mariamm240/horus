import React from "react";

export default function ServiciosLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      {/* Aquí puedes agregar un header, sidebar, etc. si lo necesitas */}
      {children}
    </div>
  );
}
