import Link from "next/link";
import { PROVINCIAS } from "@/core/constants";
import { Card } from "@/common/components/card.component";

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
