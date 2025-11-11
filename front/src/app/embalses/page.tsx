import React from "react";
import Link from "next/link";

export const revalidate = 10;

export interface Embalse {
  embalse_id: number;
  nombre: string;
  capacidad: number;
  aguaActualAemet: number | null;
  cuenca: { nombre: string };
}

const getData = async (): Promise<Embalse[]> => {
  const response = await fetch("http://localhost:3000/api/embalses", {
    next: { revalidate },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
};

const EmbalsesPage = async () => {
  const embalses = await getData();

  return (
    <div>
      <h1>Embalses</h1>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Nombre</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Cuenca</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>
              Capacidad (hm³)
            </th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>
              Agua actual (AEMET)
            </th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>
              Detalle
            </th>
          </tr>
        </thead>
        <tbody>
          {embalses.map((embalse) => (
            <tr key={embalse.embalse_id}>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {embalse.nombre}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {embalse.cuenca?.nombre}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {embalse.capacidad}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {embalse.aguaActualAemet ?? "-"}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                <Link href={`/embalses/${embalse.embalse_id}`}>
                  Ver detalle
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmbalsesPage;
