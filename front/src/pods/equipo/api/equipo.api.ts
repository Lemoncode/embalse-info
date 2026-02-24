import "server-only";
import { unstable_cache } from "next/cache";
import type { Developer } from "./equipo.api-model";
import { contentIslandClient } from "@/lib";

export const getDeveloperListCached = unstable_cache(
  async (): Promise<Developer[]> => {
    try {
      return await contentIslandClient.getContentList<Developer>({
        contentType: "developer",
        language: "es",
      });
    } catch (error) {
      console.warn("Warning: developer list not available");
      return [];
    }
  },
  ["developer-list"],
  { revalidate: 60 }
);
