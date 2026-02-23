"use client";

import Link from "next/link";
import React from "react";
import { useCookiesConsent } from "./cookies-consent.context";

export const CookiesBanner: React.FC = () => {
  const { consent, acceptCookies, rejectCookies } = useCookiesConsent();

  if (consent !== null) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-4">
      <div className="alert bg-base-100 border-accent mx-auto max-w-3xl flex-col gap-3 border shadow-lg sm:flex-row sm:gap-4">
        <p className="text-sm text-center sm:text-left">
          Utilizamos cookies analíticas para mejorar tu experiencia. Puedes
          aceptar o rechazar su uso.{" "}
          <Link href="/politica-cookies" className="link link-accent">
            Política de Cookies
          </Link>
        </p>
        <div className="flex shrink-0 gap-2">
          <button className="btn btn-accent btn-sm" onClick={acceptCookies}>
            Aceptar
          </button>
          <button
            className="btn btn-outline btn-sm"
            onClick={rejectCookies}
          >
            Rechazar
          </button>
        </div>
      </div>
    </div>
  );
};
