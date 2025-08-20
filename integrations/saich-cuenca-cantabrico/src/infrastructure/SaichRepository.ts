import { CantabricoSnapshot } from "../domain/models.js";
import { CantabricoRepository, GetCantabricoDataOptions } from "../domain/repositories.js";
import { SaichHttpClient } from "./SaichHttpClient.js";
import { mapSnapshot } from "./SaichMapper.js";

export class SaichRepository implements CantabricoRepository {
  constructor(private client: SaichHttpClient) {}
  async fetchSnapshot(opts?: GetCantabricoDataOptions): Promise<CantabricoSnapshot> {
    const payload = await this.client.getFiveMinuteEmbalses();
    return mapSnapshot(payload, opts?.onlyEmbalses);
  }
}
