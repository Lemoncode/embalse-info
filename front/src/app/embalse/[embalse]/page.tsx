import Link from "next/link";
import { embalsesData, formatUrlForEmbalse } from "../../../data/embalses";

interface Props {
  params: Promise<{ embalse: string }>;
}

export default async function EmbalseDetailPage({ params }: Props) {
  const { embalse } = await params;
  const embalseNombre = formatUrlForEmbalse(embalse);

  const embalseData = embalsesData.find(
    (e) => e.nombre.toLowerCase() === embalseNombre.toLowerCase()
  );

  if (!embalseData) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <h1>Embalse no encontrado</h1>
        <p>No se encontró información para: {embalseNombre}</p>
        <Link href="/" style={{ color: "#4a90e2", textDecoration: "none" }}>
          ← Volver al inicio
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <div style={{ marginBottom: "20px" }}>
        <Link
          href={`/embalse-provincia/${embalseData.provincia.toLowerCase()}`}
          style={{
            color: "#4a90e2",
            textDecoration: "none",
            fontSize: "14px",
          }}
        >
          ← Volver a {embalseData.provincia}
        </Link>
      </div>

      <div
        style={{
          background: "#fff",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <h1 style={{ color: "#333", marginBottom: "1rem" }}>
          {embalseData.nombre}
        </h1>

        <div style={{ display: "grid", gap: "1rem", marginBottom: "2rem" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "1rem",
              background: "#f8f9fa",
              borderRadius: "8px",
            }}
          >
            <span style={{ fontWeight: "bold", color: "#333" }}>
              Provincia:
            </span>
            <span style={{ color: "#666" }}>{embalseData.provincia}</span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "1rem",
              background: "#f8f9fa",
              borderRadius: "8px",
            }}
          >
            <span style={{ fontWeight: "bold", color: "#333" }}>
              Capacidad:
            </span>
            <span style={{ color: "#666" }}>{embalseData.capacidad} hm³</span>
          </div>
        </div>

        <div
          style={{
            padding: "1.5rem",
            background: "#e7f3ff",
            borderRadius: "8px",
            border: "1px solid #b3d9ff",
          }}
        >
          <h3 style={{ color: "#333", marginBottom: "0.5rem" }}>
            Información adicional
          </h3>
          <p style={{ color: "#666", margin: 0 }}>
            Esta página mostrará información detallada del {embalseData.nombre},
            incluyendo niveles actuales, histórico de datos y características
            técnicas.
          </p>
        </div>
      </div>
    </div>
  );
}
