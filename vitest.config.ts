// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Le indicamos a Vitest que nuestros tests se ejecutan en un entorno de Node, no en un navegador.
    environment: 'node',
  },
});