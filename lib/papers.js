// Shared papers metadata used by /investigacion/la-mente-algoritmica hub and
// the individual /investigacion/paper/[id] article pages.
// 8 doctoral papers — author: Josefina Cáceres Cortés, Ph.D.(c), 2024.

export const papers = [
  {
    id: 1,
    slug: 'tratado-maestro-desregulacion-emocional',
    title: 'Tratado Maestro sobre Desregulación Emocional',
    subtitle: 'Mecanismos neurobiológicos, cognitivos y conductuales',
    abstract:
      'Análisis exhaustivo de los mecanismos neurobiológicos, cognitivos y conductuales de la desregulación emocional. Este tratado integra evidencia neurocientífica reciente con la formulación clínica del modelo biosocial de Linehan (1993) y propone un marco computacional unificador basado en el Principio de Energía Libre (Friston, 2010).',
    keyFindings: [
      'La desregulación emocional emerge de la interacción dinámica entre sensibilidad límbica, déficit prefrontal y vulnerabilidad ambiental temprana.',
      'Los biomarcadores propuestos (HRV, cortisol, fenotipos digitales) muestran consistencia con el modelo dimensional dimensional del TLP.',
      'La integración DBT + Schema Therapy + monitoreo computacional propone un marco clínico integrador para el tratamiento del TLP.',
    ],
    words: 6454,
    references: 33,
    date: '2024',
    keywords: ['desregulación emocional', 'TLP', 'DBT', 'neurobiología', 'modelo biosocial', 'energía libre'],
    featured: true,
  },
  {
    id: 2,
    slug: 'axiomas-regulacion-emocional',
    title: 'Axiomas de la Regulación Emocional',
    subtitle: 'Principios fundamentales desde la neurociencia',
    abstract:
      'Principios fundamentales que rigen los procesos de regulación emocional desde la neurociencia contemporánea. Propone seis axiomas integrativos validados por evidencia empírica, conectando la teoría del control predictivo con la formulación clínica DBT.',
    keyFindings: [
      'Axioma 1: La regulación emocional es un proceso predictivo, no reactivo.',
      'Axioma 2: La desregulación es la falla del mecanismo de actualización bayesiana.',
      'Axioma 3: El entrenamiento DBT recalibra las precisiones de las predicciones interoceptivas.',
    ],
    words: 4200,
    references: 28,
    date: '2024',
    keywords: ['regulación emocional', 'axiomas', 'control predictivo', 'inferencia bayesiana'],
  },
  {
    id: 3,
    slug: 'evaluacion-momentanea-ecologica-dbt',
    title: 'Evaluación Momentánea Ecológica (EMA) en DBT',
    subtitle: 'Monitoreo en tiempo real de estados emocionales',
    abstract:
      'Metodologías de evaluación en tiempo real para el monitoreo de estados emocionales en contextos clínicos. Revisión sistemática de protocolos EMA aplicados a poblaciones TLP, con propuesta de implementación local vía ApoFix AI.',
    keyFindings: [
      'EMA permite capturar variabilidad emocional intra-individual no detectable por instrumentos transversales.',
      'La densidad de medición (≥5 prompts/día) maximiza la validez ecológica.',
      'La integración con DBT-skills coaching just-in-time muestra reducción significativa de conductas-objetivo.',
    ],
    words: 3850,
    references: 22,
    date: '2024',
    keywords: ['EMA', 'monitoreo ecológico', 'DBT', 'ApoFix AI', 'phenotyping digital'],
  },
  {
    id: 4,
    slug: 'neuroplasticidad-dbt',
    title: 'Neuroplasticidad y Terapia Dialéctico Conductual',
    subtitle: 'Evidencia de cambios cerebrales inducidos por DBT',
    abstract:
      'Evidencia neurocientífica de los cambios cerebrales inducidos por la Terapia Dialéctico Conductual. Meta-análisis de 14 estudios de neuroimagen pre/post DBT en TLP con datos cuantitativos sobre conectividad límbica-prefrontal.',
    keyFindings: [
      'DBT induce aumento del grosor cortical prefrontal medial (d = 0.62).',
      'Reducción de la reactividad amigdalar ante estímulos emocionales negativos (d = -0.81).',
      'Mejora en la conectividad funcional prefronto-límbica correlaciona con la reducción de conductas suicidas.',
    ],
    words: 4100,
    references: 31,
    date: '2024',
    keywords: ['neuroplasticidad', 'neuroimagen', 'DBT', 'prefrontal', 'amígdala'],
  },
  {
    id: 5,
    slug: 'sistemas-procesamiento-emocional',
    title: 'Sistemas de Procesamiento Emocional',
    subtitle: 'Modelos computacionales de las redes neuronales',
    abstract:
      'Modelos computacionales de las redes neuronales implicadas en el procesamiento emocional. Síntesis entre la teoría del afecto construido (Barrett, 2017) y los modelos predictivos de la cognición.',
    keyFindings: [
      'Las emociones emergen de inferencias predictivas sobre estados corporales.',
      'La granularidad emocional es entrenable mediante mindfulness y etiquetado afectivo.',
      'Implicancias para el módulo de mindfulness DBT y la psicoeducación clínica.',
    ],
    words: 3600,
    references: 26,
    date: '2024',
    keywords: ['procesamiento emocional', 'redes neuronales', 'afecto construido', 'granularidad emocional'],
  },
  {
    id: 6,
    slug: 'mindfulness-regulacion-prefrontal',
    title: 'Mindfulness y Regulación Prefrontal',
    subtitle: 'Mecanismos neurales de la atención plena',
    abstract:
      'Mecanismos neurales por los cuales la atención plena modula el control emocional. Revisión de evidencia EEG/fMRI en practicantes a corto y largo plazo, con aplicaciones específicas para DBT.',
    keyFindings: [
      'Las prácticas de atención focalizada activan circuitos prefrontales dorsales.',
      'La atención abierta-monitoreante incrementa la flexibilidad cognitiva.',
      'En DBT, ambas modalidades cumplen funciones complementarias.',
    ],
    words: 3900,
    references: 24,
    date: '2024',
    keywords: ['mindfulness', 'prefrontal', 'atención plena', 'DBT', 'EEG'],
  },
  {
    id: 7,
    slug: 'biomarcadores-desregulacion-emocional',
    title: 'Biomarcadores de Desregulación Emocional',
    subtitle: 'Indicadores fisiológicos y neuroquímicos',
    abstract:
      'Indicadores fisiológicos y neuroquímicos de la disregulación afectiva. Análisis crítico de los biomarcadores propuestos para el TLP, evaluando su validez convergente y discriminante.',
    keyFindings: [
      'La variabilidad de frecuencia cardíaca (HRV) emerge como marcador robusto.',
      'Cortisol salival no muestra especificidad suficiente para TLP.',
      'Fenotipos digitales (movimiento, sueño, voz) son prometedores y de bajo costo.',
    ],
    words: 4300,
    references: 29,
    date: '2024',
    keywords: ['biomarcadores', 'HRV', 'cortisol', 'fenotipos digitales', 'TLP'],
  },
  {
    id: 8,
    slug: 'inteligencia-artificial-evaluacion-clinica',
    title: 'Inteligencia Artificial en Evaluación Clínica',
    subtitle: 'Machine learning para predicción de crisis emocionales',
    abstract:
      'Aplicaciones de machine learning para la predicción de crisis emocionales y conductas-objetivo en TLP. Marco ético y técnico para la implementación de ApoFix AI en el Instituto DBT Chile.',
    keyFindings: [
      'Modelos predictivos basados en EMA + fenotipos digitales alcanzan AUC > 0.85 para crisis 24h-ahead.',
      'La calibración requiere validación local con poblaciones chilenas.',
      'El marco ético propuesto integra Ley 19.628 + Ley 21.331 + AI Act europeo (referencial).',
    ],
    words: 3750,
    references: 20,
    date: '2024',
    keywords: ['IA', 'machine learning', 'ApoFix AI', 'predicción de crisis', 'ética clínica'],
  },
]

export const getPaperById = (id) => papers.find((p) => p.id === Number(id))
export const getPaperBySlug = (slug) => papers.find((p) => p.slug === slug)

/**
 * Autor\u00eda cient\u00edfica \u2014 mapeo paper.id \u2192 lista de authorIds.
 * Los 8 papers doctorales son de autor\u00eda \u00fanica de Josefina C\u00e1ceres Cort\u00e9s.
 * Consultar /lib/authors.js para datos completos del autor.
 */
export const paperAuthorsMap = {
  1: ['josefina-caceres-cortes'],
  2: ['josefina-caceres-cortes'],
  3: ['josefina-caceres-cortes'],
  4: ['josefina-caceres-cortes'],
  5: ['josefina-caceres-cortes'],
  6: ['josefina-caceres-cortes'],
  7: ['josefina-caceres-cortes'],
  8: ['josefina-caceres-cortes'],
}

/**
 * DOI mapping \u2014 paper.id \u2192 DOI real y confirmado.
 * REGLA: solo agregar aqu\u00ed un DOI cuando el art\u00edculo est\u00e9 efectivamente
 * publicado y el DOI resuelva correctamente. No inventar identificadores.
 * Actualmente todos los papers doctorales est\u00e1n en fase de manuscrito;
 * cuando se publiquen en Zenodo / repositorio con DOI activo se agregar\u00e1n aqu\u00ed.
 */
export const paperDoiMap = {
  // ejemplo (cuando est\u00e9 confirmado): 1: '10.5281/zenodo.XXXXXXXX',
}

export function getPaperAuthorIds(id) {
  return paperAuthorsMap[Number(id)] || []
}

export function getPaperDoi(id) {
  return paperDoiMap[Number(id)] || null
}
