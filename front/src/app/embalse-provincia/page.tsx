import Link from "next/link";

export default function EmbalsesProvinciaPage() {
  const provinciasDisponibles = [
    "Madrid",
    "Barcelona",
    "Valencia",
    "Sevilla",
    "Toledo",
    "Cáceres",
  ];

  return (
    <div>
      <h1>Embalses por Provincia</h1>
      <p>Selecciona una provincia para ver sus embalses:</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "15px",
          marginTop: "20px",
        }}
      >
        {provinciasDisponibles.map((provincia) => (
          <Link
            key={provincia}
            href={`/embalse-provincia/${provincia.toLowerCase()}`}
            style={{
              display: "block",
              padding: "15px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              textDecoration: "none",
              color: "#333",
              background: "#fff",
              textAlign: "center",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            {provincia}
          </Link>
        ))}
      </div>

      <div
        style={{
          marginTop: "30px",
          padding: "20px",
          background: "#f8f9fa",
          borderRadius: "8px",
          border: "1px solid #e9ecef",
        }}
      >
        <h3>El resto añadir</h3>
        <p style={{ color: "#666", margin: "10px 0 0 0" }}>
          Las demás provincias de España se añadirán próximamente.
        </p>
      </div>
    </div>
  );
}
