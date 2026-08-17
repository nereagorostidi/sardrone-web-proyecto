import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://guardian-eye-tfg.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Guardian Eye — Dron autónomo de Búsqueda y Rescate",
    template: "%s · Guardian Eye",
  },
  description:
    "Documentación técnica de Guardian Eye, un sistema autónomo de dron SAR con enlace múltiple de comunicaciones redundante, visión por computador y arquitectura cloud. Trabajo de Fin de Grado en Ingeniería de Telecomunicaciones.",
  keywords: [
    "dron SAR",
    "búsqueda y rescate",
    "TFG Telecomunicaciones",
    "Pixhawk",
    "Raspberry Pi",
    "YOLO",
    "MAVLink",
    "Tailscale",
  ],
  openGraph: {
    title: "Guardian Eye — Dron autónomo de Búsqueda y Rescate",
    description:
      "Enlace múltiple de comunicaciones redundante, IoT, visión por computador y arquitectura cloud. Documentación técnica completa del TFG.",
    url: siteUrl,
    siteName: "Guardian Eye",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Guardian Eye — Dron autónomo de Búsqueda y Rescate",
    description:
      "Documentación técnica de un dron SAR con enlace múltiple redundante, IA y arquitectura cloud.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
        >
          Saltar al contenido
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
