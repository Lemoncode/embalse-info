# Guía de pruebas – SAICH Cuenca Cantábrica

Este documento explica cómo probar la integración que obtiene datos de la Cuenca Cantábrica desde el endpoint SAICH y los devuelve en formato JSON, ya sea a través de un endpoint HTTP o guardándolos directamente en un archivo.

---

## 1. Probar como **web app** (endpoint JSON)

1. Abre una terminal en la carpeta de la integración:

    ```bash
    cd integrations/saich-cuenca-cantabrico
    ```

2. Arranca el servidor en modo desarrollo:

    ```bash
    pnpm dev
    # o con npm
    npm run dev
    ```

3. Abre en el navegador la URL:

    ```bash
    http://localhost:3000/api/cantabrico
    ```

4. Si quieres obtener solo embalses, usa:
    ```bash
    http://localhost:3000/api/cantabrico?onlyEmbalses=true
    ```

El endpoint devolverá el JSON generado por las clases `Station` y `CantabricoSnapshot`.

## 2. Probar como **CLI** (guardar en archivo JSON)

1. Ejecuta el script de volcado:

    ```bash
    pnpm dump
    # o con npm
    npm run dump
    ```

2. Esto creará un archivo en la carpeta `out/` (o la que especifiques con `--out-dir`) con un nombre del tipo:
    ```
    cantabrico_2025-08-12T12-34-56-789Z.json
    ```

### Opciones adicionales:

```bash
pnpm dump --solo-embalses --pretty --out-dir=./data
```

-   `--solo-embalses` → Filtra solo estaciones tipo embalse.
-   `--pretty` → Guarda el JSON con formato legible.
-   `--out-dir` → Carpeta destino para el archivo.

## 3. Comprobaciones

-   **API**: Abre el navegador y confirma que `/api/cantabrico` devuelve un JSON válido.
-   **CLI**: Verifica que el archivo generado existe y sigue la estructura esperada (`generatedAt`, `total`, `stations`…).
-   **Conexión**: Si aparece un error de conexión, revisa tu red y que el endpoint de SAICH esté operativo.
-   **Timeouts**: Si la respuesta es lenta, aumenta `TIMEOUT_MS` en `config/env.ts` o añade `--timeout=20000` al comando.

## 4. Ejemplos rápidos

### Web app:

```bash
http://localhost:3000/api/cantabrico
http://localhost:3000/api/cantabrico?onlyEmbalses=true
```

### CLI:

```bash
pnpm dump
```

## 5. Próximos pasos

En el futuro, estos datos podrán guardarse en una base de datos o transformarse a una estructura más reducida, reutilizando la arquitectura actual basada en:

-   **Domain** → Modelos y contratos.
-   **Infrastructure** → Clientes HTTP y mapeadores.
-   **Application** → Casos de uso.
-   **API/CLI** → Puntos de entrada.
