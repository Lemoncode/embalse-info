import Link from "next/link";

interface Props {
  params: Promise<{ provincia: string }>;
}

// Datos mock de embalses por provincia
function getEmbalsesPorProvincia(provincia: string) {
  const embalses = {
    madrid: [
      { id: 1, nombre: "Embalse de Santillana", capacidad: 91.2 },
      { id: 2, nombre: "Embalse del Atazar", capacidad: 425.9 },
    ],
    barcelona: [
      { id: 3, nombre: "Embalse de Sau", capacidad: 177.0 },
      { id: 4, nombre: "Embalse de La Baells", capacidad: 115.0 },
    ],
    valencia: [
      { id: 5, nombre: "Embalse de Tous", capacidad: 378.9 },
      { id: 6, nombre: "Embalse de Alarcón", capacidad: 1112.0 },
    ],
    sevilla: [
      { id: 7, nombre: "Embalse de La Minilla", capacidad: 274.0 },
      { id: 8, nombre: "Embalse del Pintado", capacidad: 210.0 },
    ],
    toledo: [
      { id: 9, nombre: "Embalse de Castrejón", capacidad: 516.0 },
      { id: 10, nombre: "Embalse de Azután", capacidad: 654.0 },
    ],
    cáceres: [
      { id: 11, nombre: "Embalse de Alcántara", capacidad: 3162.0 },
      { id: 12, nombre: "Embalse de Valdecañas", capacidad: 1446.0 },
    ],
  };

  return embalses[provincia as keyof typeof embalses] || [];
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
          {getEmbalsesPorProvincia(provincia.toLowerCase()).map(
            (embalse, index) => (
              <Link
                key={index}
                href={`/embalse/${embalse.nombre
                  .toLowerCase()
                  .replace(/ /g, "-")}`}
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
