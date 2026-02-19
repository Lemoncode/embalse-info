import React from "react";
import "./globals.css";
import { FooterComponent, HeaderComponent } from "../layouts";

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
        <HeaderComponent />
        <main className="flex grow flex-col">{children}</main>
        <FooterComponent />
      </body>
    </html>
  );
};

export default RootLayout;
