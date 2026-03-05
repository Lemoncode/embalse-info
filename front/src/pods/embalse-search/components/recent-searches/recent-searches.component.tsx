import Link from "next/link";
import { EmbalseSearchModel } from "../../embalse-search.vm";

interface Props {
  searches: EmbalseSearchModel[];
}

export const RecentSearches: React.FC<Props> = (props) => {
  const { searches } = props;

  return (
    <>
      <h3>Búsquedas recientes</h3>
      <ul>
        {searches.map((item) => (
          <li key={item.slug} className="mt-3">
            <Link className="link-accessible" href={`/embalse/${item.slug}`}>{item.name} </Link>
          </li>
        ))}
      </ul>
    </>
  );
};
