import Link from "next/link";
import { getEmbalsesPorProvincia, formatEmbalseForUrl } from "../../../data/embalses";

interface Props {
  params: Promise<{ provincia: string }>;
}

export default async function EmbalseProvinciaPage({ params }: Props) {
  const { provincia: provinciaParam } = await params;
  const provincia = decodeURIComponent(provinciaParam)
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ marginBottom: "20px" }}>
        <Link
          href="/embalse-provincia"
          style={{
            color: "#007bff",
            textDecoration: "none",
            fontSize: "14px",
          }}
        >
          ← Volver a provincias
        </Link>
      </div>

      <h1 style={{ marginBottom: "20px", color: "#333" }}>
        Embalses de {provincia}
      </h1>

      <div style={{ marginTop: "20px" }}>
        <h2 style={{ marginBottom: "15px", color: "#333" }}>
          Embalses disponibles:
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "15px",
          }}
        >
          {getEmbalsesPorProvincia(provincia).map(
            (embalse, index) => (
              <Link
                key={index}
                href={`/embalse/${formatEmbalseForUrl(embalse.nombre)}`}
                style={{
                  display: "block",
                  padding: "20px",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  textDecoration: "none",
                  color: "#333",
                  background: "#fff",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }}
              >
                <h3 style={{ margin: "0 0 10px 0", color: "#007bff" }}>
                  {embalse.nombre}
                </h3>
                <p style={{ margin: "0", color: "#666", fontSize: "0.9rem" }}>
                  Capacidad: {embalse.capacidad} hm³
                </p>
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  );
}
