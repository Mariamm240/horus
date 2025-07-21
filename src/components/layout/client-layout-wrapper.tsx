"use client";

import { useState } from "react";
import { ThemeProvider } from "next-themes";
import { SWRConfig } from 'swr';
import { Toaster as SonnerToaster } from "sonner";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import ContactoModal from "@/components/ui/contacto-modal";

interface ClientLayoutWrapperProps {
  children: React.ReactNode;
}

export default function ClientLayoutWrapper({ children }: ClientLayoutWrapperProps) {
  const [contactoOpen, setContactoOpen] = useState(false);

  return (
    <ThemeProvider
      attribute="data-theme"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <SWRConfig
        value={{
          errorRetryCount: 3,
          errorRetryInterval: 5000,
          revalidateOnFocus: false,
        }}
      >
        <Header onContactoClick={() => setContactoOpen(true)} />
        <ContactoModal open={contactoOpen} setOpen={setContactoOpen} />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <SonnerToaster 
          position="top-right"
          toastOptions={{
            style: {
              background: 'var(--color-card)',
              color: 'var(--color-card-foreground)',
              border: '1px solid var(--color-border)',
            },
          }}
        />
      </SWRConfig>
    </ThemeProvider>
  );
}
