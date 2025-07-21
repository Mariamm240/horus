"use client";
import { useState } from "react";
import ContactoModal from "@/components/ui/contacto-modal";

interface ContactoModalProviderProps {
  children: React.ReactNode;
}

export default function ContactoModalProvider({ children }: ContactoModalProviderProps) {
  const [open, setOpen] = useState(false);

  // Contexto para handleContactoClick se puede agregar aquí si es necesario

  return (
    <>
      <ContactoModal open={open} setOpen={setOpen} />
      {/* Proveer la función a través de contexto si es necesario, o como prop */}
      {/* Aquí podrías usar React Context para pasar handleContactoClick a los headers */}
      {children}
    </>
  );
}
