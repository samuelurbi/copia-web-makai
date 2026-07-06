/* Makai — modal de FAQs. Reemplaza la página /faqs/ de la original
   por un modal que abre desde los enlaces "FAQS" (menú desktop,
   menú móvil y footer). Propietario: faq-modal. Cargado después de
   main.js. Mismo estilo que main.js: IIFE vanilla + GSAP, se salta
   si no hay markup/GSAP. Contenido copiado 1:1 de makai-capcana.com/faqs/. */
(function () {
  'use strict';
  if (typeof gsap === 'undefined') return;

  /* ---- contenido (secciones y preguntas, en el orden de la original) ---- */
  var DATA = [
    {
      seccion: 'DEVELOPMENT TEAM',
      items: [
        { q: 'Developer', a: '<p><strong>Duna Development</strong></p><p>Makai Residences is developed by Duna Development, a Dominican-based real estate company with a proven track record of delivering residential and commercial projects in the Punta Cana and Santo Domingo regions. The group is led by Josué Virgen, José González and Osman Alper who have successfully launched multiple buildings and secured the exclusive license to deliver the first Lamborghini-branded residences in the Caribbean. With a dynamic portfolio and strong industry reputation, Duna is regarded as one of the fastest-growing development firms in the Dominican Republic. Their in-house team combines over 15 years of engineering and construction expertise, ensuring a blend of international standards and local execution capability.</p><p><a href="https://dunadevelopment.com/" target="_blank" rel="noopener">www.dunadevelopment.com</a></p>' },
        { q: 'Architect', a: '<p><b>M+Group</b></p><p>The project was designed by <b>M+</b>, an award-winning architectural firm based in Medellín, Colombia. M+ is internationally recognized for their innovative approach to vertical residential buildings, having won prestigious global awards in 2017 and 2018 for design excellence. Their philosophy balances lifestyle functionality, modern design aesthetics, and sustainability. For Makai, M+ has created a contemporary tropical-modern structure that blends seamlessly with its Cap Cana setting, maximizing natural light, lake frontage, and views of both the Caribbean Sea and the new Las Iguanas golf course.</p><p><a href="https://mgroup.com.co/" target="_blank" rel="noopener">www.mgroup.com.co</a></p>' },
        { q: 'Construction Team', a: '<p>Duna Development will oversee the entire construction process with their in-house engineering and construction division. This team has successfully executed several large-scale residential buildings in the Dominican Republic and is backed by 15 years of hands-on experience with concrete structures in coastal environments, ensuring long-term durability.</p>' },
        { q: 'Interior Designers', a: '<p>The interiors have been curated by <b>M+</b> in collaboration with <b>Dolce Hotels and Resorts by Wyndham</b>, ensuring that every unit is delivered fully furnished to a hotel-standard, “turnkey” condition. Owners will benefit from a consistent design language across all condos — with neutral tones, premium finishes, and high-quality furniture that reflects modern tropical luxury — making it suitable both for personal use and hotel-standard rental operations.</p>' },
        { q: 'Transferring Attorney', a: '<p><b>AlterLegal – Strategic Legal Consultants</b></p><p>Makai has partnered with AlterLegal, a Dominican strategic legal consultancy, to handle all property transfers on the project at a preferential rate of 0.65% of the property value (compared to the standard 1-1.5%). Notary fees are included.</p><p>As your appointed legal counsel, AlterLegal has a legal and fiduciary duty to act on your behalf and in your best interest throughout the transaction. Comprehensive due diligence on the Makai project has already been completed.</p><p>Jose Alejandro Fernandez: <a href="mailto:jfernandez@alterlegal.do" target="_blank" rel="noopener">jfernandez@alterlegal.do</a><br>Miguel Brache: <a href="mailto:mbrache@alterlegal.do" target="_blank" rel="noopener">mbrache@alterlegal.do</a><br>Office: <a href="tel:8297345730" target="_blank" rel="noopener">829-734-5730</a> | Cell: <a href="tel:8498698265" target="_blank" rel="noopener">849-869-8265</a></p><p><a href="https://alterlegal.do" target="_blank" rel="noopener">www.alterlegal.do</a></p><p>Buyers are also free to appoint their own independent attorney if they prefer.</p>' },
        { q: 'Financing Options', a: '<p>Makai offers three structured payment plans, each beginning with a USD $2,000 deposit (applied toward your purchase price):</p><ul><li><b>Option A (Standard): </b>25% down payment within 30 days, 35% during construction, balance due 60 days before delivery.</li><li><b>Option B (2% discount): </b>60% down payment within 30 days, balance due 60 days before delivery.</li><li><b>Option C (4% discount): </b>80% down payment within 30 days, balance due 60 days before delivery.</li></ul><p>Bank financing is also available through major Dominican banks including Banreservas and Banco Popular, with 25–40% down payment and 50–70% LTV for foreign buyers. Mortgage repayments begin only upon project completion and title transfer.</p>' },
        { q: 'Rental Operator', a: '<p>Makai Residences will be operated under the <strong>Dolce Hotels and Resorts by Wyndham</strong> brand, one of Wyndham’s highest-tier luxury hotel brands. Wyndham brings decades of hospitality management experience, and global booking power, ensuring consistent hotel-quality service standards while maximizing occupancy and rental yields for owners.</p>' }
      ]
    },
    {
      seccion: 'BUYING PROPERTY IN THE DOMINICAN REPUBLIC',
      items: [
        { q: 'Can foreigners buy property in the Dominican Republic?', a: '<p>Yes. Foreigners have full, unrestricted property ownership rights in the Dominican Republic – equal to Dominican nationals. No citizenship, residency, or special permits are required. This has been the law since 1998 (Decree 21-98). Even tourists can legally purchase property during a visit.</p><p>A real estate investment of USD $200,000 or more also qualifies you for Dominican residency through the investment route.</p>' },
        { q: 'What is the purchase process?', a: '<ol><li>Reserve your condo on the sales platform (USD $2,000 deposit, applied toward your purchase price)</li><li>Choose your payment plan (Option A, B, or C)</li><li>Sign the Promise of Sale (Contrato de Promesa de Venta) – the formal, legally binding purchase agreement</li><li>Make scheduled payments during construction</li><li>Sign the Deed of Sale (Contrato de Venta) at delivery</li><li>Receive your Certificate of Title</li></ol><p>AlterLegal, Makai’s partnered legal consultancy, handles the complete legal process on your behalf – from contract review through to title transfer. You do not need to be physically present at any step.</p><p>For the full step-by-step guide, download our “How to Buy Pre-Construction in the Dominican Republic” document from the sales team.</p>' },
        { q: 'What is CONFOTUR and how does it benefit me?', a: '<p>CONFOTUR is the Dominican Republic’s Tourism Incentive Law. Makai is registered under CONFOTUR, which means buyers receive:</p><ul><li>No 3% transfer tax at purchase (typically USD $10,500 – $15,000 on a Makai condo)</li><li>No annual property tax (IPI) for the first 15 years</li></ul><p>Combined with the preferential legal fee of 0.65% (via AlterLegal, with notary fees included), your effective closing costs at Makai are just 0.65% – compared to 4.25 – 5.5% for standard Dominican property purchases.</p>' },
        { q: 'Can I buy remotely without visiting the Dominican Republic?', a: '<p>Yes. The entire process can be completed remotely. The Makai sales platform is fully online, and AlterLegal will draft and legalize a Power of Attorney so they can represent you in the Dominican Republic for signing, filing, and title transfer. You do not need to be physically present at any step.</p>' }
      ]
    },
    {
      seccion: 'DEVELOPMENT FACTS',
      items: [
        { q: 'Where is Makai located?', a: '<p>View the location on <a href="https://maps.app.goo.gl/uwygEfXNWNRi9Vho8" target="_blank" rel="noopener">Google Maps</a>.</p><p>Makai is located in Cap Cana, Punta Cana, a master-planned, luxury gated community larger than Manhattan. Cap Cana is widely regarded as one of the Caribbean’s most desirable addresses, attracting a global community of high-net-worth individuals, expats, and investors.</p><p>Within Cap Cana, Makai enjoys a <b>prime lakefront setting</b>, just 500 meters from the world-renowned <b>Juanillo Beach</b>. The development also borders the new <b>Las Iguanas Golf Course</b>, with fairways running directly behind the property. Residents enjoy access to the Cap Cana Marina, equestrian center, eco-adventure parks, and the El Dorado Water Park, in addition to world-class restaurants, shops, and a secure 24/7 environment.</p>' },
        { q: 'How many condos are there in Makai?', a: '<p>Makai is a two-phase project totaling <b>216 condos</b>.</p><ul><li>Phase 1, which is almost sold out, consists of <b>114 condos </b>and will be the first delivery.</li><li>Phase 2, which is currently for sale, adds <b>102 condos</b>.</li></ul><p>The development is structured as a condominium, giving owners full legal ownership of their individual unit while benefiting from managed services.</p>' },
        { q: 'What is the estimated start and completion date of the development?', a: '<p>Construction of phase 1 is scheduled to begin in Q2 2026. Phase 1 is expected to be delivered by Q2 2028.</p><p>Construction of phase 2 is scheduled to begin in Q2 2027. Phase 2 is expected to be delivered by Q2 2029.</p><p>Final completion of the full development is expected in Q2 2029.</p>' },
        { q: 'What types of condos are available?', a: '<p>Makai offers a versatile mix of condotypes designed for both investment and lifestyle use:</p><ul><li>1 Bedroom condos: 759 – 1,180 sqft</li><li>1 Bedroom &amp; Family Room Condos: 1,108 – 1,180 sqft</li><li>1 Bedroom &amp; Studio Lock-off Condos (flexibility for families or dual rental): 1,173 – 1,180 sqft</li><li>2 Bedroom Condos: 1,315 – 1,481 sqft</li><li>Penthouses (each with an expansive private terrace and picuzzi): 1,421 – 2,523 sqft</li></ul><p>All condos are delivered <b>fully furnished and turnkey</b>, making them hassle-free for investors and immediately rentable under Dolce Hotels and Resorts by Wyndham management.</p>' },
        { q: 'What finishes and upgrades are offered?', a: '<p>There are no additional optional finishes or upgrades as every condo comes with a <b>standard luxury package</b>, including:</p><ul><li>High-quality tiled flooring and finishes.</li><li>Premium kitchens with modern appliances.</li><li>Fully fitted bathrooms.</li><li>Built-in air-conditioning.</li><li>Modern furniture packs and décor aligned with Dolce Hotels and Resorts by Wyndham standards.</li></ul><p>This ensures all condos are uniform and meet hotel-grade quality for the rental pool.</p>' },
        { q: 'What amenities are included in the development?', a: '<p>Makai has been designed as a self-contained resort, combining residential living with luxury hospitality. Amenities include:</p><ul><li><b>Pools &amp; Jacuzzis:</b> Rooftop infinity pool with ocean views, zero-entry natural sand pool with swim-up bar, 3 Jacuzzis, &amp; a kids’ pool.</li><li><b>Dining &amp; Social:</b> Two ground-floor restaurants, a sports bar operated by Wyndham, rooftop bar with fire pits and grills.</li><li><b>Health &amp; Wellness:</b> Gym, full-service spa, &amp; yoga-friendly spaces.</li><li><b>Entertainment:</b> 23-seat cinema (available for private bookings such as Super Bowl events or weddings), games lounge, &amp; co-working areas.</li><li><b>Sports &amp; Recreation:</b> Padel and pickleball courts.</li><li><b>Lake Access:</b> Private dock with kayaks and paddle boards.</li><li><b>Conveniences:</b> Commercial plaza (mini-market, pharmacy, cigar shop &amp; lounge, plus souvenir store).</li><li><b>Family &amp; Pets:</b> Playground, kids’ area, &amp; pet park.</li><li><b>Concierge &amp; Security:</b> 24/7 Wyndham-managed services.</li><li><b>Underground parking</b> for residents.</li><li><b>High-speed Wi-Fi</b> throughout the development.</li></ul>' },
        { q: 'Is parking included in the condo price?', a: '<p>Yes, each condo includes at least one underground parking spot.</p>' },
        { q: 'Are storerooms available?', a: '<p>Yes, separate storage rooms are available for purchase.</p><p>Contact the sales team for sizing and pricing details.</p>' },
        { q: 'Air-conditioning', a: '<p>All condos are equipped with air-conditioning. There is one AC per bedroom and one AC in the living room.</p>' },
        { q: 'Furniture packs', a: '<p>Every condo is delivered fully furnished and ready for immediate use.</p><p><b>Launch day exclusive: </b>Every condo purchased on launch day includes a complimentary designer furniture pack valued at USD $30,000. After launch, furniture packs are an additional purchase at USD $30,000. This is one of the most significant launch day benefits-combined with the USD&nbsp;$20,000 launch discount, buyers save up to USD $50,000 by purchasing on April 16.</p>' },
        { q: 'Backup power solutions', a: '<p>The development will incorporate backup systems to ensure uninterrupted electricity, critical for hotel-standard operations.</p>' },
        { q: 'Pet policy', a: '<p>Makai is pet-friendly and includes a dedicated pet area within the development.</p>' }
      ]
    },
    {
      seccion: 'RENTAL POLICY',
      items: [
        { q: 'Who manages the rental scheme?', a: '<p>The rental operations of Makai are fully managed by <b>Dolce Hotels and Resorts by Wyndham</b>, a premier luxury brand under the Wyndham Hotels &amp; Resorts portfolio. Dolce Hotels and Resorts by Wyndham ensures that the entire development functions with <b>hotel-quality service standards</b>, covering everything from check-in/check-out to housekeeping, bookings, concierge, and guest services.</p>' },
        { q: 'How does the rental pool work?', a: '<p>The <b>Rental Pool system</b> is designed to maximize owner profitability while maintaining uniform service quality. Instead of each owner trying to rent independently, all condos are managed under a shared revenue model:</p><ul><li>Wyndham handles <b>global marketing, reservations, guest management, and maintenance</b>.</li><li>Owners receive <b>quarterly income reports</b> and payouts in USD.</li><li>Net revenues are distributed based on condo size and availability in the rental pool.</li><li>This system ensures fairness: even if a specific condo isn’t occupied every night, owners still share in the collective income generated.</li></ul>' },
        { q: 'What is the expected ROI?', a: '<p>Returns vary by condo type, occupancy levels, and seasonality. Based on Cap Cana’s robust hospitality market, owners can expect <b>projected net ROI between 7.03% and 13.36% annually</b>, plus strong capital appreciation during construction and beyond.</p>' },
        { q: 'What costs are deducted before profit distribution?', a: '<ul><li>Wyndham management fee (11%)</li><li>Maintenance and cleaning</li><li>Utilities (water, electricity, internet)</li><li>Property &amp; liability insurance</li><li>Furniture, Fixtures &amp; Equipment (FF&amp;E) reserve fund</li><li>Building operations</li></ul><p>These are all transparently reported in quarterly statements.</p>' },
        { q: 'Can I rent my condo independently (Airbnb, Booking.com, etc.)?', a: '<p>No. To maintain consistency and uphold hotel standards, all condos must participate in Wyndham’s rental pool. This guarantees brand integrity, pricing control, and maximized occupancy rates.</p>' },
        { q: 'Can I use my condo personally?', a: '<p>Yes. Owners can enjoy their condo for up to <b>30 days per year</b> without negatively impacting the hotel’s operations. Of these, a maximum of 15 days can be taken during <b>peak season (November – February)</b>. Any usage beyond 30 days may reduce profitability, but owners always retain the right to enjoy their property.</p>' },
        { q: 'Are there tax benefits?', a: '<p>Yes. Makai is registered under CONFOTUR, the Dominican Republic’s Tourism Incentive Law:</p><ul><li><b>No 3% transfer tax </b>at purchase</li><li><b>No annual property tax (IPI) </b>for the first 15 years</li></ul><p>Estimated savings over 15 years:</p><ul><li>USD $350,000 condo➔$36,750 saved</li><li>USD $450,000 condo➔$54,750 saved</li><li>USD $500,000 condo➔ $63,750 saved</li></ul><p>Combined with the preferential 0.65% legal fee (notary included), your effective closing costs at Makai are just 0.65%.</p>' }
      ]
    },
    {
      seccion: 'GENERAL PURCHASE QUESTIONS',
      items: [
        { q: 'What are the finance options?', a: '<p>Buyers can choose between <b>cash purchases</b> or <b>financed purchases</b> as per the following options:</p><ul><li><b>Option A</b>:<br>– USD $2,000 deposit (applied toward your purchase price)<br>– 25% down payment (required 30 days after the purchase)<br>– 35% during construction<br>– Balance due 60 days before condo delivery</li><li><b>Option B</b>: <b>(2% discount)</b><br>– USD $2,000 deposit (applied toward your purchase price)<br>– 60% down payment (required 30 days after the purchase)<br>– Balance due 60 days before condo delivery</li><li><b>Option C</b>: <b>(4% discount)</b><br>– USD $2,000 deposit (applied toward your purchase price)<br>– 80% down payment (required 30 days after the purchase)<br>– Balance due 60 days before condo delivery</li></ul>' },
        { q: 'Can I resell my condo before delivery?', a: '<p>Yes, resales (assignments) are permitted before delivery, subject to the terms of your purchase agreement. Contact the Makai sales team for details on the assignment process and any applicable fees.</p>' },
        { q: 'What happens if my mortgage is not approved?', a: '<p>Deposits are refunded subject to finance clauses. The USD $2,000 deposit is non-refundable. Pre-qualification with your lender is recommended before launch.</p>' },
        { q: 'When do mortgage repayments begin?', a: '<p>Mortgage repayments only begin once the project is complete, the condo is transferred, and the buyer takes legal ownership.</p>' },
        { q: 'What are the estimated levies (HOA fees)?', a: '<p>Approximately USD $4 per sqm per month. For a 1-bedroom condo (-80 sqm / 860 sqft), this is approximately USD $320/month. For a 2-bedroom (-130 sqm / 1,400 sqft), approximately USD $520/month. Levies cover security, insurance, cleaning, maintenance, utilities for common areas, and building management under Wyndham.</p>' },
        { q: 'Are there any hidden costs?', a: '<p>No. The purchase price is VAT-inclusive with no transfer duty (CONFOTUR exempt). Buyers are only responsible for:</p><ul><li>Monthly rates and levies (approximately USD $4/sqm/month)</li><li>Legal transfer fees: 0.65% via AlterLegal (notary fees included) – significantly below the standard 1 – 1.5%</li><li>Mortgage registration costs (if financing)</li></ul>' },
        { q: 'When can I move in or rent out my condo?', a: '<p>Once construction is complete and the occupation certificate is granted, owners may immediately occupy or place their condo into the Wyndham rental pool.</p>' }
      ]
    },
    {
      seccion: 'AMENITIES & LOCATION',
      items: [
        { q: 'What exclusive amenities does Makai offer?', a: '<p>See the full amenities list under Development Facts above. Additional Cap Cana community amenities include Juanillo Beach access, Eden Roe Beach Club, Punta Espada Golf Club, Marina Cap Cana, equestrian centre, and Scape Park eco-reserve.</p>' },
        { q: 'Is there beach access?', a: '<p>Yes. Makai is only <b>500 meters from Juanillo Beach</b>, one of the most iconic beaches in the Dominican Republic, with exclusive beach club access for residents.</p>' },
        { q: 'How close is Makai to the airport and other attractions?', a: '<ul><li><b>Punta Cana International Airport: </b>-15 minutes by car. The airport is served by direct flights from New York, Miami, Toronto, London, Madrid, Bogota, and other major international cities – making Cap Cana one of the most accessible luxury destinations in the Caribbean.</li><li><b>Golf:</b> Next to Las Iguanas Golf Course, and close to the world-famous Punta Espada Golf Course.</li><li><b>Marina:</b> Cap Cana Marina (yachting, fishing, sailing).</li><li><b>Dining &amp; Shopping:</b> A variety of high-end restaurants, cafes, and shops within Cap Cana.</li></ul>' }
      ]
    },
    {
      seccion: 'INTERACTIVE SALES PLATFORM',
      items: [
        { q: 'The reservation process', a: '<p><strong>All reservations will happen online via the interactive sales platform.</strong></p><ol><li>Register and log in to <a href="https://sales.makai-capcana.com/" target="_blank" rel="noopener">sales.makai-capcana.com</a>.</li><li>Click the RESERVE button on your selected condo to start the process.</li><li>Complete the form and accept the terms: <b>Click RESERVE</b></li><li>Your reservation will move to a pending state. You’ll have 10 minutes to complete the USD $2,000 deposit – plenty of time to finalize through the secure Stripe checkout. Accepted payment methods include major credit cards and supported digital wallet options.</li><li>Once the USD $2,000 deposit fee is concluded, your condo will be reserved!*</li><li>You will then receive an email from our team confirming your reservation.</li></ol><p>*<a href="https://makai-capcana.com/terms-and-conditions/" target="_blank" rel="noopener">Ts&amp;Cs</a> Apply</p><p><b>Next steps</b>:</p><ul><li>The KYC Form and Agreement of Sale will be sent to you via email by one of our sales agents.</li><li>The KYC Form will need to be signed and returned to us within 48 hours.</li><li>The Agreement of Sale will need to be signed and returned to us within one week from receiving it.</li></ul><p>Finance Options:</p><ul><li><b>Option A</b>:<br>– USD $2,000 deposit (applied toward your purchase price)<br>– 25% Down payment (required 30 days after the purchase)<br>– 35% During construction<br>– Balance due 60 days before condo delivery</li><li><b>Option B</b>: <b>(2% discount)</b><br>– USD $2,000 deposit (applied toward your purchase price)<br>– 60% Down payment (required 30 days after the purchase)<br>– Balance due 60 days before condo delivery</li><li><b>Option C</b>: <b>(4% discount)</b><br>– USD $2,000 deposit (applied toward your purchase price)<br>– 80% Down payment (required 30 days after the purchase)<br>– Balance due 60 days before condo delivery</li></ul>' },
        { q: 'Benefits of purchasing on launch day', a: '<ul><li>USD $20,000 launch discount.</li><li>Free furniture pack on launch (thereafter furniture packs are to be purchased at USD $30,000).</li><li>Capital appreciation in Cap Cana has historically averaged approximately 5% per annum for comparable pre-construction developments. Past performance is not a guarantee of future results.</li><li>Rare opportunity to own in Cap Cana, a luxury gated community that is widely regarded as one of the Caribbean’s most desirable addresses, with a prime location and proximity to the beach, golf course, key amenities, and tourist attractions.</li></ul>' }
      ]
    }
  ];

  /* ---- construir el modal en el DOM ---- */
  function crearModal() {
    var modal = document.createElement('div');
    modal.className = 'faq-modal';
    modal.id = 'faq-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-label', 'Frequently Asked Questions');

    var html = '<div class="faq-modal__overlay" data-faq-close></div>' +
      '<div class="faq-modal__panel">' +
      '<button class="faq-modal__close" data-faq-close aria-label="Close">×</button>' +
      '<div class="faq-modal__scroll">' +
      '<h1 class="faq-modal__title">Frequently Asked Questions</h1>' +
      '<div class="faq-modal__title-rule"></div>';

    DATA.forEach(function (sec) {
      html += '<h3 class="faq-modal__section-title">' + sec.seccion + '</h3>';
      sec.items.forEach(function (it) {
        html += '<div class="faq-item">' +
          '<button class="faq-item__q" aria-expanded="false"><span>' + it.q + '</span>' +
          '<span class="faq-item__icon" aria-hidden="true"></span></button>' +
          '<div class="faq-item__a"><div class="faq-item__a-inner">' + it.a + '</div></div>' +
          '</div>';
      });
    });

    html += '</div></div>';
    modal.innerHTML = html;
    document.body.appendChild(modal);
    return modal;
  }

  var modal = crearModal();
  var abierto = false;

  /* bloqueo de scroll de la página: usa Lenis si está, sino overflow */
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

  /* ---- acordeón: cada pregunta abre/cierra su respuesta (independientes,
         como los toggles de Salient); altura animada 0 <-> auto ---- */
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

  /* cerrar con Escape */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && abierto) cerrar();
  });

  /* ---- interceptar los enlaces "FAQS" (menú desktop, footer, menú
         móvil): apuntan a makai-capcana.com/faqs/. Abren el modal en
         vez de navegar. Delegado en document para cubrir markup clonado. ---- */
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href*="/faqs"]');
    if (!a) return;
    e.preventDefault();
    // si el panel móvil está abierto, ciérralo antes (lo gestiona mobile-nav)
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
