"use client";
import { useState } from "react";
import { Dialog } from "@headlessui/react";

export default function ContactoModal({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) {
  return (
    <Dialog open={open} onClose={() => setOpen(false)} className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
      <div className="relative bg-white rounded-2xl shadow-xl max-w-lg w-full p-8">
        <Dialog.Title className="text-2xl font-bold text-purple-700 mb-4 text-center">Contacto Profesional</Dialog.Title>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre completo</label>
            <input type="text" className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Correo electrónico</label>
            <input type="email" className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Teléfono</label>
            <input type="tel" className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Mensaje</label>
            <textarea className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500" rows={4} required />
          </div>
          <button type="submit" className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors">Enviar mensaje</button>
        </form>
        <button onClick={() => setOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-purple-600 text-xl">×</button>
      </div>
    </Dialog>
  );
}
