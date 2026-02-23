"use client";

import React from "react";
import { useCookiesConsent } from "./cookies-consent.context";

export const CookiesResetButton: React.FC = () => {
  const { resetCookies } = useCookiesConsent();

  return (
    <button
      onClick={resetCookies}
      className="link-accessible text-sm font-normal"
    >
      Configurar cookies
    </button>
  );
};
