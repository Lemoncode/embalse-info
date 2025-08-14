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
  isDefault: boolean;
}

export const ZONES = [
  { codigo: "RG", nombre: "Sistema de Regulación General", isDefault: true },
  { codigo: "CO", nombre: "Zona Córdoba", isDefault: false },
  { codigo: "GR", nombre: "Zona Granada", isDefault: false },
  { codigo: "JA", nombre: "Zona Jaén", isDefault: false },
  { codigo: "SE", nombre: "Zona Sevilla", isDefault: false },
  { codigo: "CE", nombre: "Ceuta y Melilla", isDefault: false },
];
