# Resumen sencillo para Marcos

- Puedes usar Playwright (Chromium) en Azure Functions, pero no es plug & play.
- Si usas el plan de consumo, puede fallar por falta de recursos o dependencias.
- Lo más fácil: usa un plan Premium o Dedicated y sube tu función en un Docker con todo instalado.
- Hay ejemplos y guías, pero siempre prueba primero en local.

Links útiles:
- https://github.com/microsoft/playwright/issues/7704
- https://learn.microsoft.com/en-us/azure/azure-functions/functions-create-function-linux-custom-image?tabs=in-process%2Cbash%2Cazure-cli&pivots=programming-language-javascript

¿Dudas? ¡Pregunta!
