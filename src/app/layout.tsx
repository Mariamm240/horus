import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "../styles/themes.css";
import ClientLayoutWrapper from "@/components/layout/client-layout-wrapper";

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


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={inter.variable} suppressHydrationWarning>
      <body className="font-sans antialiased bg-background text-foreground">
        <ClientLayoutWrapper>
          {children}
        </ClientLayoutWrapper>
      </body>
    </html>
  );
}
