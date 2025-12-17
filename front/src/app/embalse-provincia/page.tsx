import Link from "next/link";
import { PROVINCIAS } from "@/core/constants";

export default function EmbalsesProvinciaPage() {
  return (
    <div className="flex flex-col gap-8 rounded-2xl bg-(--color-base-100) p-4">
      <h2>Embalses por provincias</h2>
      <div className="flex flex-col gap-4">
        {PROVINCIAS.map(({ id, name }) => (
          <Link
            key={id}
            href={`/embalse-provincia/${id}`}
            className="link-accessible"
          >
            {name}
          </Link>
        ))}
      </div>
    </div>
  );
}
