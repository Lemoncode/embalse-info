import React from "react";
import "./globals.css";
import { FooterComponent, HeaderComponent } from "../layouts";
import { CookiesConsentProvider, CookiesBanner } from "../common/cookies";

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
        </CookiesConsentProvider>
      </body>
    </html>
  );
};

export default RootLayout;
