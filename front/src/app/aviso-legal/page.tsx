const LegalNoticePage = () => {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-6 text-4xl font-bold">Aviso Legal</h1>

      <section className="space-y-6">
        <div>
          <h2 className="mb-3 text-2xl font-semibold">
            Identificación del sitio web
          </h2>
          <p>
            En cumplimiento con el deber de información establecido en la
            normativa vigente, se informa que el presente sitio web Infoembalses
            (en adelante, el "Sitio Web") es un proyecto gratuito y de código
            abierto (open source) desarrollado con fines formativos y
            divulgativos por alumnos de Lemoncode Formación.
          </p>
          <ul className="my-3 ml-2 list-inside list-disc">
            <li>
              Responsable del Sitio Web: Proyecto educativo de alumnos de
              Lemoncode Formación
            </li>
            <li>Correo de contacto: info@lemoncode.net</li>
            <li>
              Repositorio del proyecto:{" "}
              <a
                href="https://github.com/Lemoncode/embalse-info"
                className="link link-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://github.com/Lemoncode/embalse-info
              </a>
            </li>
          </ul>
          <p>
            El Sitio Web no constituye una actividad comercial ni representa a
            una entidad jurídica con ánimo de lucro.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-2xl font-semibold">Objeto del sitio web</h2>
          <p>
            Infoembalses tiene como finalidad mostrar información orientativa
            sobre el estado de los embalses (pantanos) de España, con fines
            informativos y educativos.
          </p>
          <p>
            El acceso y uso del Sitio Web atribuye la condición de usuario e
            implica la aceptación plena del presente Aviso Legal.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-2xl font-semibold">
            Carácter orientativo de la información y exención de responsabilidad
          </h2>
          <p>
            La información mostrada en Infoembalses es meramente orientativa.
            Aunque se procura que los datos sean lo más precisos y actualizados
            posible, no se garantiza:
          </p>
          <ul className="my-3 ml-2 list-inside list-disc">
            <li>
              La exactitud, integridad o actualidad permanente de la información
            </li>
            <li>
              Que los datos reflejen la situación real del embalse en el momento
              de la consulta
            </li>
            <li>La disponibilidad continua del servicio</li>
          </ul>
          <p>
            El usuario acepta expresamente que el uso de la información se
            realiza bajo su exclusiva responsabilidad. Los responsables del
            proyecto no se hacen responsables de los daños o perjuicios
            derivados de:
          </p>
          <ul className="my-3 ml-2 list-inside list-disc">
            <li>Decisiones tomadas basándose en la información publicada</li>
            <li>Errores, omisiones o desactualizaciones de los datos</li>
            <li>Interrupciones del servicio o incidencias técnicas</li>
          </ul>
          <p>
            Cuando los datos procedan de fuentes externas (por ejemplo,
            organismos públicos o APIs de terceros), se mostrarán tal y como
            dichas fuentes los proporcionan, sin que el proyecto asuma
            responsabilidad sobre su exactitud.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-2xl font-semibold">Condiciones de uso</h2>
          <p>
            El usuario se compromete a utilizar el Sitio Web de forma lícita,
            responsable y conforme a la buena fe. Queda prohibido, entre otros:
          </p>
          <ul className="my-3 ml-2 list-inside list-disc">
            <li>Usar el Sitio Web con fines ilícitos o fraudulentos</li>
            <li>
              Introducir malware o realizar acciones que puedan dañar o
              sobrecargar el sistema
            </li>
            <li>
              Intentar acceder sin autorización a áreas restringidas o a la
              infraestructura del proyecto
            </li>
          </ul>
          <p>
            El proyecto se reserva el derecho de limitar o suspender el acceso
            ante usos indebidos.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-2xl font-semibold">
            Propiedad intelectual y licencia open source
          </h2>
          <p>
            El Sitio Web es un proyecto open source. Salvo que se indique lo
            contrario:
          </p>
          <ul className="my-3 ml-2 list-inside list-disc">
            <li>
              El código fuente y los recursos propios del proyecto se rigen por
              la licencia publicada en el repositorio oficial del proyecto:{" "}
              <a
                href="https://github.com/Lemoncode/embalse-info"
                className="link link-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://github.com/Lemoncode/embalse-info
              </a>
            </li>
            <li>
              Los nombres, logotipos o marcas de terceros que puedan aparecer
              pertenecen a sus respectivos titulares y se utilizan únicamente
              con fines informativos
            </li>
          </ul>
          <p>
            El uso del código y de los contenidos deberá respetar los términos
            de la licencia correspondiente.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-2xl font-semibold">Enlaces a terceros</h2>
          <p>
            El Sitio Web puede contener enlaces a páginas web de terceros. Estos
            enlaces se facilitan únicamente a modo informativo y no implican
            aprobación ni responsabilidad alguna sobre los contenidos, servicios
            o políticas de dichos sitios externos.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-2xl font-semibold">
            Analítica web y cookies
          </h2>
          <p>
            Este Sitio Web utiliza Google Analytics, un servicio de analítica
            web que emplea cookies para medir y analizar el tráfico y uso del
            Sitio Web, sin finalidad publicitaria.
          </p>
          <p>
            La información recopilada se utiliza exclusivamente con fines
            estadísticos y de mejora del proyecto. No se recogen datos
            personales identificativos de los usuarios.
          </p>
          <p>
            Se recomienda complementar este aviso con una Política de Cookies y
            una Política de Privacidad.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-2xl font-semibold">Modificaciones</h2>
          <p>
            Los responsables del proyecto se reservan el derecho a modificar el
            presente Aviso Legal en cualquier momento. Las modificaciones
            entrarán en vigor desde su publicación en el Sitio Web.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-2xl font-semibold">Legislación aplicable</h2>
          <p>
            El presente Aviso Legal se rige por la legislación española. En caso
            de conflicto o controversia, se aplicarán los juzgados y tribunales
            que correspondan conforme a derecho.
          </p>
        </div>
      </section>
    </div>
  );
};

export default LegalNoticePage;
