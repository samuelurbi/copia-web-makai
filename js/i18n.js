/* Makai — cambio de idioma EN/ES autocontenido (sin servicios externos).
   Propietario: i18n. Cargado el último. Mismo estilo que main.js: IIFE
   vanilla, se salta lo que no exista.

   Mecanismo: diccionario curado en <-> es. Al alternar, recorre los
   nodos de texto de la página y cambia el contenido por su traducción
   (y a la inversa, con un mapa reverso). Cubre también placeholders del
   formulario, botones submit y opciones de <select>. El modal de FAQs se
   traduce solo (faq-modal.js escucha el evento "makai:langchange").

   Banderas: los enlaces GTranslate de la original (a[data-gt-lang]) se
   reconvierten para alternar idioma sin recargar ni salir del sitio.

   NOTA de mantenimiento: las claves son el texto EN EXACTO que aparece en
   el DOM (incluidas comillas tipográficas ’ “ ” y guiones –). Si cambia
   un texto del HTML, actualizar aquí la clave correspondiente. */
(function () {
  'use strict';

  var DICT = {
    /* ---- menú principal / header ---- */
    'CONDOS': 'CONDOS',
    'AMENITIES': 'AMENIDADES',
    'LOCATION': 'UBICACIÓN',
    'INVESTMENT': 'INVERSIÓN',
    'SALES PLATFORM': 'PLATAFORMA DE VENTAS',
    'DOWNLOADS': 'DESCARGAS',
    'BROCHURE (EN)': 'FOLLETO (EN)',
    'BROCHURE (ES)': 'FOLLETO (ES)',
    'FLOOR PLANS': 'PLANOS',
    'SPECIFICATIONS (EN)': 'ESPECIFICACIONES (EN)',
    'SHORT-TERM RENTAL PROJECTIONS': 'PROYECCIONES DE ALQUILER A CORTO PLAZO',
    'INQUIRE': 'CONSULTAR',
    'PRICE LIST': 'LISTA DE PRECIOS',

    /* ---- hero ---- */
    'CARIBBEAN': 'LUJO',
    'LUXURY': 'CARIBEÑO',
    'NOW SELLING': 'YA EN VENTA',
    'Exceptionally located within Cap Cana, Punta Cana, and just 5 minutes from the white sands and turquoise waters of Playa Juanillo, Makai enjoys a rare lakefront position framed by fresh water, the Caribbean Sea, and the newly unveiled Las Iguanas Golf Course. It’s a setting that offers a lifestyle defined by ease, elegance, and connection to nature.':
      'Excepcionalmente ubicado dentro de Cap Cana, Punta Cana, y a solo 5 minutos de las arenas blancas y aguas turquesas de Playa Juanillo, Makai disfruta de una privilegiada posición frente al lago, enmarcada por agua dulce, el Mar Caribe y el recién inaugurado Campo de Golf Las Iguanas. Un entorno que ofrece un estilo de vida definido por la comodidad, la elegancia y la conexión con la naturaleza.',
    'Designed as a fully serviced, resort-style residential address, Makai pairs contemporary tropical architecture with the comfort and consistency of luxury hotel-inspired amenities.':
      'Concebido como una dirección residencial estilo resort con servicio completo, Makai combina la arquitectura tropical contemporánea con la comodidad y consistencia de amenidades de lujo con inspiración hotelera.',
    'Professionally managed by Dolce Hotels and Resorts by Wyndham, the development offers seamless ownership, management services, and curated amenities, whether you choose to live here year-round, escape seasonally, or benefit from rental income.':
      'Gestionado profesionalmente por Dolce Hotels and Resorts by Wyndham, el desarrollo ofrece una propiedad sin complicaciones, servicios de administración y amenidades seleccionadas, ya sea que elijas vivir aquí todo el año, escaparte por temporadas o beneficiarte de los ingresos por alquiler.',
    'Phase 2 Release | 102 Luxury Condos': 'Lanzamiento Fase 2 | 102 Condos de Lujo',
    '1 & 2 Bedroom Condos & Penthouses Now Selling': 'Condos de 1 y 2 Dormitorios y Penthouses ya en Venta',
    'Priced from USD $350,000': 'Desde USD $350,000',
    'Fully Furnished & Managed by Dolce Hotels and Resorts by Wyndham': 'Totalmente Amueblados y Gestionados por Dolce Hotels and Resorts by Wyndham',
    'Estimated Completion: Q2 2029': 'Entrega Estimada: Q2 2029',
    'View Location': 'Ver Ubicación',
    'SIGN UP & VIEW PRICE LIST': 'REGISTRARSE Y VER LISTA DE PRECIOS',

    /* ---- badges / secciones cortas ---- */
    'INTERNATIONAL SPORT-FISHING HUB': 'CENTRO INTERNACIONAL DE PESCA DEPORTIVA',
    'GOLDEN BEACHES': 'PLAYAS DORADAS',
    'WORLD-CLASS GOLF': 'GOLF DE CLASE MUNDIAL',

    /* ---- bloque "Makai / Towards the Ocean" (título partido) ---- */
    'Inspired by the Hawaiian word ‘Makai’, meaning': 'Inspirado en la palabra hawaiana ‘Makai’, que significa',
    '‘Towards the Ocean’': '‘Hacia el Océano’',
    'Makai delivers': 'Makai ofrece',
    'HOTEL-INSPIRED': 'RESIDENCIAS CON',
    'RESIDENCES': 'INSPIRACIÓN HOTELERA',
    'just steps from the sea.': 'a solo pasos del mar.',

    /* ---- bloque "Contemporary Tropical Living" (título partido) ---- */
    'CONTEMPORARY': 'VIDA',
    'TROPICAL': 'TROPICAL',
    'LIVING': 'CONTEMPORÁNEA',
    'Makai’s contemporary architecture is defined by its eye-catching M-shaped building, rising across multiple floors. Sculpted forms and terraces maximize natural light, boost air circulation, provide privacy, and offer exceptional views from every condo.':
      'La arquitectura contemporánea de Makai se define por su llamativo edificio en forma de M, que se eleva a lo largo de múltiples plantas. Sus formas esculpidas y terrazas maximizan la luz natural, favorecen la circulación del aire, brindan privacidad y ofrecen vistas excepcionales desde cada condo.',
    'Front-facing residences capture lasting ocean panoramas over the lake, while rear condos overlook the championship golf course.':
      'Las residencias frontales capturan panorámicas eternas del océano sobre el lago, mientras que los condos traseros dan al campo de golf de campeonato.',
    'EXPLORE PRICE LIST': 'EXPLORAR LISTA DE PRECIOS',
    'INQUIRE NOW': 'CONSULTAR AHORA',

    /* ---- fases ---- */
    'NOW SELLING PHASE 2': 'FASE 2 EN VENTA',
    'PHASE 1 ALMOST SOLD OUT': 'FASE 1 CASI AGOTADA',

    /* ---- marquee ---- */
    'HOTEL INSPIRED RESIDENCES': 'RESIDENCIAS CON INSPIRACIÓN HOTELERA',

    /* ---- interiores ---- */
    'Interiors are calm, with generous floor plans and natural tones. Floor-to-ceiling windows invite the outdoors in, and living areas extend onto balconies for an effortless indoor-outdoor lifestyle. Each condo is a fully furnished, turnkey residence finished to hotel-grade standards. Select ground-floor condos include private jacuzzis, while some penthouses boast private rooftop terraces with plunge pools.':
      'Los interiores son serenos, con plantas amplias y tonos naturales. Ventanales de piso a techo invitan el exterior hacia adentro, y las áreas sociales se extienden hacia los balcones para un estilo de vida interior-exterior sin esfuerzo. Cada condo es una residencia llave en mano, totalmente amueblada y terminada con estándares de hotel. Algunos condos de planta baja incluyen jacuzzis privados, mientras que algunos penthouses cuentan con terrazas privadas en la azotea con piscinas de inmersión.',

    /* ---- colecciones ---- */
    'PENTHOUSE COLLECTION': 'COLECCIÓN PENTHOUSE',
    'Priced from: USD $494,000': 'Desde: USD $494,000',
    '| Sized from: 1,421 – 2,523 sqft': '| Tamaño desde: 1,421 – 2,523 sqft',
    'These exclusive one and two bedroom penthouses offer sweeping views, enhanced privacy, and expansive outdoor spaces designed for both relaxation and entertaining. Each duplex condo has a private rooftop terrace, complete with its own plunge pool, a rare sanctuary in the sky where sunrise swims and sunset gatherings become part of your daily ritual.':
      'Estos exclusivos penthouses de uno y dos dormitorios ofrecen vistas panorámicas, mayor privacidad y amplios espacios exteriores diseñados tanto para relajarse como para socializar. Cada condo dúplex tiene una terraza privada en la azotea, con su propia piscina de inmersión, un raro santuario en las alturas donde los baños al amanecer y las reuniones al atardecer se vuelven parte de tu ritual diario.',
    'BROWSE PENTHOUSE COLLECTION': 'VER COLECCIÓN PENTHOUSE',
    '2 BEDROOM CONDOS': 'CONDOS DE 2 DORMITORIOS',
    'Priced from: USD $450,000': 'Desde: USD $450,000',
    'Sized from: 1,315 – 1,481 sqft': 'Tamaño desde: 1,315 – 1,481 sqft',
    'These well-proportioned condos with terraces are ideal for families, shared living, or individuals looking for added space and flexibility in a magnificent coastal setting.':
      'Estos condos bien proporcionados con terrazas son ideales para familias, convivencia compartida o personas que buscan más espacio y flexibilidad en un magnífico entorno costero.',
    'BROWSE 2 BED COLLECTION': 'VER COLECCIÓN DE 2 DORM.',
    '1 BEDROOM CONDOS': 'CONDOS DE 1 DORMITORIO',
    'Priced from: USD $283,000 | Sized from: 759 – 1,180 sqft': 'Desde: USD $283,000 | Tamaño desde: 759 – 1,180 sqft',
    'Poised for investment, these one-bedroom condos are suited for ease of use. Certain layouts come with an additional family room or a separate studio lock-off, along with a limited number that feature private outdoor jacuzzis.':
      'Ideales para inversión, estos condos de un dormitorio están pensados para un uso práctico. Ciertas distribuciones incluyen una sala familiar adicional o un estudio independiente tipo lock-off, junto con un número limitado que cuenta con jacuzzis privados al aire libre.',
    'BROWSE 1 BED COLLECTION': 'VER COLECCIÓN DE 1 DORM.',

    /* ---- galería ---- */
    'Gallery': 'Galería',

    /* ---- incentivo de compra (título partido) ---- */
    'PURCHASE INCENTIVE': 'INCENTIVO DE COMPRA',
    'FREE DESIGNER': 'PAQUETE DE MOBILIARIO',
    'FURNITURE PACK WORTH $30K': 'DE DISEÑO GRATIS POR $30K',

    /* ---- "Where the Ocean & Landscape..." (título partido) ---- */
    'Where the': 'Donde el',
    'Ocean &': 'océano y',
    'Landscape': 'el paisaje',
    'Blend into something extraordinary.': 'se funden en algo extraordinario.',

    /* ---- "Sun, Serenity & Resort-Style Living" (título partido) ---- */
    'Sun, Serenity &': 'Sol, serenidad y',
    'Resort-': 'vida',
    'Style': 'estilo',
    'Living': 'resort',
    'At Makai, five-star living extends beyond your condo. The development has been designed as a self-contained luxury resort, featuring a complete collection of amenities that support wellbeing, leisure, productivity, and connection.':
      'En Makai, la vida cinco estrellas se extiende más allá de tu condo. El desarrollo ha sido diseñado como un resort de lujo autónomo, con una colección completa de amenidades que impulsan el bienestar, el ocio, la productividad y la conexión.',
    'Residents enjoy exclusive access to:': 'Los residentes disfrutan de acceso exclusivo a:',
    'Walk-in sand pool with swim-up bar': 'Piscina de arena de entrada gradual con bar dentro del agua',
    'Rooftop infinity pool with panoramic ocean views': 'Piscina infinita en la azotea con vistas panorámicas al océano',
    'Jacuzzis and kids’ pool': 'Jacuzzis y piscina infantil',
    'Spa and indoor gym': 'Spa y gimnasio cubierto',
    'Private lake access with kayaks and paddle boards': 'Acceso privado al lago con kayaks y tablas de paddle',
    'Restaurants, sports bar, and rooftop bar with fire pits and grills': 'Restaurantes, sports bar y bar en la azotea con fogatas y parrillas',
    'Private cinema, games lounge, and co-working spaces': 'Cine privado, sala de juegos y espacios de co-working',
    'Kids’ playground and dedicated pet park': 'Parque infantil y área dedicada para mascotas',
    'Pickleball and padel courts': 'Canchas de pickleball y pádel',
    'Commercial plaza with mini-market, pharmacy, cigar lounge, and souvenir shop': 'Plaza comercial con mini-market, farmacia, cigar lounge y tienda de souvenirs',
    'Underground parking': 'Estacionamiento subterráneo',
    'Fast internet access': 'Acceso a internet de alta velocidad',
    'Concierge & 24/7 security': 'Conserjería y seguridad 24/7',
    'All services and amenities are professionally managed by Dolce Hotels and Resorts by Wyndham, ensuring hotel-inspired standards throughout.':
      'Todos los servicios y amenidades son gestionados profesionalmente por Dolce Hotels and Resorts by Wyndham, garantizando estándares con inspiración hotelera en todo momento.',
    'EXPLORE THE PRICE LIST': 'EXPLORAR LA LISTA DE PRECIOS',

    /* ---- ubicación / Cap Cana ---- */
    'EXPLORE & DISCOVER CAP CANA': 'EXPLORA Y DESCUBRE CAP CANA',
    'EXPLORE': 'EXPLORA',
    'CAP CANA': 'CAP CANA',
    'Makai is located within Cap Cana, Punta Cana’s leading gated community. Situated 500 meters from Juanillo Beach and next to the new Las Iguanas Golf Course, Makai offers premium lakefront living in a dynamic international setting.':
      'Makai está ubicado dentro de Cap Cana, la principal comunidad cerrada de Punta Cana. Situado a 500 metros de Playa Juanillo y junto al nuevo Campo de Golf Las Iguanas, Makai ofrece una vida premium frente al lago en un entorno internacional y dinámico.',
    'Residents enjoy access to all Cap Cana amenities as members of an exclusive community.':
      'Los residentes disfrutan de acceso a todas las amenidades de Cap Cana como miembros de una comunidad exclusiva.',
    'Key Locations': 'Lugares Clave',
    'JUANILLO BEACH': 'PLAYA JUANILLO',
    'A private white-sand beachfront': 'Un frente de playa privado de arena blanca',
    'EDEN ROC BEACH CLUB': 'EDEN ROC BEACH CLUB',
    'A members-only luxury beach club': 'Un club de playa de lujo solo para socios',
    'SPA & WELLNESS': 'SPA Y BIENESTAR',
    'World-class spa & fitness experiences': 'Experiencias de spa y fitness de clase mundial',
    'ELITE SPORTS FACILITIES': 'INSTALACIONES DEPORTIVAS DE ÉLITE',
    'Tennis, padel & private clubs': 'Tenis, pádel y clubes privados',
    'NATURE RESERVES': 'RESERVAS NATURALES',
    'Landscaped trails & green zones': 'Senderos ajardinados y zonas verdes',
    'FIVE-STAR BRANDED HOTELS': 'HOTELES DE MARCA CINCO ESTRELLAS',
    'Eden Roc, Hyatt, St. Regis (planned)': 'Eden Roc, Hyatt, St. Regis (previstos)',
    'FINE DINING': 'ALTA GASTRONOMÍA',
    'Curated high-end restaurants': 'Restaurantes de alta gama seleccionados',
    'INTERNATIONAL SCHOOLS': 'COLEGIOS INTERNACIONALES',
    'Including Cap Cana Heritage': 'Incluyendo Cap Cana Heritage',
    'API BEACH CLUB': 'API BEACH CLUB',
    'Adults-only social beach club': 'Club de playa social solo para adultos',
    'MARINA CAP CANA': 'MARINA CAP CANA',
    'Mega-yacht marina and waterfront lifestyle': 'Marina de mega-yates y estilo de vida frente al mar',
    'FISHING LODGE & MARINA': 'FISHING LODGE Y MARINA',
    'An international sport-fishing hub': 'Un centro internacional de pesca deportiva',
    'PUNTA ESPADA GOLF CLUB': 'PUNTA ESPADA GOLF CLUB',
    'Jack Nicklaus Signature course': 'Campo Jack Nicklaus Signature',
    'LOS ESTABLOS EQUESTRIAN CENTRE': 'CENTRO ECUESTRE LOS ESTABLOS',
    'Polo & private riding trails': 'Polo y senderos privados de equitación',
    'EL DORADO WATER PARK': 'PARQUE ACUÁTICO EL DORADO',
    'Luxury family water park': 'Parque acuático familiar de lujo',
    'SCAPE PARK CAP CANA': 'SCAPE PARK CAP CANA',
    'Protected eco-reserve & cenote': 'Eco-reserva protegida y cenote',

    /* ---- inversión (título partido "A Lifestyle That Performs") ---- */
    'A LIFESTYLE': 'UN ESTILO DE VIDA',
    'THAT PERFORMS': 'QUE RINDE',
    'Cap Cana’s strong international demand, limited development supply, and ongoing infrastructure improvements support lasting value and capital appreciation. Dolce Hotels and Resorts by Wyndham’s professional rental management brings global brand recognition and consistent service, making rental income effortless for owners.':
      'La fuerte demanda internacional de Cap Cana, la oferta limitada de desarrollos y las continuas mejoras de infraestructura respaldan un valor duradero y la apreciación del capital. La gestión profesional de alquileres de Dolce Hotels and Resorts by Wyndham aporta reconocimiento de marca global y un servicio consistente, haciendo que los ingresos por alquiler sean fáciles para los propietarios.',
    'Ownership is further enhanced by registration under CONFOTUR, the Dominican Republic’s leading tourism incentive program. Enjoy valuable tax benefits, including no 3% transfer tax at purchase and exemption from property tax (IPI) for the first 15 years. Together, these advantages make this one of the most tax-efficient real estate opportunities in the Caribbean.':
      'La propiedad se potencia aún más con el registro bajo CONFOTUR, el principal programa de incentivos turísticos de la República Dominicana. Disfruta de valiosos beneficios fiscales, incluyendo la exención del 3% de impuesto de transferencia en la compra y la exención del impuesto a la propiedad (IPI) durante los primeros 15 años. En conjunto, estas ventajas hacen de esta una de las oportunidades inmobiliarias más eficientes en impuestos del Caribe.',
    'DOWNLOAD ROI\'s': 'DESCARGAR ROI',

    /* ---- plataforma de ventas (título partido "What You Need to Know") ---- */
    'Online Sales Platform': 'Plataforma de Ventas en Línea',
    'What You': 'Lo Que',
    'Need to Know': 'Debes Saber',
    'Sales are now live and can be secured directly through the interactive sales platform which gives buyers the ability to explore, compare, and pre-select condos in advance, then reserve their condo via a secure reservation.':
      'Las ventas ya están activas y pueden asegurarse directamente a través de la plataforma de ventas interactiva, que permite a los compradores explorar, comparar y preseleccionar condos con antelación, y luego reservar su condo mediante una reserva segura.',
    'Step One | Create Your Buyer Profile': 'Paso Uno | Crea Tu Perfil de Comprador',
    'Register on the secure Makai sales platform to unlock full access to available condos.':
      'Regístrate en la plataforma segura de ventas de Makai para desbloquear el acceso completo a los condos disponibles.',
    'Step Two | Shortlist Your Preferred Condos': 'Paso Dos | Preselecciona Tus Condos Favoritos',
    'Browse floor plans and layouts, then shortlist your favorite condos.':
      'Explora los planos y distribuciones, y luego preselecciona tus condos favoritos.',
    'Step Three | Reserve Your Condo': 'Paso Tres | Reserva Tu Condo',
    'A fully secure USD $2,000 reservation fee is required to reserve your chosen condo.':
      'Se requiere una tarifa de reserva totalmente segura de USD $2,000 para reservar el condo que elijas.',
    'DOWNLOAD NOW': 'DESCARGAR AHORA',

    /* ---- destacados de inversión (título partido) ---- */
    'INVESTMENT HIGHLIGHTS': 'PUNTOS CLAVE DE INVERSIÓN',
    'NO TRANSFER DUTIES OR': 'SIN IMPUESTOS DE TRANSFERENCIA NI',
    'PROPERTY TAXES FOR 15 YEARS': 'IMPUESTOS A LA PROPIEDAD POR 15 AÑOS',

    /* ---- equipo ---- */
    'MEET THE TEAM BEHIND MAKAI': 'CONOCE AL EQUIPO DETRÁS DE MAKAI',

    /* ---- contacto (título partido "Get in Touch") ---- */
    'THANK YOU FOR YOUR INTEREST': 'GRACIAS POR TU INTERÉS',
    'Get in': 'Ponte en',
    'Touch': 'Contacto',
    'Please complete the form below and we will get back to you as soon as possible.':
      'Completa el formulario a continuación y te responderemos lo antes posible.',
    'By submitting your data, you agree to our': 'Al enviar tus datos, aceptas nuestros',
    'Ts&Cs': 'Términos',
    'and': 'y',
    'Privacy Policy.': 'Política de Privacidad.',
    'Agents': 'Agentes',
    'VIEW ON GOOGLE MAPS': 'VER EN GOOGLE MAPS',

    /* ---- formulario ---- */
    'First Name': 'Nombre',
    'Last Name': 'Apellido',
    'Phone': 'Teléfono',
    'Email': 'Correo electrónico',
    'SUBMIT': 'ENVIAR',
    'Search': 'Buscar',
    '— Where are you located? —': '— ¿Dónde te ubicas? —',
    'Dominican Republic': 'República Dominicana',
    '— Select an option —': '— Selecciona una opción —',
    'Buying to live': 'Compra para vivir',
    'Buying as an investment': 'Compra como inversión',
    'Buying for a holiday residence': 'Compra para residencia vacacional',
    'Not a buyer - just curious': 'No soy comprador, solo curioseando',

    /* ---- footer ---- */
    'PRIVACY POLICY': 'POLÍTICA DE PRIVACIDAD',
    'TERMS & CONDITIONS': 'TÉRMINOS Y CONDICIONES',
    'DISCLAIMER': 'AVISO LEGAL',
    'All Rights Reserved.': 'Todos los derechos reservados.',

    /* ---- misceláneos ---- */
    'Skip to main content': 'Saltar al contenido principal',
    'Menu': 'Menú',
    'How can we help?': '¿Cómo podemos ayudarte?'
  };

  /* mapa reverso es -> en (primer valor gana ante colisiones) */
  var REV = {};
  for (var k in DICT) { if (DICT[k] && REV[DICT[k]] === undefined) REV[DICT[k]] = k; }

  var STORAGE = 'makai-lang';
  var lang = (localStorage.getItem(STORAGE) === 'es') ? 'es' : 'en';
  window.MAKAI_LANG = lang;

  var SKIP = '#faq-modal, script, style, noscript, .notranslate, .gtranslate_wrapper, .screen-reader-text';

  function traducirTexto(map) {
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        if (!n.nodeValue || !n.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        var el = n.parentElement;
        if (!el || (el.closest && el.closest(SKIP))) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var node;
    while ((node = walker.nextNode())) {
      var raw = node.nodeValue, t = raw.trim(), tr = map[t];
      if (tr && tr !== t) node.nodeValue = raw.replace(t, tr);
    }
  }

  function traducirAtributos(map) {
    document.querySelectorAll('[placeholder]').forEach(function (el) {
      if (el.closest(SKIP)) return;
      var tr = map[(el.getAttribute('placeholder') || '').trim()];
      if (tr) el.setAttribute('placeholder', tr);
    });
    document.querySelectorAll('input[type="submit"], input[type="button"]').forEach(function (el) {
      var tr = map[(el.value || '').trim()];
      if (tr) el.value = tr;
    });
    document.querySelectorAll('option').forEach(function (op) {
      var t = op.textContent.trim(), tr = map[t];
      if (tr && tr !== t) op.textContent = tr;
    });
  }

  function marcarBanderas(l) {
    document.querySelectorAll('a[data-gt-lang]').forEach(function (a) {
      a.classList.toggle('mk-lang-active', a.getAttribute('data-gt-lang') === l);
    });
  }

  function aplicar(l) {
    var map = (l === 'es') ? DICT : REV;
    traducirTexto(map);
    traducirAtributos(map);
    document.documentElement.setAttribute('lang', l);
    lang = l;
    window.MAKAI_LANG = l;
    try { localStorage.setItem(STORAGE, l); } catch (e) { }
    document.dispatchEvent(new CustomEvent('makai:langchange', { detail: { lang: l } }));
    marcarBanderas(l);
    if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
  }

  function setLang(l) {
    if ((l !== 'en' && l !== 'es') || l === lang) return;
    aplicar(l);
  }
  window.MAKAI_setLang = setLang;

  /* banderas GTranslate -> alternar idioma sin recargar */
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[data-gt-lang]');
    if (!a) return;
    e.preventDefault();
    setLang(a.getAttribute('data-gt-lang'));
  });

  /* aplicar el idioma guardado al cargar */
  if (lang === 'es') aplicar('es'); else marcarBanderas('en');
})();
