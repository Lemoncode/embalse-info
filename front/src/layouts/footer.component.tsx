import Link from "next/link";
import { FC } from "react";
import { CookiesResetButton } from "../common/cookies";

export const FooterComponent: FC = () => {
  return (
    <footer className="bg-base-100">
      <div className="border-accent flex flex-col items-center gap-2 border-t-2 p-3">
        <div className="flex flex-col items-center gap-2 pb-2.5">
          <div className="flex flex-wrap justify-center gap-x-3 gap-y-1">
            <Link
              href="/embalse-provincia"
              className="link-accessible text-[15px] leading-none font-normal"
            >
              Embalses por provincias
            </Link>
            <Link
              href="/equipo"
              className="link-accessible text-[15px] leading-none font-normal"
            >
              Equipo
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-x-3 gap-y-1">
            <Link
              href="/aviso-legal"
              className="link-accessible text-sm font-normal"
            >
              Aviso Legal
            </Link>
            <Link
              href="/politica-cookies"
              className="link-accessible text-sm font-normal"
            >
              Política de cookies
            </Link>
            <CookiesResetButton />
          </div>
        </div>

        <p className="text-xs leading-none font-normal">
          Infoembalse © 2025 Todos los derechos reservados
        </p>
      </div>
    </footer>
  );
};
