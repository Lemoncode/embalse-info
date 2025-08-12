import { CantabricoSnapshot } from "../domain/models.js";
import { CantabricoRepository, GetCantabricoDataOptions } from "../domain/repositories.js";

export class GetCantabricoDataUseCase {
  constructor(private repo: CantabricoRepository) {}
  execute(opts?: GetCantabricoDataOptions): Promise<CantabricoSnapshot> {
    return this.repo.fetchSnapshot(opts);
  }
}
