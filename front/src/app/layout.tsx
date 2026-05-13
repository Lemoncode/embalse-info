import React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { FooterComponent, HeaderComponent } from "../layouts";
import {
  CookiesConsentProvider,
  CookiesBanner,
  GoogleAnalytics,
} from "../common/cookies";

const SITE_URL = "https://infoembalse.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "InfoEmbalse — Nivel actual de los embalses de España",
    template: "%s | InfoEmbalse",
  },
  description:
    "Consulta el nivel actual, histórico y datos técnicos de todos los embalses de España. Información por provincia y por cuenca.",
  applicationName: "InfoEmbalse",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "InfoEmbalse",
    locale: "es_ES",
    url: SITE_URL,
    title: "InfoEmbalse — Nivel actual de los embalses de España",
    description:
      "Consulta el nivel actual, histórico y datos técnicos de todos los embalses de España.",
    images: [{ url: "/images/embalse-generico.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "InfoEmbalse — Nivel actual de los embalses de España",
    description:
      "Consulta el nivel actual, histórico y datos técnicos de todos los embalses de España.",
    images: ["/images/embalse-generico.jpg"],
  },
  robots: { index: true, follow: true },
};

interface Props {
  children: React.ReactNode;
}

const RootLayout = (props: Props) => {
  const { children } = props;
  return (
    <html lang="es" data-theme="info-embalse">
      <body
        className="bg-base-200 text-base-content flex min-h-screen flex-col"
        suppressHydrationWarning
      >
        <CookiesConsentProvider>
          <HeaderComponent />
          <main className="flex grow flex-col">{children}</main>
          <FooterComponent />
          <CookiesBanner />
          <GoogleAnalytics />
        </CookiesConsentProvider>
      </body>
    </html>
  );
};

export default RootLayout;
