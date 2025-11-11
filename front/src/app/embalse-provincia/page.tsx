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

      <div className="provinces-grid">
        {provinciasDisponibles.map((provincia) => (
          <Link
            key={provincia}
            href={`/embalse-provincia/${provincia.toLowerCase()}`}
            className="province-card"
          >
            {provincia}
          </Link>
        ))}
      </div>

      <div className="rest-section">
        <h3>El resto añadir</h3>
        <p>
          Las demás provincias de España se añadirán próximamente.
        </p>
      </div>
    </div>
  );
}
