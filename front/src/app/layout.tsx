import React from "react";
import "./globals.css";

interface Props {
  children: React.ReactNode;
}

const RootLayout = (props: Props) => {
  const { children } = props;
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900 flex flex-col min-h-screen">
        <header className="bg-gray-800 text-white p-4 text-center">
          <p className="text-3xl">Soy un header</p>
        </header>
        <main className="grow p-8">{children}</main>
        <footer className="bg-gray-800 text-white p-4 text-center">
          <p>Soy un footer</p>
        </footer>
      </body>
    </html>
  );
};

export default RootLayout;
