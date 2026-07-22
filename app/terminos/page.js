import Link from 'next/link'

export const metadata = {
  title: 'Términos y Condiciones de Uso',
  description: 'Términos y condiciones de uso del sitio web del Instituto DBT Chile.',
  alternates: { canonical: 'https://institutodbtchile.cl/terminos' },
  robots: { index: true, follow: true },
}

const updated = '1 de junio de 2025'

export default function TerminosPage() {
  return (
    <div className="bg-white">
      <section className="py-16 md:py-20 border-b border-gray-100 bg-gradient-to-br from-primary/5 via-white to-primary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="mb-4 text-xs font-semibold text-primary uppercase tracking-[0.18em]">
              Instituto DBT Chile
            </div>
            <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-4 tracking-tight">
              Términos y <em className="font-serif italic text-primary">Condiciones</em>
            </h1>
            <p className="text-gray-600">Última actualización: {updated}</p>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto prose prose-lg max-w-none prose-headings:font-light prose-headings:text-gray-900 prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-3 prose-p:text-gray-700 prose-p:leading-relaxed prose-li:text-gray-700 prose-strong:text-gray-900 prose-a:text-primary">
            <p>
              Los presentes Términos y Condiciones regulan el acceso y uso del sitio web de
              <strong> Instituto DBT Chile</strong> (anteriormente DBT Chile). Al utilizar este sitio, usted
              acepta estos términos.
            </p>

            <h2>1. Objeto del sitio</h2>
            <p>
              Este sitio tiene por finalidad ofrecer información institucional, educativa y de contacto sobre los
              servicios clínicos del Instituto DBT Chile, especializados en Terapia Dialéctico Conductual (DBT).
            </p>

            <h2>2. Naturaleza informativa · Aviso médico</h2>
            <p>
              La información publicada tiene carácter <strong>informativo y educativo</strong> y
              <strong> no constituye</strong> consejo médico, diagnóstico ni tratamiento, ni reemplaza una
              valoración clínica presencial o telemática realizada por un profesional. No debe utilizarse para
              autodiagnóstico. Ante una urgencia de salud mental, contacte a SAMU 131 o Salud Responde *4141.
            </p>

            <h2>3. Solicitudes de contacto</h2>
            <p>
              Al enviar sus datos de contacto a través del sitio (por ejemplo, mediante nuestro formulario o
              WhatsApp), usted autoriza que el Instituto se comunique con usted para coordinar información o una
              valoración clínica. El tratamiento de sus datos se rige por nuestra{' '}
              <Link href="/privacidad">Política de Privacidad</Link>.
            </p>

            <h2>4. Propiedad intelectual</h2>
            <p>
              Los contenidos, textos, artículos, publicaciones científicas, marcas y elementos gráficos de este
              sitio pertenecen al Instituto DBT Chile o a sus respectivos autores, y están protegidos por la
              legislación vigente. No está permitida su reproducción sin autorización, salvo la cita académica con
              atribución correspondiente.
            </p>

            <h2>5. Enlaces a terceros</h2>
            <p>
              El sitio puede contener enlaces a sitios de terceros (por ejemplo, repositorios académicos). No nos
              hacemos responsables del contenido ni de las políticas de privacidad de dichos sitios.
            </p>

            <h2>6. Limitación de responsabilidad</h2>
            <p>
              El Instituto DBT Chile procura mantener la información actualizada y correcta, pero no garantiza la
              ausencia de errores. El uso del sitio se realiza bajo la exclusiva responsabilidad del usuario.
            </p>

            <h2>7. Legislación aplicable</h2>
            <p>
              Estos términos se rigen por las leyes de la República de Chile. Cualquier controversia se someterá a
              los tribunales competentes de Santiago de Chile.
            </p>

            <p className="text-sm text-gray-500 mt-10">
              Consulte también nuestra{' '}
              <Link href="/privacidad">Política de Privacidad</Link>. Contacto:{' '}
              <a href="mailto:contacto@dbtchile.cl">contacto@dbtchile.cl</a>.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
