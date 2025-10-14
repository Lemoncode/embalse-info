# embalse-info

## Pasos para activar las azure functions

### Cómo levantar Azurite (emulador de Azure Storage) en Docker

```bash
docker run -d --name azurite -p 10000:10000 -p 10001:10001 -p 10002:10002 mcr.microsoft.com/azure-storage/azurite
```

### Añadir las variables de entorno

Dentro de la carpeta `functions`, crear un archivo `local.settings.json` con las siguientes variables de entorno:

_/functions/local.settings.json_

```json
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "UseDevelopmentStorage=true",
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "MONGODB_CONNECTION_STRING": "mongodb://localhost:27017/embalse-info"
  }
}
```

### Arrancar las funciones de Azure

En la raíz del proyecto, ejecutar:

```bash
npm start
```

Seleccionar la opción `functions`:

```bash
....
◯  integrations/scraping-cuenca-mino-sil
◯  integrations/scraping-cuenca-segura
◯  integrations/scraping-cuenca-tajo
◯  front
◉  functions
```

Y ya estarán las funciones levantadas y ejecutándose.

**Nota**: Recuerda que si ya tienes creado el contenedor de Azurite, deberás comprobar si está arrancado. Si no lo está, puedes arrancarlo con:

```bash
docker start azurite
```
