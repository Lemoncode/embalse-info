import Link from "next/link";
import { FC } from "react";

export const HeaderComponent: FC = () => {
  return (
    <header className="bg-base-100">
      <div className="border-accent flex h-[60px] items-center border-b-3 pl-5">
        <Link href="/" className="link-accessible text-lg font-bold">
          <img src="/images/logo.svg" alt="InfoEmbalse logo" />
        </Link>
      </div>
    </header>
  );
};
