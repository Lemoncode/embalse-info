import Link from "next/link";
import { provincias } from "./array-provincias";

export default function EmbalsesProvinciaPage() {
  return (
    <div className="flex flex-col gap-8 rounded-2xl bg-(--color-base-100) p-4">
      <h2>Embalses por provincias</h2>
      <div className="flex flex-col gap-4">
        {provincias.map((provincia) => (
          <Link
            key={provincia}
            href={`/embalse-provincia/${provincia}`}
            className="link-accessible"
          >
            {provincia}
          </Link>
        ))}
      </div>
    </div>
  );
}
