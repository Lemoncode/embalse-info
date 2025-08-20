// Contratos de repositorio/casos de uso

export interface GetCantabricoDataOptions {
  onlyEmbalses?: boolean;
}

export interface CantabricoRepository {
  fetchSnapshot(opts?: GetCantabricoDataOptions): Promise<import("./models").CantabricoSnapshot>;
}
