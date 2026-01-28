"use client";
import { use, useState } from "react";

export const ReservoirCardDetail = ({ datosEmbalse }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex w-full flex-col items-start gap-4">
      <h3>
        Datos del embalse
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{ marginLeft: "9rem", border: "none", fontSize: "1.2rem" }}
        >
          {isOpen ? "▲" : "▼"}
        </button>
      </h3>
      {isOpen && (
        <ul>
          <li>Cuenca: {datosEmbalse.Cuenca}</li>
          <li>Provincia: {datosEmbalse.Provincia}</li>
          <li>Municipio: {datosEmbalse.Municipio}</li>
          <li>Río: {datosEmbalse.Rio}</li>
          <li>Embalses Aguas Abajo: {datosEmbalse.EmbalsesAguasAbajo}</li>
          <li>Tipo de Presa: {datosEmbalse.TipoDePresa}</li>
          <li>Año de Construcción: {datosEmbalse.AnioConstruccion}</li>
          <li>Superficie: {datosEmbalse.Superficie} </li>
          <li>Localización: {datosEmbalse.Localizacion}</li>
        </ul>
      )}
    </div>
  );
};
