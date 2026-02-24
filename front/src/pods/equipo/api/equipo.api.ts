import "server-only";
import { unstable_cache } from "next/cache";
import type { Developer } from "./equipo.api-model";
import { contentIslandClient } from "@/lib";

const fetchDeveloperList = async (): Promise<Developer[]> => {
  const result = await contentIslandClient.getContentList<Developer>({
    contentType: "developer",
    language: "es",
  });

  if (!result?.length) {
    throw new Error("Empty developer list, skipping cache");
  }

  return result;
};

const fetchDeveloperListCached = unstable_cache(
  fetchDeveloperList,
  ["developer-list"],
  { revalidate: 60 }
);

export const getDeveloperListCached = async (): Promise<Developer[]> => {
  try {
    return await fetchDeveloperListCached();
  } catch (error) {
    console.warn("Warning: developer list not available");
    return [];
  }
};
