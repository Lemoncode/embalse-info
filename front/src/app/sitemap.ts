import type { MetadataRoute } from "next";
import { PROVINCIAS } from "@/core/constants";
import { cuencas } from "@/core/constants";
import { getEmbalsesCollection } from "@/pods/embalse-search/api";

const SITE_URL = "https://infoembalse.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${SITE_URL}/embalse-provincia`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/embalse-cuenca`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/equipo`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/aviso-legal`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.1,
    },
    {
      url: `${SITE_URL}/politica-cookies`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.1,
    },
  ];

  const provinciaEntries: MetadataRoute.Sitemap = PROVINCIAS.map((p) => ({
    url: `${SITE_URL}/embalse-provincia/${p.id}`,
    lastModified: now,
    changeFrequency: "daily",
    priority: 0.7,
  }));

  const cuencaEntries: MetadataRoute.Sitemap = Object.values(cuencas).map(
    (c) => ({
      url: `${SITE_URL}/embalse-cuenca/${c.slug}`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.7,
    }),
  );

  const embalses = await getEmbalsesCollection();
  const embalseEntries: MetadataRoute.Sitemap = embalses.map((e) => ({
    url: `${SITE_URL}/embalse/${e._id}`,
    lastModified: now,
    changeFrequency: "daily",
    priority: 0.9,
  }));

  return [
    ...staticEntries,
    ...provinciaEntries,
    ...cuencaEntries,
    ...embalseEntries,
  ];
}
