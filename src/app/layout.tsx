import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "../styles/themes.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Toaster as SonnerToaster } from "sonner";
import { ThemeProvider } from "next-themes";
import { SWRConfig } from 'swr';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Horus Optic - Lentes de Contacto Premium",
  description: "Tu óptica de confianza especializada en lentes de contacto premium. Suscripciones personalizadas y entrega gratuita.",
  keywords: "lentes de contacto, óptica, visión, suscripción lentes, lentes premium",
  authors: [{ name: "Horus Optic" }],
  openGraph: {
    title: "Horus Optic - Lentes de Contacto Premium",
    description: "Tu óptica de confianza especializada en lentes de contacto premium. Suscripciones personalizadas y entrega gratuita.",
    url: "https://horusoptic.com",
    siteName: "Horus Optic",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Horus Optic - Lentes de Contacto Premium",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Horus Optic - Lentes de Contacto Premium",
    description: "Tu óptica de confianza especializada en lentes de contacto premium.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={inter.variable} suppressHydrationWarning>
      <body className="font-sans antialiased bg-background text-foreground">
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
            <Header />
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
      </body>
    </html>
  );
}
