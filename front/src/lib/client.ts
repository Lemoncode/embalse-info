import "server-only";
import { createClient } from "@content-island/api-client";

/**
 * Content Island client instance.
 * This file is server-only to prevent token exposure.
 */
export const contentIslandClient = createClient({
  accessToken: process.env.CONTENT_ISLAND_ACCESS_TOKEN ?? "",
});
