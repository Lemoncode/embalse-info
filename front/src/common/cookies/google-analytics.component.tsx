"use client";

import Script from "next/script";
import { useCookiesConsent } from "./cookies-consent.context";

const GA_ID = "G-0SF5QPC7FQ";

export const GoogleAnalytics: React.FC = () => {
  const { consent } = useCookiesConsent();

  if (consent !== "accepted") {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
};
