import React from "react";
import Link from "next/link";
import "./layout.css";

interface Props {
  children: React.ReactNode;
}

const RootLayout = (props: Props) => {
  const { children } = props;
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <div className="layout-container">
          <header className="header">
            <div className="header-content">
              <div className="logo">
                <Link href="/">INFO EMBALSE</Link>
              </div>
            </div>
          </header>

          <main className="main">{children}</main>

          <footer className="footer">
            <div className="footer-content">
              <p>© 2025 Sistema de Información de Embalses de España</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
