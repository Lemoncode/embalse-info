import { EmbalseUpdateSAIHEntity } from "db-model";

export interface EmbalsesGuadalquivir {
  id: number;
  embalse: string;
  provincia: string;
  nmnMsnm: number; // Metros sobre el nivel del mar máximo (m.s.n.m.)
  nivelActualMsnm: number;
  capacidadActualHm3: number;
  volumenActualHm3: number;
  porcentajeActual: number;
}

export interface ZoneInfo {
  codigoZona: string;
  nombreZona: string;
  embalses: EmbalseUpdateSAIHEntity[];
}

export interface Zone {
  codigo: string;
  nombre: string;
}

export const ZONES = [
  { codigo: "CO", nombre: "Zona Córdoba" },
  { codigo: "GR", nombre: "Zona Granada" },
  { codigo: "JA", nombre: "Zona Jaén" },
  { codigo: "SE", nombre: "Zona Sevilla" },
  { codigo: "RG", nombre: "Sistema de Regulación General" },
  { codigo: "CE", nombre: "Ceuta y Melilla" },
];
