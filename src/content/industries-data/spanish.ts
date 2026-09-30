import type { Locale } from "@/i18n/routing";
import { applySpanishDialect } from "@/i18n/dialect";
import type { Industry, IndustrySlug } from "./types";

type ChapterCopy = {
  title: string;
  navLabel: string;
  eyebrow: string;
  summary: string;
  heroTitle?: string;
  heroSignal?: string;
  metaTitle?: string;
  metaDescription?: string;
  ctaTitle?: string;
  ctaCopy?: string;
  heroCopy: string;
  problemTitle?: string;
  problemCopy: string;
  approachTitle?: string;
  approachCopy: string;
  helpTitle?: string;
  domainsTitle?: string;
  whyTitle?: string;
  help: { title: string; detail: string }[];
  domainTitles: string[];
  whyTitles: string[];
  discover?: string[];
};

/**
 * Hub and homepage market copy, written in Latin American Spanish.
 * Spain reads the same sentences after the dialect pass, plus the title patches below.
 */
const latam: Partial<Record<IndustrySlug, ChapterCopy>> = {
  "home-services": {
    title: "Servicios del hogar",
    navLabel: "Servicios del hogar",
    eyebrow: "Oficios locales",
    summary: "Trabajos cerrados cuando el cliente necesita a alguien esta semana.",
    heroTitle: "Marketing",
    heroSignal: "de oficios.",
    metaTitle: "Agencia de marketing para oficios",
    metaDescription:
      "SEO local, páginas y anuncios para plomería, jardinería y oficios que necesitan trabajos cerrados, no consultas que no sirven.",
    ctaTitle: "¿El teléfono no suena como debería?",
    ctaCopy: "Cuéntanos el oficio y qué está fallando. Te decimos qué arreglar primero.",
    heroCopy:
      "El cliente llama cuando algo se rompe o no puede esperar. Armamos la búsqueda, las páginas y los anuncios para que esa urgencia se vuelva trabajo que tu equipo puede hacer.",
    problemCopy:
      "La temporada alta se siente bien hasta que el teléfono se calla. Caes en el mapa. Los anuncios traen el trabajo que no quieres. La oficina pasa la mañana separando consultas basura de trabajos de verdad.",
    approachCopy:
      "Vemos cómo busca la gente en tu oficio y rehacemos páginas y campañas alrededor de esos trabajos. El SEO local se gana la llamada. Los anuncios tapan los huecos.",
    help: [
      { title: "Búsqueda local que cierra trabajo", detail: "Mapas, páginas de servicio y reseñas para los trabajos que sí quieres cerca." },
      { title: "Páginas que consiguen la llamada", detail: "Oferta clara, prueba y un camino para llamar o pedir presupuesto, sobre todo en una urgencia." },
      { title: "Anuncios que respetan el margen", detail: "Google y Meta ordenados por tipo de trabajo y por lo que de verdad deja." },
    ],
    domainTitles: ["Jardinería", "Plomería", "Aire acondicionado", "Electricidad"],
    whyTitles: ["Pocas cuentas, a propósito", "Hablas con quien hace el trabajo", "El informe empieza por las llamadas"],
    discover: ["Jardinería", "Plomería", "Aire acondicionado", "Electricidad", "Techados", "Plagas", "Pintura", "Limpieza", "Portones", "Vidrios"],
  },
  ecommerce: {
    title: "E-commerce",
    navLabel: "E-commerce",
    eyebrow: "Tiendas en línea",
    summary: "Pedidos que dejan margen.",
    heroTitle: "Marketing",
    heroSignal: "para tiendas.",
    metaTitle: "Agencia de marketing para tiendas",
    metaDescription:
      "El camino del clic al pago, SEO de producto y anuncios medidos por lo que aportan, no por el descuento.",
    ctaTitle: "¿La tienda recibe visitas y no pedidos?",
    ctaCopy: "Mándanos la tienda y el mes pasado. Te decimos dónde se cae la compra.",
    heroCopy:
      "Primero el camino del clic al pedido. El SEO de producto y los anuncios se miden por lo que aportan, para que los números se puedan defender.",
    problemCopy:
      "Muchos equipos meten presupuesto en anuncios mientras la ficha se traba y el pago pierde gente. Las categorías no aparecen para lo que la gente escribe. Al final solo queda descontar.",
    approachCopy:
      "Revisamos dónde se cae la compra, apretamos lo que mata la intención y después subimos la adquisición en una tienda que la aguanta. El SEO recoge demanda que ya te ganaste.",
    help: [
      { title: "Conversión antes de gastar más", detail: "Se arregla el tramo que pierde ventas, para que cada visita tenga una oportunidad justa." },
      { title: "SEO de producto y categoría", detail: "Estructura y texto para lo que el comprador ya busca." },
      { title: "Adquisición que se puede explicar", detail: "Campañas al ritmo del margen, con un criterio claro para cortar." },
    ],
    domainTitles: ["Marcas propias", "SEO de producto", "Conversión", "Anuncios en redes"],
    whyTitles: ["El pago se revisa antes que el presupuesto", "Las fichas venden el producto, no el archivo", "Sabes qué canal trae el pedido"],
    discover: ["Marcas propias", "SEO de producto", "Conversión", "Anuncios en redes", "Catálogo", "Suscripción", "Tiendas Shopify", "Marketplaces", "Ropa", "Belleza"],
  },
  healthcare: {
    title: "Salud",
    navLabel: "Salud",
    eyebrow: "Pacientes",
    summary: "Citas para clínicas que la recepción puede atender.",
    heroCopy:
      "El paciente busca, compara y llama al consultorio que se entiende. Armamos búsqueda, páginas y anuncios que llenan la agenda sin ahogar la recepción.",
    problemCopy:
      "Cuando bajan las referencias, el sitio suele aparecer para lo que no atiendes, o para nada. Los anuncios compran palabras médicas anchas. La recepción atiende llamadas que nunca son cita.",
    approachCopy:
      "Vemos cómo encuentran un médico en tus especialidades y rehacemos páginas y campañas alrededor de eso. El SEO local se gana la llamada. Los anuncios llenan la capacidad que sí puedes atender.",
    help: [
      { title: "Búsqueda de la especialidad", detail: "Páginas para lo que el paciente escribe cuando ya decidió atenderse." },
      { title: "Un camino claro hasta la cita", detail: "Horario, seguro y el siguiente paso, sin un formulario que pide la historia clínica." },
      { title: "Anuncios con cupo real", detail: "Solo se empuja lo que la agenda puede absorber." },
    ],
    domainTitles: ["Especialidades", "Ficha de Google", "Citas", "Contenido clínico"],
    whyTitles: ["La recepción no filtra ruido", "Las páginas hablan como el consultorio", "El gasto sigue a las citas, no a los clics"],
  },
  dental: {
    title: "Odontología",
    navLabel: "Odontología",
    eyebrow: "Clínicas dentales",
    summary: "Pacientes nuevos, sin competir solo con cupones.",
    heroCopy:
      "La gente busca cuando algo duele o cuando un momento de la vida obliga a decidir. Armamos presencia local y anuncios que agendan revisiones y consultas que vale la pena conservar.",
    problemCopy:
      "Si todos anuncian la misma limpieza, la clínica baja el precio. El sitio lista servicios y no explica el tratamiento. Los anuncios compran «dentista» a secas. La recepción llena la agenda de quien se va al terminar la promo.",
    approachCopy:
      "Rehacemos cómo te encuentran para el trabajo que quieres más: implantes, ortodoncia, estética, familia. Las páginas responden las preguntas reales. Los anuncios apuntan a intención que puede volverse tratamiento.",
    help: [
      { title: "Páginas de tratamiento", detail: "Lo que duele, lo que cuesta entender y qué pasa en la primera visita." },
      { title: "Mapas y reseñas", detail: "La ficha que gana la llamada cuando alguien busca cerca." },
      { title: "Anuncios que no compran curiosos", detail: "Menos «limpieza gratis» y más consultas que se quedan." },
    ],
    domainTitles: ["Implantes", "Ortodoncia", "Estética", "Odontología familiar"],
    whyTitles: ["No vives de la promo", "El paciente entiende el tratamiento", "La agenda se llena con quien se queda"],
  },
  legal: {
    title: "Abogados",
    navLabel: "Abogados",
    eyebrow: "Despachos",
    summary: "Consultas que no queman el tiempo del abogado.",
    heroCopy:
      "La gente busca abogado cuando el problema ya está en marcha. Armamos las áreas de práctica y una admisión que filtra la consulta antes de ocupar el calendario.",
    problemCopy:
      "Los directorios venden contactos que nunca firman. El sitio esconde las áreas debajo de biografías tiesas. Los anuncios pujan palabras que el despacho no puede atender con margen. La admisión pasa la mañana separando ruido.",
    approachCopy:
      "Vemos qué búsquedas y qué huecos de referencia corresponden a tus materias, y rehacemos páginas y campañas alrededor de eso. El SEO construye autoridad. Los anuncios compran intención que puedes pagar.",
    help: [
      { title: "Páginas por materia", detail: "El caso que atiendes, dicho en el idioma de quien lo busca." },
      { title: "Admisión que filtra", detail: "La consulta llega con contexto, no como un formulario vacío." },
      { title: "Anuncios con margen", detail: "Se corta lo que el despacho no puede atender bien." },
    ],
    domainTitles: ["Materias", "Admisión", "Ficha local", "Contenido de autoridad"],
    whyTitles: ["Menos consultas que no son caso", "El sitio habla de la materia, no del premio", "El abogado entra cuando ya hay un caso"],
    discover: ["Derecho de familia", "Lesiones", "Laboral", "Inmigración", "Empresas", "Bienes raíces", "Penal", "Sucesiones"],
  },
  "real-estate": {
    title: "Bienes raíces",
    navLabel: "Bienes raíces",
    eyebrow: "Propiedades",
    summary: "Conversaciones reales con compradores y vendedores.",
    heroCopy:
      "Comprador y vendedor necesitan una razón clara para hablar contigo. Armamos presencia de mercado y anuncios que convierten la búsqueda en una cita antes de que el contacto se enfríe.",
    problemCopy:
      "Cuando el portal se queda con la relación, pagas contactos que medio mercado ya vio. El sitio parece un folleto. Los anuncios mandan a páginas que no piden el siguiente paso.",
    approachCopy:
      "Construimos autoridad de zona que controlas, apretamos cómo convierten las fichas y las ofertas al vendedor, y corremos anuncios hacia conversaciones reales. El portal puede seguir. No debería ser el único plan.",
    help: [
      { title: "Páginas de zona", detail: "El barrio y el tipo de operación, no un listado genérico." },
      { title: "Captación de vendedores", detail: "Una oferta clara para quien está pensando en salir al mercado." },
      { title: "Anuncios que piden la cita", detail: "El clic tiene un siguiente paso, no una portada muda." },
    ],
    domainTitles: ["Compradores", "Vendedores", "Zonas", "Anuncios"],
    whyTitles: ["No dependes solo del portal", "La ficha pide el siguiente paso", "La cita llega antes de que se enfríe"],
  },
  restaurants: {
    title: "Restaurantes",
    navLabel: "Restaurantes",
    eyebrow: "Hospitalidad",
    summary: "Mesas y reservas que de verdad puedes atender.",
    heroCopy:
      "El comensal mira el mapa, lee reseñas y decide rápido. Armamos la presencia local y los anuncios para que ese vistazo se vuelva reserva o pedido.",
    problemCopy:
      "La noche fuerte se siente bien hasta que el martes flojo se vuelve costumbre. Muchos sitios esconden la carta, pelean con el celular o mandan anuncios a páginas que no reservan. Las redes se ven vivas y el libro, no.",
    approachCopy:
      "Apretamos cómo apareces en Maps y en la búsqueda, dejamos obvio cómo reservar o pedir, y anunciamos cuando de verdad necesitas mesas. La pieza sirve a la reserva y al ticket.",
    help: [
      { title: "Mapas y reseñas", detail: "La ficha que gana la decisión de esta noche." },
      { title: "Carta y reserva en el celular", detail: "Ver el menú y apartar mesa no debería ser una búsqueda." },
      { title: "Anuncios cuando faltan mesas", detail: "Se empuja el turno flojo, no el que ya está lleno." },
    ],
    domainTitles: ["Reservas", "Pedidos", "Mapas", "Carta"],
    whyTitles: ["El martes también tiene un plan", "Reservar se entiende en el celular", "El anuncio llena un turno, no un informe"],
  },
  saas: {
    title: "Software",
    navLabel: "Software",
    eyebrow: "Producto",
    summary: "Demos que ventas puede trabajar este trimestre.",
    heroCopy:
      "Quien compra compara funciones, precio y prueba antes de hablar con ventas. Armamos páginas y adquisición para quien quiere una demo de verdad, no un contacto tibio.",
    problemCopy:
      "Se publican notas que no tocan una búsqueda de compra. Los anuncios compran palabras anchas mientras la página del producto no se compromete. Ventas se queja de demos que nunca iban a cerrar. El costo de conseguir un cliente sube y las ventas no.",
    approachCopy:
      "Aclaramos para quién es el producto, rehacemos las páginas que cargan la intención de compra y corremos anuncios hacia experiencias que filtran. El SEO recoge demanda que no deberías alquilar para siempre.",
    help: [
      { title: "Páginas que comparan de verdad", detail: "Precio, para quién es y qué pasa después de la demo." },
      { title: "SEO de producto", detail: "Las búsquedas de quien ya está evaluando, no de quien lee un glosario." },
      { title: "Anuncios que ventas acepta", detail: "La demo llega con contexto. Si no encaja, no entra." },
    ],
    domainTitles: ["Producto", "Precio", "Demos", "Contenido de compra"],
    whyTitles: ["Ventas deja de filtrar curiosos", "La página dice para quién no es", "El costo de la demo se puede mirar"],
    discover: ["SaaS", "Fintech", "Demos", "Prueba gratis", "SEO de producto", "Precios", "Onboarding", "Contenido técnico"],
  },
  automotive: {
    title: "Agencias de autos",
    navLabel: "Agencias de autos",
    eyebrow: "Venta y taller",
    summary: "Citas de venta y de taller que el mostrador puede trabajar.",
    heroCopy:
      "Quien compra compara inventario y reseñas con prisa. Armamos búsqueda y anuncios para que esa intención se vuelva cita de venta o de taller.",
    problemCopy:
      "El presupuesto se va a leads de terceros y a campañas anchas de vehículos, y el taller queda de lado. El sitio va lento en el celular. El formulario pide todo y no convierte. El mostrador está quieto mientras el tablero habla de interacción.",
    approachCopy:
      "Rehacemos los caminos de venta y de taller según cómo la gente reserva, apretamos la visibilidad local que controlas y corremos anuncios con cita como meta. Los canales de la marca pueden seguir.",
    help: [
      { title: "Venta y taller, los dos", detail: "Páginas que piden la cita, no solo el inventario." },
      { title: "Visibilidad del local", detail: "Que te encuentren a ti y al servicio, no solo al portal." },
      { title: "Anuncios con un corte", detail: "Menos clics eternos a la ficha del auto y más citas." },
    ],
    domainTitles: ["Venta", "Taller", "Maps", "Grupos"],
    whyTitles: ["El taller no es un resto", "La ficha pide una cita", "Sabes qué anuncio trajo al mostrador"],
  },
  fitness: {
    title: "Fitness",
    navLabel: "Fitness",
    eyebrow: "Socios",
    summary: "Socios que vuelven cuando se acaba la promo de entrada.",
    heroCopy:
      "La gente se apunta cuando el primer paso se siente fácil. Armamos presencia local y un camino de prueba que convierte la intención de cerca en socios que se quedan.",
    problemCopy:
      "Si cada mes la promo de entrada es más agresiva, enseñas al cliente a esperar. El sitio esconde horarios y precios. Los anuncios mandan a páginas que no reservan la prueba. Recepción gasta energía en quien no llega.",
    approachCopy:
      "Apretamos cómo apareces en la zona, rehacemos el camino de la clase de prueba para que el siguiente paso sea obvio, y anunciamos contra la capacidad que puedes absorber.",
    help: [
      { title: "La prueba, fácil de reservar", detail: "Horario, precio y el botón, en la primera pantalla." },
      { title: "Búsqueda de barrio", detail: "Quien busca «gym cerca» te encuentra con reseñas, no con un cupón." },
      { title: "Anuncios según el cupo", detail: "Se llena la clase que tiene lugar, no la que ya está llena." },
    ],
    domainTitles: ["Gimnasios", "Estudios", "Prueba", "Membresías"],
    whyTitles: ["La promo no es el modelo", "Reservar la prueba es obvio", "El socio se queda después del mes uno"],
  },
  construction: {
    title: "Construcción",
    navLabel: "Construcción",
    eyebrow: "Obra",
    summary: "Proyectos que vale la pena mandar a ver.",
    heroCopy:
      "El cliente contrata cuando el proyecto es real. Armamos búsqueda, prueba y anuncios para que esa intención seria llegue a una visita que tu estimador puede confiar.",
    problemCopy:
      "Los contratistas se ahogan en formularios de quien busca el número más bajo. El sitio muestra unas fotos y un teléfono. Los anuncios compran «contratista cerca» a lo ancho. El trabajo bueno se lo queda quien explica mejor el proceso.",
    approachCopy:
      "Marcamos los tipos de obra y los clientes que le quedan a tu cuadrilla, rehacemos las páginas alrededor de esos trabajos y corremos anuncios pensando en quién califica. El camino deja las expectativas claras antes de que salga el estimador.",
    help: [
      { title: "Páginas por tipo de obra", detail: "El trabajo que haces, con prueba, no un listado de oficios." },
      { title: "Un filtro antes de la visita", detail: "Quien pide presupuesto ya entiende alcance y zona." },
      { title: "Anuncios del trabajo que quieres cotizar", detail: "Menos curiosos y más visitas que tienen obra." },
    ],
    domainTitles: ["Remodelación", "Obra nueva", "Comercial", "Estimados"],
    whyTitles: ["El estimador no pierde la mañana", "La página enseña el proceso", "El anuncio trae obra, no precio"],
    discover: ["Remodelación", "Obra nueva", "Comercial", "Techos", "Concreto", "Estimados"],
  },
  "professional-services": {
    title: "Servicios profesionales",
    navLabel: "Servicios profesionales",
    eyebrow: "Firmas",
    summary: "Conversaciones que un socio puede cobrar.",
    heroCopy:
      "Quien contrata compara credibilidad rápido. Armamos las líneas de servicio y los anuncios para que la investigación se vuelva una conversación que el socio sí toma.",
    problemCopy:
      "Casi todos los sitios listan servicios con las mismas palabras y esconden cómo se trabaja de verdad. Se publica por publicar. Los anuncios compran palabras anchas. El socio pierde horas en llamadas que nunca iban a ser encargo.",
    approachCopy:
      "Aclaramos a quién sirves y qué vendes, rehacemos las páginas alrededor de esos encargos y llevamos la adquisición por un camino que filtra. El mensaje es lo bastante concreto para que quien no encaja se vaya solo.",
    help: [
      { title: "Páginas por línea de servicio", detail: "Qué se contrata, cómo empieza y para quién no es." },
      { title: "Prueba que un socio firmaría", detail: "Casos y criterio, no una lista de premios." },
      { title: "Anuncios que llegan filtrados", detail: "La llamada ya trae el tipo de encargo." },
    ],
    domainTitles: ["Consultoría", "Contabilidad", "Agencias", "Estudios"],
    whyTitles: ["El socio no filtra en la llamada", "La página dice cómo se trabaja", "El encargo llega con contexto"],
  },
  "financial-services": {
    title: "Servicios financieros",
    navLabel: "Servicios financieros",
    eyebrow: "Asesoría",
    summary: "Conversaciones de confianza, sin promesas que se vuelven en contra.",
    heroCopy:
      "Nadie contrata ayuda financiera a la ligera. Armamos la posición y las páginas para que una investigación cuidadosa se vuelva una conversación que el asesor sí atiende.",
    problemCopy:
      "El sitio genérico promete «patrimonio integral» y no dice nada concreto. El contenido evita el detalle para no arriesgar, y desaparece. Los anuncios compran palabras anchas y la página no se compromete. El prospecto elige a quien se entiende.",
    approachCopy:
      "Aclaramos a quién atiendes y cómo es el trabajo, armamos páginas que responden preguntas reales dentro de lo que se puede decir, y corremos anuncios hacia una cita. La confianza es el producto. El marketing tiene que sonar así.",
    help: [
      { title: "Para quién es, dicho claro", detail: "Patrimonio, etapa y tipo de encargo, sin la frase que sirve para todos." },
      { title: "Páginas que se pueden publicar", detail: "Útiles, concretas y dentro de lo que compliance deja decir." },
      { title: "Anuncios hacia una conversación", detail: "La cita llega con contexto, no con una promesa de rendimiento." },
    ],
    domainTitles: ["Asesoría", "Planificación", "Empresas", "Citas"],
    whyTitles: ["Se entiende a quién atiendes", "Nada que compliance tenga que borrar después", "La cita es una conversación, no un lead frío"],
  },
  fintech: {
    title: "Fintech",
    navLabel: "Fintech",
    eyebrow: "Demanda con confianza",
    summary: "Pipeline que cuentas reales pueden cerrar.",
    heroTitle: "Marketing",
    heroSignal: "para fintech.",
    metaTitle: "Agencia de marketing para fintech",
    metaDescription:
      "SEO de producto, páginas de confianza y anuncios para pagos, crédito y software financiero que necesita demos reales.",
    ctaTitle: "¿Los demos no pasan el filtro de riesgo?",
    ctaCopy: "Mándanos el producto y el ICP. Te decimos qué arreglar antes de gastar más.",
    heroCopy:
      "El comprador compara riesgo, precio y quién más lo usa antes de hablar con ventas. Armamos páginas y captación para esa evaluación, no para MQLs flojos.",
    problemCopy:
      "La mayoría de sitios fintech suenan a pitch. Los anuncios compran software genérico. El contenido no nombra la licencia ni el caso de uso. Ventas hereda demos que nunca iban a fondear una cuenta.",
    approachCopy:
      "Ponemos prueba, elegibilidad y el trabajo a resolver en la página. Luego atamos SEO y paid a las búsquedas que ya escribe el comprador de finanzas.",
    help: [
      { title: "Páginas de confianza", detail: "Seguridad, cumplimiento y para quién es, en la primera pantalla." },
      { title: "SEO de producto fintech", detail: "Categoría, comparación e integraciones con intención comercial." },
      { title: "Anuncios con filtro de comprador", detail: "Búsqueda partida por línea de producto, sin comprar el keyword equivocado." },
    ],
    domainTitles: ["Pagos", "Crédito", "Banca", "Software financiero"],
    whyTitles: ["Cuentas fondeadas, no tráfico", "Copy que legal puede publicar", "No es un retainer de SaaS genérico"],
  },
  education: {
    title: "Educación",
    navLabel: "Educación",
    eyebrow: "Admisiones",
    summary: "Consultas que admisiones puede trabajar.",
    heroCopy:
      "Padres y alumnos investigan con calma y después se frenan. Armamos páginas de programa y un camino de consulta que admisiones puede trabajar, en las fechas de inicio que importan.",
    problemCopy:
      "Muchos sitios se ven cuidados y no responden lo práctico: cuánto cuesta, el horario, para quién es, qué pasa después de escribir. Los anuncios mandan tráfico a esa niebla. Admisiones persigue contactos flojos mientras otro se queda las búsquedas serias.",
    approachCopy:
      "Rehacemos las páginas de programa alrededor de las preguntas reales, apretamos la búsqueda local y temática, y corremos anuncios hacia un siguiente paso concreto. El marketing le sirve a admisiones.",
    help: [
      { title: "Páginas de programa", detail: "Costo, horario, para quién es y qué pasa al apuntarse." },
      { title: "La consulta, con fecha", detail: "Visita, solicitud o inicio, no un «más información»." },
      { title: "Anuncios en la ventana que importa", detail: "Se empuja cuando hay cupo y una fecha de arranque." },
    ],
    domainTitles: ["Programas", "Admisiones", "Campus", "Inicio de clases"],
    whyTitles: ["Admisiones recibe contexto", "La página responde el precio y el horario", "El anuncio cae en una fecha real"],
  },
  "beauty-wellness": {
    title: "Belleza y bienestar",
    navLabel: "Belleza y bienestar",
    eyebrow: "Reservas",
    summary: "Citas que vuelven después de la primera visita.",
    heroCopy:
      "La gente reserva cuando confía en el resultado y sacar cita es fácil. Armamos presencia local y anuncios que llenan la agenda con clientes que vale la pena conservar.",
    problemCopy:
      "Si captar depende de promos cada vez más agresivas, las sillas se llenan de quien viene una vez por el precio. El sitio esconde la carta de servicios. Los anuncios mandan a páginas bonitas que no reservan. El cliente de siempre se va con quien le puso fácil la siguiente visita.",
    approachCopy:
      "Apretamos Maps y la búsqueda local, rehacemos las páginas alrededor de los tratamientos que quieres más, y anunciamos contra la agenda que puedes llenar.",
    help: [
      { title: "Reservar, sin cacería", detail: "Servicio, precio orientativo y el botón, en el celular." },
      { title: "La ficha que gana la zona", detail: "Fotos, reseñas y los tratamientos que sí quieres vender." },
      { title: "Anuncios sin vivir de la promo", detail: "Se llena el hueco de la agenda, no se entrena al cliente a esperar el descuento." },
    ],
    domainTitles: ["Salones", "Estética", "Spas", "Reservas"],
    whyTitles: ["La promo no es la única puerta", "Sacar cita es obvio", "El cliente vuelve"],
  },
};

const spainTitles: Partial<Record<IndustrySlug, Partial<ChapterCopy>>> = {
  automotive: { title: "Concesionarios", navLabel: "Concesionarios", eyebrow: "Venta y taller" },
  legal: { title: "Abogados", navLabel: "Abogados", eyebrow: "Despachos" },
  "real-estate": { title: "Inmobiliario", navLabel: "Inmobiliario", eyebrow: "Vivienda" },
  construction: { title: "Construcción", navLabel: "Construcción", eyebrow: "Obra" },
  ecommerce: {
    eyebrow: "Tiendas online",
    heroSignal: "para tiendas.",
    ctaCopy: "Mándanos la tienda y el mes pasado. Te decimos dónde se cae la compra.",
  },
};

function copyFor(locale: Locale): Partial<Record<IndustrySlug, ChapterCopy>> {
  if (locale === "en") return {};
  const patched: Partial<Record<IndustrySlug, ChapterCopy>> = {};
  for (const [slug, chapter] of Object.entries(latam) as [IndustrySlug, ChapterCopy][]) {
    const titles = locale === "es-ES" ? spainTitles[slug] : undefined;
    patched[slug] = titles ? { ...chapter, ...titles } : chapter;
  }
  return applySpanishDialect(patched, locale);
}

export function localizeIndustry<T extends Industry>(industry: T, locale: Locale): T {
  const chapter = copyFor(locale)[industry.slug];
  if (!chapter) return industry;
  return {
    ...industry,
    title: chapter.title,
    navLabel: chapter.navLabel,
    eyebrow: chapter.eyebrow,
    summary: chapter.summary,
    heroTitle: chapter.heroTitle ?? industry.heroTitle,
    heroSignal: chapter.heroSignal ?? industry.heroSignal,
    metaTitle: chapter.metaTitle ?? industry.metaTitle,
    metaDescription: chapter.metaDescription ?? industry.metaDescription,
    ctaTitle: chapter.ctaTitle ?? industry.ctaTitle,
    ctaCopy: chapter.ctaCopy ?? industry.ctaCopy,
    heroCopy: chapter.heroCopy,
    problemTitle: chapter.problemTitle ?? "Dónde se atasca",
    problemCopy: chapter.problemCopy,
    approachTitle: chapter.approachTitle ?? "Cómo lo trabajamos",
    approachCopy: chapter.approachCopy,
    helpTitle: chapter.helpTitle ?? "Qué hacemos",
    domainsTitle: chapter.domainsTitle ?? "Dónde entra",
    whyTitle: chapter.whyTitle ?? "Por qué con nosotros",
    faqTitle: "Preguntas frecuentes.",
    help: chapter.help,
    discover: chapter.discover ?? industry.discover,
    domains: industry.domains.map((domain, index) => ({
      ...domain,
      title: chapter.domainTitles[index] ?? domain.title,
    })),
    why: industry.why.map((item, index) => ({
      ...item,
      title: chapter.whyTitles[index] ?? item.title,
    })),
  };
}
