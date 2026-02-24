import Link from "next/link";
import { FC } from "react";

export const HeaderComponent: FC = () => {
  return (
    <header className="bg-base-100">
      <div className="border-accent flex h-[60px] items-center border-b-3 pl-5">
        <Link href="/" className="link-accessible text-lg font-bold">
          <img src="/images/logo.svg" alt="InfoEmbalse logo" />
        </Link>
        <span className="badge badge-sm ml-3 translate-y-[2px] border-primary bg-primary/10 text-primary font-semibold tracking-wide">
          Beta
        </span>
      </div>
    </header>
  );
};
