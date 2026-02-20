import "server-only";
import { createClient } from "@content-island/api-client";

/**
 * Ensures required environment variables exist.
 */
function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

/**
 * Content Island client instance.
 * This file is server-only to prevent token exposure.
 */
export const contentIslandClient = createClient({
  accessToken: requireEnv("CONTENT_ISLAND_ACCESS_TOKEN"),
});
