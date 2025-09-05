# Research: Playwright (Chromium) en Azure Functions

## Resumen
- Es posible ejecutar Playwright (Chromium) en Azure Functions, pero hay limitaciones importantes.
- El plan de consumo tiene restricciones de recursos y puede fallar con dependencias nativas o procesos pesados.
- Playwright necesita instalar Chromium y librerías del sistema, lo que complica el despliegue.
- Lo más recomendable es usar Azure Functions en plan Premium/Dedicated y desplegar usando contenedores Docker personalizados.
- Hay ejemplos de la comunidad que muestran cómo hacerlo.

## Recomendaciones
- Usar Docker para empaquetar todas las dependencias.
- Probar primero en local y luego desplegar en Azure.

## Enlaces útiles
- https://github.com/microsoft/playwright/issues/7704
- https://github.com/microsoft/playwright/issues/7704#issuecomment-1013779642
- https://learn.microsoft.com/en-us/azure/azure-functions/functions-create-function-linux-custom-image?tabs=in-process%2Cbash%2Cazure-cli&pivots=programming-language-javascript

## Ejemplo mínimo (pseudocódigo)
```js
const { chromium } = require('playwright');
module.exports = async function (context, req) {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://example.com');
  const title = await page.title();
  await browser.close();
  context.res = { body: title };
};
```
