import { Card } from "@/common/components/card.component";
import { mapListaCuencasDesdeApiParaVista } from "./embalse-cuenca.mapper";
import { getRiverBasins } from "./embalse-cuenca-list.repository";
import Link from "next/link";
import { generateSlug } from "db-model";

export const EmbalsesCuencaList: React.FC = async () => {
  const cuencasAPI = await getRiverBasins();
  const cuencasList = mapListaCuencasDesdeApiParaVista(cuencasAPI);

  return (
    <Card className="mx-auto w-full pt-6 pr-4 pb-6 pl-4 md:max-w-225 md:p-8">
      <div className="bg-base-100 rounded-2xl p-6">
        <h2>Embalses por cuencas</h2>
        <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2 md:grid-cols-3">
          {cuencasList.map(({ id, name }) => (
            <Link
              key={id}
              href={`/embalse-cuenca/${generateSlug(name)}`}
              className="link-accessible"
            >
              {name}
            </Link>
          ))}
        </div>
      </div>
    </Card>
  );
};
