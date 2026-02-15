/**
 * tsup.config.ts
 * --------------
 * What is "tsup"?
 * - tsup is a tiny build tool on top of esbuild (a very fast bundler).
 * - It can compile TypeScript to JavaScript and (optionally) bundle dependencies into a single output file.
 * - We use it here to produce a deployable "dist/" folder for Azure Functions.
 *
 * Why do we need bundling in a Turborepo + npm workspaces monorepo?
 * - In local dev, Node can resolve workspace packages like "@embalse-info/db" because the monorepo install layout
 *   and workspace symlinks make them available.
 * - In Azure, your Function App runs only what you deploy. If you deploy just the "functions/" folder,
 *   Azure will NOT automatically have your entire monorepo workspace graph available.
 * - That frequently causes runtime errors like: "Cannot find module '@embalse-info/db'".
 *
 * Our strategy:
 * 1) Bundle ONLY our internal workspace packages (e.g., @embalse-info/db) so the deployed JS does not need
 *    workspace resolution at runtime.
 * 2) Do NOT bundle Azure runtime packages (e.g., @azure/functions), because they contain dynamic requires
 *    and runtime-only modules that bundlers should not inline.
 *    (We hit this earlier with: Could not resolve "@azure/functions-core".)
 */

import { defineConfig } from "tsup";

export default defineConfig({
  /**
   * entry
   * -----
   * The "entry point(s)" of the build. This is where tsup starts.
   *
   * In your project:
   * - functions/src/index.ts imports and registers both timer functions:
   *     - ./functions/arcgis-function.js
   *     - ./functions/scraping-functions.js
   *
   * By bundling from src/index.ts, tsup will pull in those modules too.
   */
  entry: ["src/index.ts"],

  /**
   * format
   * ------
   * Output module format.
   *
   * - "esm" means ECMAScript Modules (import/export).
   * - Your package.json has `"type": "module"`, so ESM is the natural choice.
   * - Azure Functions Node.js runtime supports ESM in modern Node versions.
   */
  format: ["esm"],

  /**
   * outDir
   * ------
   * Output directory for the compiled/bundled artifacts.
   *
   * We use "dist" because:
   * - Your package.json already points to `"main": "dist/index.js"`.
   * - Your .funcignore ignores *.ts (source), so "dist" is what gets deployed.
   */
  outDir: "dist",

  /**
   * sourcemap
   * ---------
   * Generates source maps for easier debugging (mapping dist JS back to TS).
   *
   * Note:
   * - Your .funcignore currently ignores "*.js.map", so these won't be deployed.
   * - That’s fine for production. You can keep them for local debugging.
   */
  sourcemap: true,

  /**
   * clean
   * -----
   * Clears the output directory before building.
   * This avoids stale files in dist/ from previous builds.
   */
  clean: true,

  /**
   * target
   * ------
   * The JavaScript language target. "es2022" means:
   * - modern syntax/features are kept
   * - output is smaller/faster than transpiling to older targets
   *
   * Node 20+ supports ES2022 features well.
   */
  target: "es2022",

  /**
   * external
   * --------
   * Packages listed here are treated as "external":
   * - they are NOT bundled into the output
   * - instead, they remain as imports/requires in dist code
   *
   * Why externalize Azure Functions runtime packages?
   * - The @azure/functions package can reference internal runtime pieces using dynamic requires.
   * - Bundlers (esbuild/tsup) may fail trying to resolve those internals at build time
   *   (as you saw with "@azure/functions-core").
   * - Also, bundling platform/runtime libraries is usually unnecessary and can break things.
   *
   * So we keep:
   * - @azure/functions
   * - @azure/functions-core
   * external, letting the Azure Functions runtime handle them normally.
   */
  external: ["@azure/functions", "@azure/functions-core"],

  /**
   * noExternal
   * ----------
   * This is the opposite of "external". It forces certain dependencies to be bundled even if they would
   * normally be treated as external (for example, when using node_modules resolution).
   *
   * Why do we force-bundle @embalse-info/* ?
   * - @embalse-info/db is a workspace package in your monorepo (packages/db).
   * - If we deploy only "functions/", Azure may not have the workspace package installed/resolved the same way.
   * - Bundling it ensures the generated dist output contains the code needed at runtime.
   *
   * The regex below matches any internal package under your scope:
   * - @embalse-info/db
   * - @embalse-info/anything-else (future packages)
   *
   * Result:
   * - The final dist/index.js no longer contains: `import ... from "@embalse-info/db"`
   * - Instead, the db code is inlined into the bundle.
   */
  noExternal: [/^@embalse-info\//],
});
