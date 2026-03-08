"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type CookiesConsent = "accepted" | "rejected" | null;

interface CookiesConsentContextType {
  consent: CookiesConsent;
  acceptCookies: () => void;
  rejectCookies: () => void;
  resetCookies: () => void;
}

const STORAGE_KEY = "cookies-consent";

const CookiesConsentContext = createContext<CookiesConsentContextType>({
  consent: null,
  acceptCookies: () => {},
  rejectCookies: () => {},
  resetCookies: () => {},
});

export const useCookiesConsent = () => useContext(CookiesConsentContext);

interface Props {
  children: React.ReactNode;
}

export const CookiesConsentProvider: React.FC<Props> = ({ children }) => {
  const [consent, setConsent] = useState<CookiesConsent>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "accepted" || stored === "rejected") {
      setConsent(stored);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setConsent("accepted");
  };

  const rejectCookies = () => {
    localStorage.setItem(STORAGE_KEY, "rejected");
    setConsent("rejected");
  };

  const resetCookies = () => {
    localStorage.removeItem(STORAGE_KEY);
    setConsent(null);
  };

  return (
    <CookiesConsentContext.Provider
      value={{ consent, acceptCookies, rejectCookies, resetCookies }}
    >
      {children}
    </CookiesConsentContext.Provider>
  );
};
