# embalse-info

## Pasos para actualizar la semilla de las cuencas

```bash
npm run start:console-runners
```

> Lanzar desde la raíz del proyecto.

Seleccionar la opción `db-console-runners`:

```bash
? [console-runners] Select a console runner to execute ›
❯   packages/db
```

Luego, seleccionar el runner `cuencas-seed`:

```bash
✔ Connection string (Press enter to use default):  … mongodb://localhost:27017/embalse-info
? Which test-runner do you want to run? › - Use arrow-keys. Return to submit.
❯   cuencas-seed
    exit
```

Y ya estará actualizada la semilla de las cuencas.

## Pasos para activar las azure functions

### Cómo levantar Azurite (emulador de Azure Storage) en Docker

```bash
docker run -d --name azurite -p 10000:10000 -p 10001:10001 -p 10002:10002 mcr.microsoft.com/azure-storage/azurite
```

### Añadir las variables de entorno

Dentro de la carpeta `functions`, vamos crear un archivo `local.settings.json` a partir del de plantilla, ejecuta este comando desde el terminal (bash), desde el raiz del repo.

```bash
cp functions/local.settings.template.json functions/local.settings.json
```

### Arrancar las funciones de Azure

Antes de arrancar las funciones de Azure, asegurate de tener instaladas su cli.

Para instalarlo en Mac,

```bash
  brew tap azure/functions
  brew install azure-functions-core-tools@4
```

> Ojo tienes que tener homebrew instalado.

Si tienes Windows

**IMPORTANTE**: Esto lo no hemos probado, ver si funciona correctamente

```bash
  Opción 1 - npm (si ya tienes Node.js):
  npm install -g azure-functions-core-tools@4 --unsafe-perm true

  Opción 2 - winget:
  winget install Microsoft.Azure.FunctionsCoreTools

  Opción 3 - Chocolatey:
  choco install azure-functions-core-tools

  Opción 4 - Instalador MSI:
  Descargar directamente desde https://learn.microsoft.com/en-us/azure/azure-functions/functions-run-local
```

Y en linux

```bash
Opción 1 - npm (si ya tienes Node.js):
  npm install -g azure-functions-core-tools@4 --unsafe-perm true

  Opción 2 - Ubuntu/Debian (apt):
  curl https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > microsoft.gpg
  sudo mv microsoft.gpg /etc/apt/trusted.gpg.d/microsoft.gpg
  sudo sh -c 'echo "deb [arch=amd64] https://packages.microsoft.com/repos/microsoft-ubuntu-$(lsb_release -cs)-prod
   $(lsb_release -cs) main" > /etc/apt/sources.list.d/dotnetdev.list'
  sudo apt update
  sudo apt install azure-functions-core-tools-4

  Opción 3 - Fedora/RHEL/CentOS:
  sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc
  sudo dnf install azure-functions-core-tools-4
```

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

# [Temporal] Probando detalle embalse

Está pendiente conectar typeahead con el detalle del embalse. De momento, se puede probar accediendo directamente a las siguientes URLs:

```bash
http://localhost:3000/embalse/vinuela-la

http://localhost:3000/embalse/villagudin
```
