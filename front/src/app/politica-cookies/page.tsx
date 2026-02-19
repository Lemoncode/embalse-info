const CookiesPolicyPage = () => {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-6 text-4xl font-bold">Política de Cookies</h1>

      <section className="space-y-6">
        <div>
          <h2 className="mb-3 text-2xl font-semibold">¿Qué son las cookies?</h2>
          <p>
            Las cookies son pequeños archivos de texto que se almacenan en el
            dispositivo del usuario cuando visita un sitio web. Sirven para
            garantizar el correcto funcionamiento del sitio, recopilar
            información estadística o mejorar la experiencia de navegación.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-2xl font-semibold">
            Tipos de cookies utilizadas en este sitio web
          </h2>
          <p>
            El sitio web Infoembalses utiliza únicamente cookies de análisis,
            concretamente el servicio Google Analytics, con la finalidad
            exclusiva de medir el tráfico y analizar el uso del sitio web.
          </p>
          <p>
            No se utilizan cookies publicitarias ni cookies para elaborar
            perfiles comerciales de los usuarios.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-2xl font-semibold">
            Cookies de terceros: Google Analytics
          </h2>
          <p>
            Este sitio web utiliza Google Analytics, un servicio de analítica
            web prestado por Google LLC.
          </p>
          <p>
            Google Analytics utiliza cookies para recopilar información anónima
            sobre:
          </p>
          <ul className="ml-2 list-inside list-disc">
            <li>Número de visitantes</li>
            <li>Páginas visitadas</li>
            <li>Tiempo de navegación</li>
            <li>Tipo de dispositivo y navegador</li>
          </ul>
          <p className="mt-3">
            La información generada por las cookies es transmitida y almacenada
            por Google en sus servidores. Infoembalses utiliza esta información
            únicamente con fines estadísticos y para mejorar el funcionamiento
            del sitio web.
          </p>
          <p className="mt-3">
            Más información:
            <br />
            <a
              href="https://policies.google.com/privacy"
              className="link link-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://policies.google.com/privacy
            </a>
            <br />
            <a
              href="https://developers.google.com/analytics/devguides/collection/ga4"
              className="link link-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://developers.google.com/analytics/devguides/collection/ga4
            </a>
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-2xl font-semibold">
            Base legal para el uso de cookies
          </h2>
          <p>
            El uso de cookies analíticas se basa en el consentimiento del
            usuario, conforme a la normativa vigente en materia de protección de
            datos y servicios de la sociedad de la información.
          </p>
          <p>
            Al acceder al sitio web, el usuario podrá aceptar o rechazar el uso
            de cookies analíticas a través del mecanismo de configuración
            habilitado.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-2xl font-semibold">
            Cómo gestionar o desactivar las cookies
          </h2>
          <p>
            El usuario puede permitir, bloquear o eliminar las cookies
            instaladas en su dispositivo mediante la configuración de las
            opciones del navegador que utilice.
          </p>
          <p>
            A continuación, se facilitan enlaces a la gestión de cookies en los
            principales navegadores:
          </p>
          <ul className="ml-2 list-inside list-disc">
            <li>
              <a
                href="https://support.google.com/chrome/answer/95647"
                className="link link-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Chrome
              </a>
            </li>
            <li>
              <a
                href="https://support.mozilla.org/es/kb/Borrar%20cookies"
                className="link link-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Mozilla Firefox
              </a>
            </li>
            <li>
              <a
                href="https://support.microsoft.com/es-es/help/4027947"
                className="link link-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Microsoft Edge
              </a>
            </li>
            <li>
              <a
                href="https://support.apple.com/es-es/guide/safari/sfri11471/mac"
                className="link link-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Safari
              </a>
            </li>
          </ul>
          <p className="mt-3">
            La desactivación de cookies analíticas no impedirá el uso del sitio
            web.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-2xl font-semibold">
            Actualizaciones de la política de cookies
          </h2>
          <p>
            La presente Política de Cookies puede ser actualizada en función de
            cambios normativos o técnicos. Se recomienda al usuario revisarla
            periódicamente.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-2xl font-semibold">Contacto</h2>
          <p>
            Para cualquier duda relacionada con el uso de cookies en este sitio
            web, el usuario puede contactar a través del correo electrónico:
          </p>
          <p className="font-semibold">info@lemoncode.net</p>
        </div>
      </section>
    </div>
  );
};

export default CookiesPolicyPage;
