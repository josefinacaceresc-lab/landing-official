import Link from 'next/link'

export const metadata = {
  title: 'Política de Privacidad · Protección de Datos',
  description: 'Política de privacidad y protección de datos personales del Instituto DBT Chile, conforme a la Ley 19.628 y la Ley 21.331 de Chile.',
  alternates: { canonical: 'https://institutodbtchile.cl/privacidad' },
  robots: { index: true, follow: true },
}

const updated = '1 de junio de 2025'

export default function PrivacidadPage() {
  return (
    <div className="bg-white">
      <section className="py-16 md:py-20 border-b border-gray-100 bg-gradient-to-br from-primary/5 via-white to-primary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="mb-4 text-xs font-semibold text-primary uppercase tracking-[0.18em]">
              Instituto DBT Chile
            </div>
            <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-4 tracking-tight">
              Política de <em className="font-serif italic text-primary">Privacidad</em>
            </h1>
            <p className="text-gray-600">Última actualización: {updated}</p>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto prose prose-lg max-w-none prose-headings:font-light prose-headings:text-gray-900 prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-3 prose-p:text-gray-700 prose-p:leading-relaxed prose-li:text-gray-700 prose-strong:text-gray-900 prose-a:text-primary">
            <p>
              En <strong>Instituto DBT Chile</strong> (anteriormente DBT Chile) respetamos y protegemos la
              privacidad de las personas que visitan nuestro sitio web y utilizan nuestros servicios clínicos.
              Esta política describe qué datos recopilamos, con qué finalidad y cuáles son sus derechos,
              conforme a la <strong>Ley N° 19.628 sobre Protección de la Vida Privada</strong>, la
              <strong> Ley N° 21.331</strong> sobre reconocimiento y protección de los derechos de las personas
              en la atención de salud mental, y la <strong>Ley N° 20.584</strong> sobre derechos y deberes de
              los pacientes.
            </p>

            <h2>1. Responsable del tratamiento</h2>
            <p>
              El responsable del tratamiento de los datos es Instituto DBT Chile, con domicilio en
              El Coihue 3776, Vitacura, Región Metropolitana, Chile. Correo de contacto:{' '}
              <a href="mailto:contacto@dbtchile.cl">contacto@dbtchile.cl</a>.
            </p>

            <h2>2. Datos que recopilamos</h2>
            <ul>
              <li><strong>Datos de contacto:</strong> nombre y número de teléfono/WhatsApp que usted proporciona voluntariamente al solicitar información o una valoración clínica.</li>
              <li><strong>Datos de navegación:</strong> dirección IP, tipo de dispositivo y navegador, y datos aproximados de ubicación geográfica, recopilados mediante cookies y servicios de analítica.</li>
              <li><strong>Datos de campaña:</strong> parámetros de origen (por ejemplo, identificadores de Google Ads) para medir la efectividad de nuestras campañas.</li>
            </ul>
            <p>
              No recopilamos datos clínicos sensibles a través del sitio web. La información de salud se trata
              exclusivamente dentro del contexto clínico, bajo secreto profesional y con su consentimiento informado.
            </p>

            <h2>3. Finalidad del tratamiento</h2>
            <ul>
              <li>Responder a sus solicitudes de información y coordinar valoraciones clínicas.</li>
              <li>Mejorar la experiencia y el funcionamiento del sitio web.</li>
              <li>Medir y optimizar nuestras campañas de comunicación.</li>
            </ul>

            <h2>4. Cookies y servicios de terceros</h2>
            <p>
              Utilizamos <strong>Google Analytics</strong>, <strong>Google Tag Manager</strong> y
              <strong> Google Ads</strong> con fines de analítica y medición. Estos servicios pueden instalar
              cookies en su dispositivo. Usted puede configurar su navegador para rechazar cookies; ello no
              impide el uso esencial del sitio. La dirección IP se trata de forma anonimizada en la analítica.
            </p>

            <h2>5. Conservación y seguridad</h2>
            <p>
              Conservamos los datos de contacto solo durante el tiempo necesario para atender su solicitud y
              cumplir obligaciones legales. Aplicamos medidas técnicas y organizativas razonables para proteger
              sus datos frente a accesos no autorizados.
            </p>

            <h2>6. Sus derechos</h2>
            <p>
              Usted tiene derecho a <strong>acceder</strong>, <strong>rectificar</strong>, <strong>cancelar</strong>
              {' '}y <strong>oponerse</strong> al tratamiento de sus datos personales. Para ejercerlos, escríbanos
              a <a href="mailto:contacto@dbtchile.cl">contacto@dbtchile.cl</a> indicando su solicitud.
            </p>

            <h2>7. Aviso médico</h2>
            <p>
              El contenido de este sitio tiene fines informativos y educativos y <strong>no reemplaza</strong> una
              valoración clínica personalizada ni constituye diagnóstico o tratamiento. Si usted o un ser querido
              se encuentran en crisis, contacte a SAMU 131, Salud Responde *4141 o su servicio de urgencia local.
            </p>

            <h2>8. Cambios en esta política</h2>
            <p>
              Podemos actualizar esta política periódicamente. Publicaremos cualquier cambio en esta misma página
              con su fecha de actualización.
            </p>

            <p className="text-sm text-gray-500 mt-10">
              ¿Dudas sobre esta política? Escríbanos a{' '}
              <a href="mailto:contacto@dbtchile.cl">contacto@dbtchile.cl</a> o revise nuestros{' '}
              <Link href="/terminos">Términos y Condiciones</Link>.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
