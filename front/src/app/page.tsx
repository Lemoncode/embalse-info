import { EmbalseSearch } from "@/pods/embalse-search";
import { getEmbalsesCollection } from "@/pods/embalse-search/api";

export const dynamic = "force-dynamic";

const RootPage = async () => {
  const embalses = await getEmbalsesCollection();

  return <EmbalseSearch embalses={embalses} />;
};

export default RootPage;
