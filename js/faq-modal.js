/* Makai — modal de FAQs. Reemplaza la página /faqs/ de la original
   por un modal que abre desde los enlaces "FAQS" (menú desktop,
   menú móvil y footer). Propietario: faq-modal. Cargado después de
   main.js. Mismo estilo que main.js: IIFE vanilla + GSAP, se salta
   si no hay markup/GSAP. Contenido copiado 1:1 de makai-capcana.com/faqs/.

   Bilingüe (EN/ES): cada sección y pregunta tiene su versión en español.
   Se construye en el idioma activo (window.MAKAI_LANG, gestionado por
   i18n.js) y se re-renderiza al recibir el evento "makai:langchange". */
(function () {
  'use strict';
  if (typeof gsap === 'undefined') return;

  var UI = {
    en: { titulo: 'Frequently Asked Questions' },
    es: { titulo: 'Preguntas Frecuentes' }
  };

  /* ---- contenido (secciones y preguntas, en el orden de la original) ---- */
  var DATA = [
    {
      seccion: 'DEVELOPMENT TEAM', seccion_es: 'EQUIPO DE DESARROLLO',
      items: [
        {
          q: 'Developer', q_es: 'Desarrollador',
          a: '<p><strong>Duna Development</strong></p><p>Makai Residences is developed by Duna Development, a Dominican-based real estate company with a proven track record of delivering residential and commercial projects in the Punta Cana and Santo Domingo regions. The group is led by Josué Virgen, José González and Osman Alper who have successfully launched multiple buildings and secured the exclusive license to deliver the first Lamborghini-branded residences in the Caribbean. With a dynamic portfolio and strong industry reputation, Duna is regarded as one of the fastest-growing development firms in the Dominican Republic. Their in-house team combines over 15 years of engineering and construction expertise, ensuring a blend of international standards and local execution capability.</p><p><a href="https://dunadevelopment.com/" target="_blank" rel="noopener">www.dunadevelopment.com</a></p>',
          a_es: '<p><strong>Duna Development</strong></p><p>Makai Residences es desarrollado por Duna Development, una empresa inmobiliaria dominicana con una trayectoria comprobada en la entrega de proyectos residenciales y comerciales en las regiones de Punta Cana y Santo Domingo. El grupo está liderado por Josué Virgen, José González y Osman Alper, quienes han lanzado con éxito múltiples edificios y asegurado la licencia exclusiva para entregar las primeras residencias de marca Lamborghini en el Caribe. Con un portafolio dinámico y una sólida reputación en el sector, Duna es considerada una de las firmas de desarrollo de más rápido crecimiento en la República Dominicana. Su equipo interno combina más de 15 años de experiencia en ingeniería y construcción, garantizando una mezcla de estándares internacionales y capacidad de ejecución local.</p><p><a href="https://dunadevelopment.com/" target="_blank" rel="noopener">www.dunadevelopment.com</a></p>'
        },
        {
          q: 'Architect', q_es: 'Arquitecto',
          a: '<p><b>M+Group</b></p><p>The project was designed by <b>M+</b>, an award-winning architectural firm based in Medellín, Colombia. M+ is internationally recognized for their innovative approach to vertical residential buildings, having won prestigious global awards in 2017 and 2018 for design excellence. Their philosophy balances lifestyle functionality, modern design aesthetics, and sustainability. For Makai, M+ has created a contemporary tropical-modern structure that blends seamlessly with its Cap Cana setting, maximizing natural light, lake frontage, and views of both the Caribbean Sea and the new Las Iguanas golf course.</p><p><a href="https://mgroup.com.co/" target="_blank" rel="noopener">www.mgroup.com.co</a></p>',
          a_es: '<p><b>M+Group</b></p><p>El proyecto fue diseñado por <b>M+</b>, una firma de arquitectura galardonada con sede en Medellín, Colombia. M+ es reconocida internacionalmente por su enfoque innovador en edificios residenciales verticales, habiendo ganado prestigiosos premios globales en 2017 y 2018 por excelencia en diseño. Su filosofía equilibra la funcionalidad del estilo de vida, la estética del diseño moderno y la sostenibilidad. Para Makai, M+ ha creado una estructura tropical-moderna contemporánea que se integra a la perfección con su entorno en Cap Cana, maximizando la luz natural, el frente al lago y las vistas tanto del Mar Caribe como del nuevo campo de golf Las Iguanas.</p><p><a href="https://mgroup.com.co/" target="_blank" rel="noopener">www.mgroup.com.co</a></p>'
        },
        {
          q: 'Construction Team', q_es: 'Equipo de Construcción',
          a: '<p>Duna Development will oversee the entire construction process with their in-house engineering and construction division. This team has successfully executed several large-scale residential buildings in the Dominican Republic and is backed by 15 years of hands-on experience with concrete structures in coastal environments, ensuring long-term durability.</p>',
          a_es: '<p>Duna Development supervisará todo el proceso de construcción con su división interna de ingeniería y construcción. Este equipo ha ejecutado con éxito varios edificios residenciales a gran escala en la República Dominicana y está respaldado por 15 años de experiencia práctica con estructuras de concreto en entornos costeros, garantizando durabilidad a largo plazo.</p>'
        },
        {
          q: 'Interior Designers', q_es: 'Diseñadores de Interiores',
          a: '<p>The interiors have been curated by <b>M+</b> in collaboration with <b>Dolce Hotels and Resorts by Wyndham</b>, ensuring that every unit is delivered fully furnished to a hotel-standard, “turnkey” condition. Owners will benefit from a consistent design language across all condos — with neutral tones, premium finishes, and high-quality furniture that reflects modern tropical luxury — making it suitable both for personal use and hotel-standard rental operations.</p>',
          a_es: '<p>Los interiores han sido diseñados por <b>M+</b> en colaboración con <b>Dolce Hotels and Resorts by Wyndham</b>, garantizando que cada unidad se entregue totalmente amueblada en condición “llave en mano” con estándar de hotel. Los propietarios se beneficiarán de un lenguaje de diseño consistente en todos los condos — con tonos neutros, acabados premium y mobiliario de alta calidad que refleja el lujo tropical moderno — haciéndolo apto tanto para uso personal como para operaciones de alquiler con estándar hotelero.</p>'
        },
        {
          q: 'Transferring Attorney', q_es: 'Abogado de Transferencia',
          a: '<p><b>AlterLegal – Strategic Legal Consultants</b></p><p>Makai has partnered with AlterLegal, a Dominican strategic legal consultancy, to handle all property transfers on the project at a preferential rate of 0.65% of the property value (compared to the standard 1-1.5%). Notary fees are included.</p><p>As your appointed legal counsel, AlterLegal has a legal and fiduciary duty to act on your behalf and in your best interest throughout the transaction. Comprehensive due diligence on the Makai project has already been completed.</p><p>Jose Alejandro Fernandez: <a href="mailto:jfernandez@alterlegal.do" target="_blank" rel="noopener">jfernandez@alterlegal.do</a><br>Miguel Brache: <a href="mailto:mbrache@alterlegal.do" target="_blank" rel="noopener">mbrache@alterlegal.do</a><br>Office: <a href="tel:8297345730" target="_blank" rel="noopener">829-734-5730</a> | Cell: <a href="tel:8498698265" target="_blank" rel="noopener">849-869-8265</a></p><p><a href="https://alterlegal.do" target="_blank" rel="noopener">www.alterlegal.do</a></p><p>Buyers are also free to appoint their own independent attorney if they prefer.</p>',
          a_es: '<p><b>AlterLegal – Strategic Legal Consultants</b></p><p>Makai se ha aliado con AlterLegal, una consultoría legal estratégica dominicana, para gestionar todas las transferencias de propiedad del proyecto a una tarifa preferencial del 0.65% del valor de la propiedad (frente al estándar de 1-1.5%). Los honorarios notariales están incluidos.</p><p>Como tu asesor legal designado, AlterLegal tiene el deber legal y fiduciario de actuar en tu nombre y en tu mejor interés durante toda la transacción. Ya se ha completado una debida diligencia integral sobre el proyecto Makai.</p><p>Jose Alejandro Fernandez: <a href="mailto:jfernandez@alterlegal.do" target="_blank" rel="noopener">jfernandez@alterlegal.do</a><br>Miguel Brache: <a href="mailto:mbrache@alterlegal.do" target="_blank" rel="noopener">mbrache@alterlegal.do</a><br>Oficina: <a href="tel:8297345730" target="_blank" rel="noopener">829-734-5730</a> | Celular: <a href="tel:8498698265" target="_blank" rel="noopener">849-869-8265</a></p><p><a href="https://alterlegal.do" target="_blank" rel="noopener">www.alterlegal.do</a></p><p>Los compradores también son libres de designar su propio abogado independiente si lo prefieren.</p>'
        },
        {
          q: 'Financing Options', q_es: 'Opciones de Financiamiento',
          a: '<p>Makai offers three structured payment plans, each beginning with a USD $2,000 deposit (applied toward your purchase price):</p><ul><li><b>Option A (Standard): </b>25% down payment within 30 days, 35% during construction, balance due 60 days before delivery.</li><li><b>Option B (2% discount): </b>60% down payment within 30 days, balance due 60 days before delivery.</li><li><b>Option C (4% discount): </b>80% down payment within 30 days, balance due 60 days before delivery.</li></ul><p>Bank financing is also available through major Dominican banks including Banreservas and Banco Popular, with 25–40% down payment and 50–70% LTV for foreign buyers. Mortgage repayments begin only upon project completion and title transfer.</p>',
          a_es: '<p>Makai ofrece tres planes de pago estructurados, cada uno comenzando con un depósito de USD $2,000 (aplicado a tu precio de compra):</p><ul><li><b>Opción A (Estándar): </b>25% de inicial dentro de 30 días, 35% durante la construcción, saldo a pagar 60 días antes de la entrega.</li><li><b>Opción B (2% de descuento): </b>60% de inicial dentro de 30 días, saldo a pagar 60 días antes de la entrega.</li><li><b>Opción C (4% de descuento): </b>80% de inicial dentro de 30 días, saldo a pagar 60 días antes de la entrega.</li></ul><p>También hay financiamiento bancario disponible a través de los principales bancos dominicanos, incluyendo Banreservas y Banco Popular, con 25–40% de inicial y 50–70% de LTV para compradores extranjeros. Los pagos de la hipoteca comienzan solo al completar el proyecto y transferir el título.</p>'
        },
        {
          q: 'Rental Operator', q_es: 'Operador de Alquiler',
          a: '<p>Makai Residences will be operated under the <strong>Dolce Hotels and Resorts by Wyndham</strong> brand, one of Wyndham’s highest-tier luxury hotel brands. Wyndham brings decades of hospitality management experience, and global booking power, ensuring consistent hotel-quality service standards while maximizing occupancy and rental yields for owners.</p>',
          a_es: '<p>Makai Residences será operado bajo la marca <strong>Dolce Hotels and Resorts by Wyndham</strong>, una de las marcas de hoteles de lujo de más alto nivel de Wyndham. Wyndham aporta décadas de experiencia en gestión hotelera y un poder de reservas global, garantizando estándares de servicio consistentes con calidad de hotel a la vez que maximiza la ocupación y los rendimientos por alquiler para los propietarios.</p>'
        }
      ]
    },
    {
      seccion: 'BUYING PROPERTY IN THE DOMINICAN REPUBLIC', seccion_es: 'COMPRAR PROPIEDAD EN LA REPÚBLICA DOMINICANA',
      items: [
        {
          q: 'Can foreigners buy property in the Dominican Republic?', q_es: '¿Pueden los extranjeros comprar propiedad en la República Dominicana?',
          a: '<p>Yes. Foreigners have full, unrestricted property ownership rights in the Dominican Republic – equal to Dominican nationals. No citizenship, residency, or special permits are required. This has been the law since 1998 (Decree 21-98). Even tourists can legally purchase property during a visit.</p><p>A real estate investment of USD $200,000 or more also qualifies you for Dominican residency through the investment route.</p>',
          a_es: '<p>Sí. Los extranjeros tienen derechos plenos y sin restricciones de propiedad en la República Dominicana, iguales a los de los nacionales dominicanos. No se requiere ciudadanía, residencia ni permisos especiales. Así lo establece la ley desde 1998 (Decreto 21-98). Incluso los turistas pueden comprar propiedad legalmente durante una visita.</p><p>Una inversión inmobiliaria de USD $200,000 o más también te califica para la residencia dominicana a través de la vía de inversión.</p>'
        },
        {
          q: 'What is the purchase process?', q_es: '¿Cuál es el proceso de compra?',
          a: '<ol><li>Reserve your condo on the sales platform (USD $2,000 deposit, applied toward your purchase price)</li><li>Choose your payment plan (Option A, B, or C)</li><li>Sign the Promise of Sale (Contrato de Promesa de Venta) – the formal, legally binding purchase agreement</li><li>Make scheduled payments during construction</li><li>Sign the Deed of Sale (Contrato de Venta) at delivery</li><li>Receive your Certificate of Title</li></ol><p>AlterLegal, Makai’s partnered legal consultancy, handles the complete legal process on your behalf – from contract review through to title transfer. You do not need to be physically present at any step.</p><p>For the full step-by-step guide, download our “How to Buy Pre-Construction in the Dominican Republic” document from the sales team.</p>',
          a_es: '<ol><li>Reserva tu condo en la plataforma de ventas (depósito de USD $2,000, aplicado a tu precio de compra)</li><li>Elige tu plan de pago (Opción A, B o C)</li><li>Firma la Promesa de Venta (Contrato de Promesa de Venta) – el acuerdo de compra formal y legalmente vinculante</li><li>Realiza los pagos programados durante la construcción</li><li>Firma el Contrato de Venta en la entrega</li><li>Recibe tu Certificado de Título</li></ol><p>AlterLegal, la consultoría legal aliada de Makai, gestiona todo el proceso legal en tu nombre, desde la revisión del contrato hasta la transferencia del título. No necesitas estar físicamente presente en ningún paso.</p><p>Para la guía completa paso a paso, descarga nuestro documento “Cómo comprar en preconstrucción en la República Dominicana” con el equipo de ventas.</p>'
        },
        {
          q: 'What is CONFOTUR and how does it benefit me?', q_es: '¿Qué es CONFOTUR y cómo me beneficia?',
          a: '<p>CONFOTUR is the Dominican Republic’s Tourism Incentive Law. Makai is registered under CONFOTUR, which means buyers receive:</p><ul><li>No 3% transfer tax at purchase (typically USD $10,500 – $15,000 on a Makai condo)</li><li>No annual property tax (IPI) for the first 15 years</li></ul><p>Combined with the preferential legal fee of 0.65% (via AlterLegal, with notary fees included), your effective closing costs at Makai are just 0.65% – compared to 4.25 – 5.5% for standard Dominican property purchases.</p>',
          a_es: '<p>CONFOTUR es la Ley de Incentivo al Turismo de la República Dominicana. Makai está registrado bajo CONFOTUR, lo que significa que los compradores reciben:</p><ul><li>Exención del 3% de impuesto de transferencia en la compra (típicamente USD $10,500 – $15,000 en un condo de Makai)</li><li>Exención del impuesto anual a la propiedad (IPI) durante los primeros 15 años</li></ul><p>Combinado con el honorario legal preferencial del 0.65% (vía AlterLegal, con honorarios notariales incluidos), tus costos de cierre efectivos en Makai son de apenas 0.65%, frente al 4.25 – 5.5% de las compras de propiedad dominicanas estándar.</p>'
        },
        {
          q: 'Can I buy remotely without visiting the Dominican Republic?', q_es: '¿Puedo comprar de forma remota sin visitar la República Dominicana?',
          a: '<p>Yes. The entire process can be completed remotely. The Makai sales platform is fully online, and AlterLegal will draft and legalize a Power of Attorney so they can represent you in the Dominican Republic for signing, filing, and title transfer. You do not need to be physically present at any step.</p>',
          a_es: '<p>Sí. Todo el proceso puede completarse de forma remota. La plataforma de ventas de Makai es totalmente en línea, y AlterLegal redactará y legalizará un Poder para representarte en la República Dominicana en la firma, presentación y transferencia del título. No necesitas estar físicamente presente en ningún paso.</p>'
        }
      ]
    },
    {
      seccion: 'DEVELOPMENT FACTS', seccion_es: 'DATOS DEL DESARROLLO',
      items: [
        {
          q: 'Where is Makai located?', q_es: '¿Dónde está ubicado Makai?',
          a: '<p>View the location on <a href="https://maps.app.goo.gl/uwygEfXNWNRi9Vho8" target="_blank" rel="noopener">Google Maps</a>.</p><p>Makai is located in Cap Cana, Punta Cana, a master-planned, luxury gated community larger than Manhattan. Cap Cana is widely regarded as one of the Caribbean’s most desirable addresses, attracting a global community of high-net-worth individuals, expats, and investors.</p><p>Within Cap Cana, Makai enjoys a <b>prime lakefront setting</b>, just 500 meters from the world-renowned <b>Juanillo Beach</b>. The development also borders the new <b>Las Iguanas Golf Course</b>, with fairways running directly behind the property. Residents enjoy access to the Cap Cana Marina, equestrian center, eco-adventure parks, and the El Dorado Water Park, in addition to world-class restaurants, shops, and a secure 24/7 environment.</p>',
          a_es: '<p>Ver la ubicación en <a href="https://maps.app.goo.gl/uwygEfXNWNRi9Vho8" target="_blank" rel="noopener">Google Maps</a>.</p><p>Makai está ubicado en Cap Cana, Punta Cana, una comunidad cerrada de lujo con planificación maestra, más grande que Manhattan. Cap Cana es ampliamente considerada una de las direcciones más deseables del Caribe, atrayendo a una comunidad global de personas de alto patrimonio, expatriados e inversionistas.</p><p>Dentro de Cap Cana, Makai disfruta de un <b>entorno privilegiado frente al lago</b>, a solo 500 metros de la mundialmente reconocida <b>Playa Juanillo</b>. El desarrollo también colinda con el nuevo <b>Campo de Golf Las Iguanas</b>, con calles que discurren justo detrás de la propiedad. Los residentes disfrutan de acceso a la Marina Cap Cana, el centro ecuestre, parques de eco-aventura y el Parque Acuático El Dorado, además de restaurantes de clase mundial, tiendas y un entorno seguro 24/7.</p>'
        },
        {
          q: 'How many condos are there in Makai?', q_es: '¿Cuántos condos hay en Makai?',
          a: '<p>Makai is a two-phase project totaling <b>216 condos</b>.</p><ul><li>Phase 1, which is almost sold out, consists of <b>114 condos </b>and will be the first delivery.</li><li>Phase 2, which is currently for sale, adds <b>102 condos</b>.</li></ul><p>The development is structured as a condominium, giving owners full legal ownership of their individual unit while benefiting from managed services.</p>',
          a_es: '<p>Makai es un proyecto de dos fases con un total de <b>216 condos</b>.</p><ul><li>La Fase 1, que está casi agotada, consta de <b>114 condos </b>y será la primera entrega.</li><li>La Fase 2, actualmente en venta, añade <b>102 condos</b>.</li></ul><p>El desarrollo está estructurado como condominio, otorgando a los propietarios la plena titularidad legal de su unidad individual a la vez que se benefician de servicios gestionados.</p>'
        },
        {
          q: 'What is the estimated start and completion date of the development?', q_es: '¿Cuál es la fecha estimada de inicio y finalización del desarrollo?',
          a: '<p>Construction of phase 1 is scheduled to begin in Q2 2026. Phase 1 is expected to be delivered by Q2 2028.</p><p>Construction of phase 2 is scheduled to begin in Q2 2027. Phase 2 is expected to be delivered by Q2 2029.</p><p>Final completion of the full development is expected in Q2 2029.</p>',
          a_es: '<p>La construcción de la fase 1 está programada para comenzar en el Q2 2026. Se espera que la fase 1 se entregue para el Q2 2028.</p><p>La construcción de la fase 2 está programada para comenzar en el Q2 2027. Se espera que la fase 2 se entregue para el Q2 2029.</p><p>La finalización total del desarrollo se espera para el Q2 2029.</p>'
        },
        {
          q: 'What types of condos are available?', q_es: '¿Qué tipos de condos están disponibles?',
          a: '<p>Makai offers a versatile mix of condotypes designed for both investment and lifestyle use:</p><ul><li>1 Bedroom condos: 759 – 1,180 sqft</li><li>1 Bedroom &amp; Family Room Condos: 1,108 – 1,180 sqft</li><li>1 Bedroom &amp; Studio Lock-off Condos (flexibility for families or dual rental): 1,173 – 1,180 sqft</li><li>2 Bedroom Condos: 1,315 – 1,481 sqft</li><li>Penthouses (each with an expansive private terrace and picuzzi): 1,421 – 2,523 sqft</li></ul><p>All condos are delivered <b>fully furnished and turnkey</b>, making them hassle-free for investors and immediately rentable under Dolce Hotels and Resorts by Wyndham management.</p>',
          a_es: '<p>Makai ofrece una mezcla versátil de tipos de condo diseñados tanto para inversión como para estilo de vida:</p><ul><li>Condos de 1 dormitorio: 759 – 1,180 sqft</li><li>Condos de 1 dormitorio y sala familiar: 1,108 – 1,180 sqft</li><li>Condos de 1 dormitorio y estudio lock-off (flexibilidad para familias o doble alquiler): 1,173 – 1,180 sqft</li><li>Condos de 2 dormitorios: 1,315 – 1,481 sqft</li><li>Penthouses (cada uno con una amplia terraza privada y jacuzzi): 1,421 – 2,523 sqft</li></ul><p>Todos los condos se entregan <b>totalmente amueblados y llave en mano</b>, haciéndolos libres de complicaciones para los inversionistas e inmediatamente alquilables bajo la gestión de Dolce Hotels and Resorts by Wyndham.</p>'
        },
        {
          q: 'What finishes and upgrades are offered?', q_es: '¿Qué acabados y mejoras se ofrecen?',
          a: '<p>There are no additional optional finishes or upgrades as every condo comes with a <b>standard luxury package</b>, including:</p><ul><li>High-quality tiled flooring and finishes.</li><li>Premium kitchens with modern appliances.</li><li>Fully fitted bathrooms.</li><li>Built-in air-conditioning.</li><li>Modern furniture packs and décor aligned with Dolce Hotels and Resorts by Wyndham standards.</li></ul><p>This ensures all condos are uniform and meet hotel-grade quality for the rental pool.</p>',
          a_es: '<p>No hay acabados ni mejoras opcionales adicionales, ya que cada condo viene con un <b>paquete de lujo estándar</b>, que incluye:</p><ul><li>Pisos y acabados de porcelanato de alta calidad.</li><li>Cocinas premium con electrodomésticos modernos.</li><li>Baños totalmente equipados.</li><li>Aire acondicionado integrado.</li><li>Paquetes de mobiliario moderno y decoración alineados con los estándares de Dolce Hotels and Resorts by Wyndham.</li></ul><p>Esto garantiza que todos los condos sean uniformes y cumplan con la calidad de nivel hotelero para el pool de alquiler.</p>'
        },
        {
          q: 'What amenities are included in the development?', q_es: '¿Qué amenidades se incluyen en el desarrollo?',
          a: '<p>Makai has been designed as a self-contained resort, combining residential living with luxury hospitality. Amenities include:</p><ul><li><b>Pools &amp; Jacuzzis:</b> Rooftop infinity pool with ocean views, zero-entry natural sand pool with swim-up bar, 3 Jacuzzis, &amp; a kids’ pool.</li><li><b>Dining &amp; Social:</b> Two ground-floor restaurants, a sports bar operated by Wyndham, rooftop bar with fire pits and grills.</li><li><b>Health &amp; Wellness:</b> Gym, full-service spa, &amp; yoga-friendly spaces.</li><li><b>Entertainment:</b> 23-seat cinema (available for private bookings such as Super Bowl events or weddings), games lounge, &amp; co-working areas.</li><li><b>Sports &amp; Recreation:</b> Padel and pickleball courts.</li><li><b>Lake Access:</b> Private dock with kayaks and paddle boards.</li><li><b>Conveniences:</b> Commercial plaza (mini-market, pharmacy, cigar shop &amp; lounge, plus souvenir store).</li><li><b>Family &amp; Pets:</b> Playground, kids’ area, &amp; pet park.</li><li><b>Concierge &amp; Security:</b> 24/7 Wyndham-managed services.</li><li><b>Underground parking</b> for residents.</li><li><b>High-speed Wi-Fi</b> throughout the development.</li></ul>',
          a_es: '<p>Makai ha sido diseñado como un resort autónomo, combinando la vida residencial con la hospitalidad de lujo. Las amenidades incluyen:</p><ul><li><b>Piscinas y Jacuzzis:</b> Piscina infinita en la azotea con vistas al océano, piscina de arena natural de entrada gradual con bar dentro del agua, 3 jacuzzis y una piscina infantil.</li><li><b>Gastronomía y Social:</b> Dos restaurantes en planta baja, un sports bar operado por Wyndham, bar en la azotea con fogatas y parrillas.</li><li><b>Salud y Bienestar:</b> Gimnasio, spa de servicio completo y espacios aptos para yoga.</li><li><b>Entretenimiento:</b> Cine de 23 asientos (disponible para reservas privadas como eventos del Super Bowl o bodas), sala de juegos y áreas de co-working.</li><li><b>Deportes y Recreación:</b> Canchas de pádel y pickleball.</li><li><b>Acceso al Lago:</b> Muelle privado con kayaks y tablas de paddle.</li><li><b>Conveniencias:</b> Plaza comercial (mini-market, farmacia, cigar shop y lounge, además de tienda de souvenirs).</li><li><b>Familia y Mascotas:</b> Parque infantil, área para niños y parque para mascotas.</li><li><b>Conserjería y Seguridad:</b> Servicios gestionados por Wyndham 24/7.</li><li><b>Estacionamiento subterráneo</b> para residentes.</li><li><b>Wi-Fi de alta velocidad</b> en todo el desarrollo.</li></ul>'
        },
        {
          q: 'Is parking included in the condo price?', q_es: '¿El estacionamiento está incluido en el precio del condo?',
          a: '<p>Yes, each condo includes at least one underground parking spot.</p>',
          a_es: '<p>Sí, cada condo incluye al menos un espacio de estacionamiento subterráneo.</p>'
        },
        {
          q: 'Are storerooms available?', q_es: '¿Hay bodegas disponibles?',
          a: '<p>Yes, separate storage rooms are available for purchase.</p><p>Contact the sales team for sizing and pricing details.</p>',
          a_es: '<p>Sí, hay bodegas de almacenamiento independientes disponibles para compra.</p><p>Contacta al equipo de ventas para detalles de tamaño y precio.</p>'
        },
        {
          q: 'Air-conditioning', q_es: 'Aire acondicionado',
          a: '<p>All condos are equipped with air-conditioning. There is one AC per bedroom and one AC in the living room.</p>',
          a_es: '<p>Todos los condos están equipados con aire acondicionado. Hay un aire por dormitorio y un aire en la sala.</p>'
        },
        {
          q: 'Furniture packs', q_es: 'Paquetes de mobiliario',
          a: '<p>Every condo is delivered fully furnished and ready for immediate use.</p><p><b>Launch day exclusive: </b>Every condo purchased on launch day includes a complimentary designer furniture pack valued at USD $30,000. After launch, furniture packs are an additional purchase at USD $30,000. This is one of the most significant launch day benefits-combined with the USD&nbsp;$20,000 launch discount, buyers save up to USD $50,000 by purchasing on April 16.</p>',
          a_es: '<p>Cada condo se entrega totalmente amueblado y listo para uso inmediato.</p><p><b>Exclusivo del día de lanzamiento: </b>Cada condo comprado el día de lanzamiento incluye un paquete de mobiliario de diseño de cortesía valorado en USD $30,000. Después del lanzamiento, los paquetes de mobiliario son una compra adicional de USD $30,000. Este es uno de los beneficios más significativos del día de lanzamiento; combinado con el descuento de lanzamiento de USD&nbsp;$20,000, los compradores ahorran hasta USD $50,000 al comprar el 16 de abril.</p>'
        },
        {
          q: 'Backup power solutions', q_es: 'Soluciones de energía de respaldo',
          a: '<p>The development will incorporate backup systems to ensure uninterrupted electricity, critical for hotel-standard operations.</p>',
          a_es: '<p>El desarrollo incorporará sistemas de respaldo para garantizar electricidad ininterrumpida, algo crítico para operaciones con estándar hotelero.</p>'
        },
        {
          q: 'Pet policy', q_es: 'Política de mascotas',
          a: '<p>Makai is pet-friendly and includes a dedicated pet area within the development.</p>',
          a_es: '<p>Makai admite mascotas e incluye un área dedicada para mascotas dentro del desarrollo.</p>'
        }
      ]
    },
    {
      seccion: 'RENTAL POLICY', seccion_es: 'POLÍTICA DE ALQUILER',
      items: [
        {
          q: 'Who manages the rental scheme?', q_es: '¿Quién gestiona el esquema de alquiler?',
          a: '<p>The rental operations of Makai are fully managed by <b>Dolce Hotels and Resorts by Wyndham</b>, a premier luxury brand under the Wyndham Hotels &amp; Resorts portfolio. Dolce Hotels and Resorts by Wyndham ensures that the entire development functions with <b>hotel-quality service standards</b>, covering everything from check-in/check-out to housekeeping, bookings, concierge, and guest services.</p>',
          a_es: '<p>Las operaciones de alquiler de Makai son gestionadas en su totalidad por <b>Dolce Hotels and Resorts by Wyndham</b>, una marca de lujo de primer nivel dentro del portafolio de Wyndham Hotels &amp; Resorts. Dolce Hotels and Resorts by Wyndham garantiza que todo el desarrollo funcione con <b>estándares de servicio de calidad hotelera</b>, cubriendo todo, desde el check-in/check-out hasta limpieza, reservas, conserjería y servicios al huésped.</p>'
        },
        {
          q: 'How does the rental pool work?', q_es: '¿Cómo funciona el pool de alquiler?',
          a: '<p>The <b>Rental Pool system</b> is designed to maximize owner profitability while maintaining uniform service quality. Instead of each owner trying to rent independently, all condos are managed under a shared revenue model:</p><ul><li>Wyndham handles <b>global marketing, reservations, guest management, and maintenance</b>.</li><li>Owners receive <b>quarterly income reports</b> and payouts in USD.</li><li>Net revenues are distributed based on condo size and availability in the rental pool.</li><li>This system ensures fairness: even if a specific condo isn’t occupied every night, owners still share in the collective income generated.</li></ul>',
          a_es: '<p>El sistema de <b>Pool de Alquiler</b> está diseñado para maximizar la rentabilidad del propietario manteniendo una calidad de servicio uniforme. En lugar de que cada propietario intente alquilar de forma independiente, todos los condos se gestionan bajo un modelo de ingresos compartidos:</p><ul><li>Wyndham se encarga del <b>marketing global, las reservas, la gestión de huéspedes y el mantenimiento</b>.</li><li>Los propietarios reciben <b>reportes de ingresos trimestrales</b> y pagos en USD.</li><li>Los ingresos netos se distribuyen según el tamaño del condo y su disponibilidad en el pool de alquiler.</li><li>Este sistema garantiza equidad: aunque un condo específico no esté ocupado todas las noches, los propietarios igual participan del ingreso colectivo generado.</li></ul>'
        },
        {
          q: 'What is the expected ROI?', q_es: '¿Cuál es el ROI esperado?',
          a: '<p>Returns vary by condo type, occupancy levels, and seasonality. Based on Cap Cana’s robust hospitality market, owners can expect <b>projected net ROI between 7.03% and 13.36% annually</b>, plus strong capital appreciation during construction and beyond.</p>',
          a_es: '<p>Los retornos varían según el tipo de condo, los niveles de ocupación y la estacionalidad. Basado en el robusto mercado de hospitalidad de Cap Cana, los propietarios pueden esperar un <b>ROI neto proyectado de entre 7.03% y 13.36% anual</b>, más una fuerte apreciación del capital durante la construcción y más allá.</p>'
        },
        {
          q: 'What costs are deducted before profit distribution?', q_es: '¿Qué costos se deducen antes de distribuir las ganancias?',
          a: '<ul><li>Wyndham management fee (11%)</li><li>Maintenance and cleaning</li><li>Utilities (water, electricity, internet)</li><li>Property &amp; liability insurance</li><li>Furniture, Fixtures &amp; Equipment (FF&amp;E) reserve fund</li><li>Building operations</li></ul><p>These are all transparently reported in quarterly statements.</p>',
          a_es: '<ul><li>Comisión de gestión de Wyndham (11%)</li><li>Mantenimiento y limpieza</li><li>Servicios (agua, electricidad, internet)</li><li>Seguro de propiedad y responsabilidad civil</li><li>Fondo de reserva de Mobiliario, Enseres y Equipo (FF&amp;E)</li><li>Operaciones del edificio</li></ul><p>Todos estos se reportan de forma transparente en estados de cuenta trimestrales.</p>'
        },
        {
          q: 'Can I rent my condo independently (Airbnb, Booking.com, etc.)?', q_es: '¿Puedo alquilar mi condo de forma independiente (Airbnb, Booking.com, etc.)?',
          a: '<p>No. To maintain consistency and uphold hotel standards, all condos must participate in Wyndham’s rental pool. This guarantees brand integrity, pricing control, and maximized occupancy rates.</p>',
          a_es: '<p>No. Para mantener la consistencia y los estándares hoteleros, todos los condos deben participar en el pool de alquiler de Wyndham. Esto garantiza la integridad de la marca, el control de precios y la maximización de las tasas de ocupación.</p>'
        },
        {
          q: 'Can I use my condo personally?', q_es: '¿Puedo usar mi condo personalmente?',
          a: '<p>Yes. Owners can enjoy their condo for up to <b>30 days per year</b> without negatively impacting the hotel’s operations. Of these, a maximum of 15 days can be taken during <b>peak season (November – February)</b>. Any usage beyond 30 days may reduce profitability, but owners always retain the right to enjoy their property.</p>',
          a_es: '<p>Sí. Los propietarios pueden disfrutar de su condo hasta <b>30 días por año</b> sin impactar negativamente las operaciones del hotel. De estos, un máximo de 15 días pueden tomarse durante la <b>temporada alta (noviembre – febrero)</b>. Cualquier uso más allá de 30 días puede reducir la rentabilidad, pero los propietarios siempre conservan el derecho de disfrutar de su propiedad.</p>'
        },
        {
          q: 'Are there tax benefits?', q_es: '¿Hay beneficios fiscales?',
          a: '<p>Yes. Makai is registered under CONFOTUR, the Dominican Republic’s Tourism Incentive Law:</p><ul><li><b>No 3% transfer tax </b>at purchase</li><li><b>No annual property tax (IPI) </b>for the first 15 years</li></ul><p>Estimated savings over 15 years:</p><ul><li>USD $350,000 condo➔$36,750 saved</li><li>USD $450,000 condo➔$54,750 saved</li><li>USD $500,000 condo➔ $63,750 saved</li></ul><p>Combined with the preferential 0.65% legal fee (notary included), your effective closing costs at Makai are just 0.65%.</p>',
          a_es: '<p>Sí. Makai está registrado bajo CONFOTUR, la Ley de Incentivo al Turismo de la República Dominicana:</p><ul><li><b>Exención del 3% de impuesto de transferencia </b>en la compra</li><li><b>Exención del impuesto anual a la propiedad (IPI) </b>durante los primeros 15 años</li></ul><p>Ahorro estimado en 15 años:</p><ul><li>Condo de USD $350,000 ➔ $36,750 ahorrados</li><li>Condo de USD $450,000 ➔ $54,750 ahorrados</li><li>Condo de USD $500,000 ➔ $63,750 ahorrados</li></ul><p>Combinado con el honorario legal preferencial del 0.65% (notaría incluida), tus costos de cierre efectivos en Makai son de apenas 0.65%.</p>'
        }
      ]
    },
    {
      seccion: 'GENERAL PURCHASE QUESTIONS', seccion_es: 'PREGUNTAS GENERALES DE COMPRA',
      items: [
        {
          q: 'What are the finance options?', q_es: '¿Cuáles son las opciones de financiamiento?',
          a: '<p>Buyers can choose between <b>cash purchases</b> or <b>financed purchases</b> as per the following options:</p><ul><li><b>Option A</b>:<br>– USD $2,000 deposit (applied toward your purchase price)<br>– 25% down payment (required 30 days after the purchase)<br>– 35% during construction<br>– Balance due 60 days before condo delivery</li><li><b>Option B</b>: <b>(2% discount)</b><br>– USD $2,000 deposit (applied toward your purchase price)<br>– 60% down payment (required 30 days after the purchase)<br>– Balance due 60 days before condo delivery</li><li><b>Option C</b>: <b>(4% discount)</b><br>– USD $2,000 deposit (applied toward your purchase price)<br>– 80% down payment (required 30 days after the purchase)<br>– Balance due 60 days before condo delivery</li></ul>',
          a_es: '<p>Los compradores pueden elegir entre <b>compras al contado</b> o <b>compras financiadas</b> según las siguientes opciones:</p><ul><li><b>Opción A</b>:<br>– Depósito de USD $2,000 (aplicado a tu precio de compra)<br>– 25% de inicial (requerido 30 días después de la compra)<br>– 35% durante la construcción<br>– Saldo a pagar 60 días antes de la entrega del condo</li><li><b>Opción B</b>: <b>(2% de descuento)</b><br>– Depósito de USD $2,000 (aplicado a tu precio de compra)<br>– 60% de inicial (requerido 30 días después de la compra)<br>– Saldo a pagar 60 días antes de la entrega del condo</li><li><b>Opción C</b>: <b>(4% de descuento)</b><br>– Depósito de USD $2,000 (aplicado a tu precio de compra)<br>– 80% de inicial (requerido 30 días después de la compra)<br>– Saldo a pagar 60 días antes de la entrega del condo</li></ul>'
        },
        {
          q: 'Can I resell my condo before delivery?', q_es: '¿Puedo revender mi condo antes de la entrega?',
          a: '<p>Yes, resales (assignments) are permitted before delivery, subject to the terms of your purchase agreement. Contact the Makai sales team for details on the assignment process and any applicable fees.</p>',
          a_es: '<p>Sí, las reventas (cesiones) están permitidas antes de la entrega, sujetas a los términos de tu contrato de compra. Contacta al equipo de ventas de Makai para detalles sobre el proceso de cesión y cualquier tarifa aplicable.</p>'
        },
        {
          q: 'What happens if my mortgage is not approved?', q_es: '¿Qué pasa si mi hipoteca no es aprobada?',
          a: '<p>Deposits are refunded subject to finance clauses. The USD $2,000 deposit is non-refundable. Pre-qualification with your lender is recommended before launch.</p>',
          a_es: '<p>Los depósitos se reembolsan sujetos a las cláusulas de financiamiento. El depósito de USD $2,000 no es reembolsable. Se recomienda una precalificación con tu prestamista antes del lanzamiento.</p>'
        },
        {
          q: 'When do mortgage repayments begin?', q_es: '¿Cuándo comienzan los pagos de la hipoteca?',
          a: '<p>Mortgage repayments only begin once the project is complete, the condo is transferred, and the buyer takes legal ownership.</p>',
          a_es: '<p>Los pagos de la hipoteca solo comienzan una vez que el proyecto está completo, el condo se transfiere y el comprador toma la titularidad legal.</p>'
        },
        {
          q: 'What are the estimated levies (HOA fees)?', q_es: '¿Cuáles son las cuotas estimadas (mantenimiento / HOA)?',
          a: '<p>Approximately USD $4 per sqm per month. For a 1-bedroom condo (-80 sqm / 860 sqft), this is approximately USD $320/month. For a 2-bedroom (-130 sqm / 1,400 sqft), approximately USD $520/month. Levies cover security, insurance, cleaning, maintenance, utilities for common areas, and building management under Wyndham.</p>',
          a_es: '<p>Aproximadamente USD $4 por m² al mes. Para un condo de 1 dormitorio (~80 m² / 860 sqft), esto es aproximadamente USD $320/mes. Para uno de 2 dormitorios (~130 m² / 1,400 sqft), aproximadamente USD $520/mes. Las cuotas cubren seguridad, seguro, limpieza, mantenimiento, servicios de las áreas comunes y la administración del edificio bajo Wyndham.</p>'
        },
        {
          q: 'Are there any hidden costs?', q_es: '¿Hay costos ocultos?',
          a: '<p>No. The purchase price is VAT-inclusive with no transfer duty (CONFOTUR exempt). Buyers are only responsible for:</p><ul><li>Monthly rates and levies (approximately USD $4/sqm/month)</li><li>Legal transfer fees: 0.65% via AlterLegal (notary fees included) – significantly below the standard 1 – 1.5%</li><li>Mortgage registration costs (if financing)</li></ul>',
          a_es: '<p>No. El precio de compra incluye el ITBIS (impuesto) sin impuesto de transferencia (exento por CONFOTUR). Los compradores solo son responsables de:</p><ul><li>Cuotas mensuales de mantenimiento (aproximadamente USD $4/m²/mes)</li><li>Honorarios legales de transferencia: 0.65% vía AlterLegal (honorarios notariales incluidos), muy por debajo del estándar de 1 – 1.5%</li><li>Costos de registro de la hipoteca (si se financia)</li></ul>'
        },
        {
          q: 'When can I move in or rent out my condo?', q_es: '¿Cuándo puedo mudarme o alquilar mi condo?',
          a: '<p>Once construction is complete and the occupation certificate is granted, owners may immediately occupy or place their condo into the Wyndham rental pool.</p>',
          a_es: '<p>Una vez que la construcción esté completa y se otorgue el certificado de ocupación, los propietarios pueden ocupar de inmediato o colocar su condo en el pool de alquiler de Wyndham.</p>'
        }
      ]
    },
    {
      seccion: 'AMENITIES & LOCATION', seccion_es: 'AMENIDADES Y UBICACIÓN',
      items: [
        {
          q: 'What exclusive amenities does Makai offer?', q_es: '¿Qué amenidades exclusivas ofrece Makai?',
          a: '<p>See the full amenities list under Development Facts above. Additional Cap Cana community amenities include Juanillo Beach access, Eden Roe Beach Club, Punta Espada Golf Club, Marina Cap Cana, equestrian centre, and Scape Park eco-reserve.</p>',
          a_es: '<p>Consulta la lista completa de amenidades en Datos del Desarrollo más arriba. Las amenidades adicionales de la comunidad de Cap Cana incluyen acceso a Playa Juanillo, Eden Roc Beach Club, Punta Espada Golf Club, Marina Cap Cana, centro ecuestre y la eco-reserva Scape Park.</p>'
        },
        {
          q: 'Is there beach access?', q_es: '¿Hay acceso a la playa?',
          a: '<p>Yes. Makai is only <b>500 meters from Juanillo Beach</b>, one of the most iconic beaches in the Dominican Republic, with exclusive beach club access for residents.</p>',
          a_es: '<p>Sí. Makai está a solo <b>500 metros de Playa Juanillo</b>, una de las playas más icónicas de la República Dominicana, con acceso exclusivo al club de playa para residentes.</p>'
        },
        {
          q: 'How close is Makai to the airport and other attractions?', q_es: '¿Qué tan cerca está Makai del aeropuerto y otras atracciones?',
          a: '<ul><li><b>Punta Cana International Airport: </b>-15 minutes by car. The airport is served by direct flights from New York, Miami, Toronto, London, Madrid, Bogota, and other major international cities – making Cap Cana one of the most accessible luxury destinations in the Caribbean.</li><li><b>Golf:</b> Next to Las Iguanas Golf Course, and close to the world-famous Punta Espada Golf Course.</li><li><b>Marina:</b> Cap Cana Marina (yachting, fishing, sailing).</li><li><b>Dining &amp; Shopping:</b> A variety of high-end restaurants, cafes, and shops within Cap Cana.</li></ul>',
          a_es: '<ul><li><b>Aeropuerto Internacional de Punta Cana: </b>~15 minutos en auto. El aeropuerto cuenta con vuelos directos desde Nueva York, Miami, Toronto, Londres, Madrid, Bogotá y otras importantes ciudades internacionales, haciendo de Cap Cana uno de los destinos de lujo más accesibles del Caribe.</li><li><b>Golf:</b> Junto al Campo de Golf Las Iguanas y cerca del mundialmente famoso Campo de Golf Punta Espada.</li><li><b>Marina:</b> Marina Cap Cana (yates, pesca, vela).</li><li><b>Gastronomía y Compras:</b> Una variedad de restaurantes de alta gama, cafés y tiendas dentro de Cap Cana.</li></ul>'
        }
      ]
    },
    {
      seccion: 'INTERACTIVE SALES PLATFORM', seccion_es: 'PLATAFORMA DE VENTAS INTERACTIVA',
      items: [
        {
          q: 'The reservation process', q_es: 'El proceso de reserva',
          a: '<p><strong>All reservations will happen online via the interactive sales platform.</strong></p><ol><li>Register and log in to <a href="https://sales.makai-capcana.com/" target="_blank" rel="noopener">sales.makai-capcana.com</a>.</li><li>Click the RESERVE button on your selected condo to start the process.</li><li>Complete the form and accept the terms: <b>Click RESERVE</b></li><li>Your reservation will move to a pending state. You’ll have 10 minutes to complete the USD $2,000 deposit – plenty of time to finalize through the secure Stripe checkout. Accepted payment methods include major credit cards and supported digital wallet options.</li><li>Once the USD $2,000 deposit fee is concluded, your condo will be reserved!*</li><li>You will then receive an email from our team confirming your reservation.</li></ol><p>*<a href="https://makai-capcana.com/terms-and-conditions/" target="_blank" rel="noopener">Ts&amp;Cs</a> Apply</p><p><b>Next steps</b>:</p><ul><li>The KYC Form and Agreement of Sale will be sent to you via email by one of our sales agents.</li><li>The KYC Form will need to be signed and returned to us within 48 hours.</li><li>The Agreement of Sale will need to be signed and returned to us within one week from receiving it.</li></ul><p>Finance Options:</p><ul><li><b>Option A</b>:<br>– USD $2,000 deposit (applied toward your purchase price)<br>– 25% Down payment (required 30 days after the purchase)<br>– 35% During construction<br>– Balance due 60 days before condo delivery</li><li><b>Option B</b>: <b>(2% discount)</b><br>– USD $2,000 deposit (applied toward your purchase price)<br>– 60% Down payment (required 30 days after the purchase)<br>– Balance due 60 days before condo delivery</li><li><b>Option C</b>: <b>(4% discount)</b><br>– USD $2,000 deposit (applied toward your purchase price)<br>– 80% Down payment (required 30 days after the purchase)<br>– Balance due 60 days before condo delivery</li></ul>',
          a_es: '<p><strong>Todas las reservas se realizarán en línea a través de la plataforma de ventas interactiva.</strong></p><ol><li>Regístrate e inicia sesión en <a href="https://sales.makai-capcana.com/" target="_blank" rel="noopener">sales.makai-capcana.com</a>.</li><li>Haz clic en el botón RESERVAR del condo que elijas para iniciar el proceso.</li><li>Completa el formulario y acepta los términos: <b>Haz clic en RESERVAR</b></li><li>Tu reserva pasará a un estado pendiente. Tendrás 10 minutos para completar el depósito de USD $2,000, tiempo de sobra para finalizar mediante el checkout seguro de Stripe. Los métodos de pago aceptados incluyen las principales tarjetas de crédito y opciones de billetera digital compatibles.</li><li>Una vez concluido el depósito de USD $2,000, ¡tu condo quedará reservado!*</li><li>Luego recibirás un correo de nuestro equipo confirmando tu reserva.</li></ol><p>*Aplican los <a href="https://makai-capcana.com/terms-and-conditions/" target="_blank" rel="noopener">Términos y Condiciones</a></p><p><b>Próximos pasos</b>:</p><ul><li>El Formulario KYC y el Acuerdo de Venta te serán enviados por correo por uno de nuestros agentes de ventas.</li><li>El Formulario KYC deberá firmarse y devolvérsenos dentro de 48 horas.</li><li>El Acuerdo de Venta deberá firmarse y devolvérsenos dentro de una semana desde su recepción.</li></ul><p>Opciones de financiamiento:</p><ul><li><b>Opción A</b>:<br>– Depósito de USD $2,000 (aplicado a tu precio de compra)<br>– 25% de inicial (requerido 30 días después de la compra)<br>– 35% durante la construcción<br>– Saldo a pagar 60 días antes de la entrega del condo</li><li><b>Opción B</b>: <b>(2% de descuento)</b><br>– Depósito de USD $2,000 (aplicado a tu precio de compra)<br>– 60% de inicial (requerido 30 días después de la compra)<br>– Saldo a pagar 60 días antes de la entrega del condo</li><li><b>Opción C</b>: <b>(4% de descuento)</b><br>– Depósito de USD $2,000 (aplicado a tu precio de compra)<br>– 80% de inicial (requerido 30 días después de la compra)<br>– Saldo a pagar 60 días antes de la entrega del condo</li></ul>'
        },
        {
          q: 'Benefits of purchasing on launch day', q_es: 'Beneficios de comprar el día de lanzamiento',
          a: '<ul><li>USD $20,000 launch discount.</li><li>Free furniture pack on launch (thereafter furniture packs are to be purchased at USD $30,000).</li><li>Capital appreciation in Cap Cana has historically averaged approximately 5% per annum for comparable pre-construction developments. Past performance is not a guarantee of future results.</li><li>Rare opportunity to own in Cap Cana, a luxury gated community that is widely regarded as one of the Caribbean’s most desirable addresses, with a prime location and proximity to the beach, golf course, key amenities, and tourist attractions.</li></ul>',
          a_es: '<ul><li>Descuento de lanzamiento de USD $20,000.</li><li>Paquete de mobiliario gratis en el lanzamiento (posteriormente los paquetes de mobiliario se compran a USD $30,000).</li><li>La apreciación del capital en Cap Cana ha promediado históricamente aproximadamente un 5% anual para desarrollos comparables en preconstrucción. El desempeño pasado no garantiza resultados futuros.</li><li>Rara oportunidad de ser propietario en Cap Cana, una comunidad cerrada de lujo ampliamente considerada una de las direcciones más deseables del Caribe, con una ubicación privilegiada y cercanía a la playa, el campo de golf, amenidades clave y atracciones turísticas.</li></ul>'
        }
      ]
    }
  ];

  /* idioma activo (lo gestiona i18n.js; por defecto en) */
  function idioma() { return window.MAKAI_LANG === 'es' ? 'es' : 'en'; }

  /* ---- construir la cáscara del modal una sola vez ---- */
  var modal = document.createElement('div');
  modal.className = 'faq-modal';
  modal.id = 'faq-modal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.innerHTML =
    '<div class="faq-modal__overlay" data-faq-close></div>' +
    '<div class="faq-modal__panel">' +
    '<button class="faq-modal__close" data-faq-close aria-label="Close">×</button>' +
    '<div class="faq-modal__scroll" data-lenis-prevent></div>' +
    '</div>';
  document.body.appendChild(modal);
  var scroll = modal.querySelector('.faq-modal__scroll');

  /* ---- render del contenido en el idioma activo ---- */
  function render() {
    var l = idioma();
    modal.setAttribute('aria-label', UI[l].titulo);
    var html = '<h1 class="faq-modal__title">' + UI[l].titulo + '</h1>' +
      '<div class="faq-modal__title-rule"></div>';
    DATA.forEach(function (sec) {
      html += '<h3 class="faq-modal__section-title">' + (l === 'es' ? sec.seccion_es : sec.seccion) + '</h3>';
      sec.items.forEach(function (it) {
        var q = l === 'es' ? it.q_es : it.q;
        var a = l === 'es' ? it.a_es : it.a;
        html += '<div class="faq-item">' +
          '<button class="faq-item__q" aria-expanded="false"><span>' + q + '</span>' +
          '<span class="faq-item__icon" aria-hidden="true"></span></button>' +
          '<div class="faq-item__a"><div class="faq-item__a-inner">' + a + '</div></div>' +
          '</div>';
      });
    });
    scroll.innerHTML = html;
  }
  render();

  var abierto = false;

  function bloquearScroll(v) {
    if (window.lenis) { v ? window.lenis.stop() : window.lenis.start(); }
    document.documentElement.style.overflow = v ? 'hidden' : '';
  }

  function abrir() {
    if (abierto) return;
    abierto = true;
    modal.classList.add('is-open');
    bloquearScroll(true);
    gsap.fromTo(modal.querySelector('.faq-modal__overlay'), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 });
    gsap.fromTo(modal.querySelector('.faq-modal__panel'),
      { autoAlpha: 0, y: 30, scale: 0.98 },
      { autoAlpha: 1, y: 0, scale: 1, duration: 0.45, ease: 'power3.out' });
  }

  function cerrar() {
    if (!abierto) return;
    abierto = false;
    gsap.to(modal.querySelector('.faq-modal__panel'), { autoAlpha: 0, y: 20, duration: 0.25, ease: 'power2.in' });
    gsap.to(modal.querySelector('.faq-modal__overlay'), {
      autoAlpha: 0, duration: 0.3,
      onComplete: function () { modal.classList.remove('is-open'); bloquearScroll(false); }
    });
  }

  /* re-render al cambiar de idioma (cierra acordeones abiertos, aceptable) */
  document.addEventListener('makai:langchange', render);

  /* acordeón + cierre (delegado en el modal, sobrevive a los re-render) */
  modal.addEventListener('click', function (e) {
    if (e.target.closest('[data-faq-close]')) { cerrar(); return; }
    var q = e.target.closest('.faq-item__q');
    if (!q) return;
    var item = q.closest('.faq-item');
    var cuerpo = item.querySelector('.faq-item__a');
    var inner = item.querySelector('.faq-item__a-inner');
    var estaAbierto = item.classList.toggle('is-open');
    q.setAttribute('aria-expanded', estaAbierto ? 'true' : 'false');
    gsap.killTweensOf(cuerpo);
    if (estaAbierto) {
      gsap.fromTo(cuerpo, { height: 0 }, {
        height: function () { return inner.offsetHeight; },
        duration: 0.4, ease: 'power2.out',
        onComplete: function () { cuerpo.style.height = 'auto'; }
      });
    } else {
      gsap.to(cuerpo, { height: 0, duration: 0.35, ease: 'power2.inOut' });
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && abierto) cerrar();
  });

  /* interceptar los enlaces "FAQS" (menú desktop, footer, menú móvil) */
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href*="/faqs"]');
    if (!a) return;
    e.preventDefault();
    var panelMovil = document.getElementById('slide-out-widget-area');
    if (panelMovil && panelMovil.classList.contains('open')) {
      var toggle = document.querySelector('.slide-out-widget-area-toggle.slide-out-hover-icon-effect a');
      if (toggle) toggle.click();
      setTimeout(abrir, 350);
    } else {
      abrir();
    }
  });
})();
