import Link from "next/link";
import { Metadata } from "next";
import { PROVINCIAS } from "@/core/constants";
import { Card } from "@/common/components/card.component";

export const metadata: Metadata = {
  title: "Embalses por provincias",
};

export default function EmbalsesProvinciaPage() {
  return (
    <Card>
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
    </Card>
  );
}
