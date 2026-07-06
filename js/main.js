/* Makai — interacciones reimplementadas en GSAP (vanilla, sin build step).
   Sustituye al JS del theme Salient que la extensión de guardado desactivó.
   Cada módulo es independiente y se salta si su markup no existe. */
(function () {
  'use strict';
  if (typeof gsap === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  var desktop = window.matchMedia('(min-width: 1000px)').matches;

  /* ============================================================
     0. SMOOTH SCROLL (Lenis) — la oficial usa Lenis 1.1.13 con
        opciones por defecto (html.lenis / lenis-scrolling). Se
        sincroniza con el ticker de GSAP y actualiza ScrollTrigger
        en cada frame para que los scrubs sigan al scroll suavizado.
        Se respeta prefers-reduced-motion.
     ============================================================ */
  (function smoothScroll() {
    if (typeof Lenis === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var lenis = new Lenis({ autoRaf: false });
    window.lenis = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);
  })();

  /* ============================================================
     1. HEADER — transparente arriba, se oculta al bajar,
        reaparece blanco al subir (patrón Salient "hide until needed")
     ============================================================ */
  (function header() {
    var H = document.getElementById('header-outer');
    if (!H) return;
    H.classList.add('transparent');
    var lastY = 0;
    var shown = true;

    function setShown(v) {
      if (shown === v) return;
      shown = v;
      gsap.to(H, { yPercent: v ? 0 : -101, duration: 0.35, ease: 'power2.out', overwrite: 'auto' });
    }

    window.addEventListener('scroll', function () {
      var y = window.scrollY;
      if (y <= 60) {
        H.classList.add('transparent');
        H.classList.remove('detached');
        setShown(true);
      } else {
        H.classList.remove('transparent');
        H.classList.add('detached');
        setShown(y < lastY); // subiendo -> mostrar, bajando -> ocultar
      }
      lastY = y;
    }, { passive: true });
  })();

  /* ============================================================
     2. MENÚ — dropdowns al hover (reemplaza superfish)
     ============================================================ */
  (function dropdowns() {
    document.querySelectorAll('#header-outer .sf-menu > li').forEach(function (li) {
      // ul.sub-menu sin .dropdown-menu: el submenú de DOWNLOADS (tracked-pos)
      var ul = li.querySelector(':scope > ul.dropdown-menu, :scope > ul.sub-menu, :scope > .nectar-global-section-megamenu');
      if (!ul) return;
      var hideTween = null;
      li.addEventListener('mouseenter', function () {
        if (hideTween) hideTween.kill();
        li.classList.add('sfHover');
        ul.style.display = 'block';
        gsap.fromTo(ul, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.3, ease: 'power2.out' });
      });
      li.addEventListener('mouseleave', function () {
        hideTween = gsap.to(ul, {
          autoAlpha: 0, y: 8, duration: 0.22, ease: 'power2.in',
          onComplete: function () { ul.style.display = 'none'; li.classList.remove('sfHover'); }
        });
      });
    });
  })();

  /* ============================================================
     3. HERO SLIDERS — crossfade cada 10s (data-autorotate="10000"),
        caption fade-in desde abajo, paginación por puntos.
        La página tiene DOS instancias del nectar-slider: la desktop
        (instance-1, oculta <768) y la mobile (instance-2, oculta
        ≥768; medido en la oficial a 390: 360px de alto, 4 slides,
        mismo autorotate, sin parallax). Se inicializa cada
        instancia visible en el viewport de carga.
     ============================================================ */
  function iniciarHeroSlider(wrap) {
    var wrapper = wrap.querySelector('.swiper-wrapper');
    var slides = Array.prototype.slice.call(wrap.querySelectorAll('.swiper-slide'));
    if (!wrapper || slides.length < 2) return;

    // normalizar el estado congelado por la extensión
    wrapper.style.cssText = 'width:100%;height:100%;position:relative;';
    slides.forEach(function (s, i) {
      s.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;';
      s.classList.remove('swiper-slide-active', 'swiper-slide-visible');
      gsap.set(s, { autoAlpha: i === 0 ? 1 : 0, zIndex: i === 0 ? 2 : 1 });
    });

    // corregir geometría congelada de los fondos (altura/offset de la
    // ventana de captura) sin tocar su background-image inline
    Array.prototype.slice.call(wrap.querySelectorAll('.image-bg')).forEach(function (bg) {
      bg.style.height = '100%';
      bg.style.width = '100%';
      bg.style.top = '0px';
      bg.style.marginTop = '0px';
    });

    var actual = 0;
    var autorotate = parseInt(wrap.getAttribute('data-autorotate'), 10) || 10000;
    var timer = null;

    // paginación: la captura congeló 2 bullets para 4 slides — se clona la
    // plantilla hasta igualar. Activo = .swiper-active-switch (como el CSS
    // de Salient); el anillo countdown es .ar-vis: dashoffset 180→8 con
    // transición inline a la duración del autorotate (sin .ar-vis el CSS
    // lo resetea instantáneo con transition-duration 0s)
    var dots = [];
    var pag = wrap.querySelector('.slider-pagination');
    if (pag) {
      var plantilla = pag.querySelector('.swiper-pagination-switch');
      while (plantilla && pag.querySelectorAll('.swiper-pagination-switch').length < slides.length) {
        pag.appendChild(plantilla.cloneNode(true));
      }
      dots = Array.prototype.slice.call(pag.querySelectorAll('.swiper-pagination-switch')).slice(0, slides.length);
      dots.forEach(function (d) {
        d.className = 'swiper-pagination-switch';
        var t = d.querySelector('circle.time');
        if (t) t.style.transition = 'stroke-dashoffset ' + (autorotate + 100) + 'ms linear, stroke 0.2s';
      });
    }

    function marcarDot(i) {
      dots.forEach(function (d, k) {
        d.classList.remove('ar-vis');
        d.classList.toggle('swiper-active-switch', k === i);
        d.classList.toggle('swiper-visible-switch', k === i);
      });
      if (dots[i]) {
        void dots[i].offsetWidth; // reflow: el anillo vacía antes de arrancar
        dots[i].classList.add('ar-vis');
      }
    }

    function caption(slide) {
      var c = slide.querySelector('.content, .video-texture ~ div, .container');
      if (!c) return;
      gsap.fromTo(c, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.9, delay: 0.25, ease: 'power3.out' });
    }

    function ir(i) {
      if (i === actual) return;
      var sale = slides[actual], entra = slides[i];
      gsap.set(entra, { zIndex: 2 });
      gsap.set(sale, { zIndex: 1 });
      gsap.fromTo(entra, { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.1, ease: 'power1.inOut' });
      gsap.to(sale, { autoAlpha: 0, duration: 1.1, ease: 'power1.inOut' });
      caption(entra);
      actual = i;
      marcarDot(i);
    }

    function programar() {
      clearInterval(timer);
      timer = setInterval(function () { ir((actual + 1) % slides.length); }, autorotate);
    }

    dots.forEach(function (d, k) {
      d.addEventListener('click', function () { if (k < slides.length) { ir(k); programar(); } });
    });
    programar();
    marcarDot(0);
    caption(slides[0]);

    // parallax bg_only del hero — el bg baja a 1/4 de la velocidad del
    // scroll (medido en la oficial: +100px de translateY a 400px de
    // scroll; la instancia mobile lleva data-parallax="false" y no entra)
    if (desktop && wrap.getAttribute('data-parallax') === 'true') {
      slides.forEach(function (s) {
        var bg = s.querySelector('.image-bg');
        if (!bg) return;
        gsap.fromTo(bg, { y: 0 }, {
          y: function () { return wrap.offsetHeight * 0.25; },
          ease: 'none',
          scrollTrigger: { trigger: wrap, start: 'top top', end: 'bottom top', scrub: true, invalidateOnRefresh: true }
        });
      });
    }
  }

  (function heroSliders() {
    document.querySelectorAll('.nectar-slider-wrap').forEach(function (wrap) {
      // la variante oculta en este viewport (desktop <768 / mobile ≥768)
      // se salta: su geometría es 0 y sus timers serían ruido
      if (!wrap.offsetWidth || !wrap.offsetHeight) return;
      iniciarHeroSlider(wrap);
    });

    // overlay de oscurecimiento al scrollear (regla CSS var(--scroll-progress))
    document.querySelectorAll('[style*="--scroll-progress"]').forEach(function (el) {
      ScrollTrigger.create({
        trigger: el, start: 'top top', end: 'bottom top', scrub: true,
        onUpdate: function (st) { el.style.setProperty('--scroll-progress', st.progress.toFixed(3)); }
      });
    });
  })();

  /* ============================================================
     4. REVEALS AL SCROLL
        a) split headings (line-reveal-by-space): spans .inner ya
           generados por el theme antes de la captura
        b) botones WPBakery (fadeInUp / zoomIn): re-disparar sus
           keyframes CSS re-aplicando las clases
     ============================================================ */
  (function reveals() {
    document.querySelectorAll('.nectar-split-heading').forEach(function (sh) {
      var inners = sh.querySelectorAll('h1 > span, h2 > span, h3 > span, h4 > span');
      inners.forEach(function (outer) { outer.style.cssText += ';display:inline-block;overflow:hidden;vertical-align:bottom;'; });
      var piezas = sh.querySelectorAll('span.inner');
      if (!piezas.length) return;
      gsap.set(piezas, { display: 'inline-block', yPercent: 115 });
      ScrollTrigger.create({
        trigger: sh, start: 'top 82%', once: true,
        onEnter: function () {
          gsap.to(piezas, { yPercent: 0, duration: 1, stagger: 0.12, ease: 'power4.out' });
        }
      });
    });

    document.querySelectorAll('.wpb_animate_when_almost_visible').forEach(function (el) {
      var efecto = el.classList.contains('zoomIn') ? 'zoomIn' : 'fadeInUp';
      el.classList.remove('animated', 'fadeInUp', 'zoomIn');
      el.style.opacity = '0';
      ScrollTrigger.create({
        trigger: el, start: 'top 88%', once: true,
        onEnter: function () {
          el.style.opacity = '';
          el.classList.add(efecto, 'animated');
        }
      });
    });

    var fadeBottom = document.querySelectorAll('[data-animation="fade-in-from-bottom"]');
    fadeBottom.forEach(function (el) {
      gsap.set(el, { autoAlpha: 0, y: 50 });
      ScrollTrigger.create({
        trigger: el, start: 'top 85%', once: true,
        onEnter: function () { gsap.to(el, { autoAlpha: 1, y: 0, duration: 0.9, ease: 'power3.out' }); }
      });
    });
  })();

  /* ============================================================
     5. CARRUSELES FLICKITY (condos / amenities) — reconstruidos:
        track flex + navegación por puntos + drag con snap
     ============================================================ */
  (function carruseles() {
    document.querySelectorAll('.nectar-flickity').forEach(function (root) {
      var viewport = root.querySelector('.flickity-viewport');
      var track = root.querySelector('.flickity-slider');
      // team-mobile quedó capturado SIN inicializar (Salient difiere su JS
      // a la primera interacción): se construye viewport/track como haría
      // flickity para reutilizar la misma lógica de navegación
      if (!viewport || !track) {
        var sueltas = Array.prototype.slice.call(root.querySelectorAll(':scope > .cell'));
        if (sueltas.length < 2) return;
        viewport = document.createElement('div');
        viewport.className = 'flickity-viewport';
        track = document.createElement('div');
        track.className = 'flickity-slider';
        viewport.appendChild(track);
        sueltas.forEach(function (c) { track.appendChild(c); });
        root.insertBefore(viewport, root.firstChild);
        root.classList.add('flickity-enabled', 'is-draggable');
        root.classList.remove('not-initialized');
      }
      var cells = Array.prototype.slice.call(track.querySelectorAll(':scope > .cell'));
      if (cells.length < 2) return;

      // limpiar layout congelado de flickity
      viewport.style.cssText = 'overflow:hidden;position:relative;width:100%;';
      track.style.cssText = 'display:flex;position:relative;';
      cells.forEach(function (c) {
        c.style.position = 'relative';
        c.style.left = 'auto';
        c.style.transform = 'none';
        c.style.flex = '0 0 auto';
        c.removeAttribute('aria-hidden');
      });
      viewport.style.height = ''; // que la altura salga del contenido

      var idx = 0;
      var setX = gsap.quickTo(track, 'x', { duration: 0.65, ease: 'power3.out' });

      // dots material (team-mobile): el theme los genera al inicializar,
      // así que en la captura no existen — mismo markup estándar de
      // flickity y el CSS de style.css (material_pagination) los estiliza
      var dotsWrap = root.querySelector('.flickity-page-dots');
      if (!dotsWrap && root.getAttribute('data-control-style') === 'material_pagination') {
        dotsWrap = document.createElement('ol');
        dotsWrap.className = 'flickity-page-dots';
        cells.forEach(function () {
          var li = document.createElement('li');
          li.className = 'dot';
          dotsWrap.appendChild(li);
        });
        root.appendChild(dotsWrap);
      }
      var dots = Array.prototype.slice.call(root.querySelectorAll('.flickity-page-dots .dot'));

      // barra "visualized total" (amenities): ancho = 1/páginas y avance a
      // translateX(100%·página). Medido en la oficial: móvil 3 celdas de
      // 1 col → 33.33%; el 50% congelado del desktop = 2 páginas
      var barra = root.querySelector('.visualized-total span') ||
        (root.parentElement && root.parentElement.querySelector('.visualized-total span'));
      // páginas como el groupCells de flickity: celdas agrupadas de forma
      // voraz mientras quepan en el viewport (medido en la oficial:
      // amenities = 3 páginas a 390 [1 celda/página] y 2 a desktop
      // [895] + [537+537])
      function paginas() {
        var vw = Math.max(1, viewport.offsetWidth);
        var p = 0, suma = vw + 1; // fuerza abrir página con la 1ª celda
        cells.forEach(function (c) {
          var wc = Math.min(c.offsetWidth, vw);
          if (suma + wc > vw) { p++; suma = wc; } else { suma += wc; }
        });
        return Math.max(1, p);
      }
      function medirBarra() { if (barra) barra.style.width = (100 / paginas()) + '%'; }
      medirBarra();
      // el ancho de las celdas depende de imágenes width:auto (y lazy):
      // el scrollWidth solo es fiable cuando cada una ha cargado
      Array.prototype.slice.call(track.querySelectorAll('img')).forEach(function (img) {
        if (!img.complete) img.addEventListener('load', medirBarra);
      });
      window.addEventListener('load', medirBarra);

      function maxX() { return Math.min(0, viewport.offsetWidth - track.scrollWidth); }
      function posDe(i) { return Math.max(maxX(), -cells[i].offsetLeft); }
      function ir(i) {
        idx = Math.max(0, Math.min(i, cells.length - 1));
        setX(posDe(idx));
        cells.forEach(function (c, k) { c.classList.toggle('is-selected', k === idx); });
        dots.forEach(function (d, k) { d.classList.toggle('is-selected', k === idx); });
        if (barra) {
          medirBarra();
          var pagina = Math.round(idx * (paginas() - 1) / Math.max(1, cells.length - 1));
          gsap.to(barra, { xPercent: pagina * 100, duration: 0.45, ease: 'power2.out' });
        }
      }
      dots.forEach(function (d, k) { d.addEventListener('click', function () { ir(k); }); });

      // drag con snap a la celda más cercana
      var startX = 0, baseX = 0, arrastrando = false;
      viewport.addEventListener('pointerdown', function (e) {
        arrastrando = true; startX = e.clientX; baseX = gsap.getProperty(track, 'x');
        try { viewport.setPointerCapture(e.pointerId); } catch (err) { }
      });
      viewport.addEventListener('pointermove', function (e) {
        if (!arrastrando) return;
        gsap.set(track, { x: Math.max(maxX() - 80, Math.min(80, baseX + e.clientX - startX)) });
      });
      viewport.addEventListener('pointerup', function (e) {
        if (!arrastrando) return;
        arrastrando = false;
        var x = gsap.getProperty(track, 'x');
        var mejor = 0, dist = Infinity;
        cells.forEach(function (c, k) {
          var d = Math.abs(x - posDe(k));
          if (d < dist) { dist = d; mejor = k; }
        });
        // pequeño empujón en la dirección del gesto
        if (mejor === idx && Math.abs(e.clientX - startX) > 60) mejor += (e.clientX < startX ? 1 : -1);
        ir(mejor);
      });
      window.addEventListener('resize', function () {
        gsap.set(track, { x: posDe(idx) });
        if (barra) barra.style.width = (100 / paginas()) + '%';
      });
      ir(0);
    });
  })();

  /* ============================================================
     5b. FONDOS QUE SE ENCOGEN CON BORDES REDONDEADOS
        (data-bg-animation="clip-path" en los heroes y CTAs).
        Cada fila declara su animación exacta en el atributo
        data-nectar-animate-settings (JSON del theme): inset final
        por viewport (desktop/tablet/phone — en la oficial el clip
        se DESACTIVA en tablet con end≈0) y offsets del mapeo de
        scroll (heroes 10→90: completa con el borde superior
        rozando arriba; CTAs 0→50: completa a media pantalla).
        Buckets estándar de Salient: desktop ≥1000, tablet 691–999,
        phone ≤690 (verificado en la oficial a 1024/800).
        scrub directo (true): Lenis ya suaviza el scroll; un scrub
        con retardo encima desconectaba el recorte del movimiento.
     ============================================================ */
  (function fondosClip() {
    var bucket = window.innerWidth > 999 ? 'desktop' : (window.innerWidth > 690 ? 'tablet' : 'phone');
    document.querySelectorAll('.row-bg-wrap[data-bg-animation="clip-path"]').forEach(function (wrap) {
      var inner = wrap.querySelector('.inner-wrap.row-bg-layer');
      var row = wrap.closest('.wpb_row');
      if (!inner || !row) return;
      var cfg = null;
      try { cfg = JSON.parse(row.getAttribute('data-nectar-animate-settings') || 'null'); } catch (e) { }
      var anim = cfg && cfg.animations && (cfg.animations[bucket] || cfg.animations.desktop);
      var hasta = (anim && anim.clipPath && anim.clipPath.end) || 'inset(4vw 2vw 4vw 2vw round 20px)';
      // el start se sintetiza desde el end (mismos huecos y unidades a 0)
      // para que GSAP interpole sin mezclar unidades vw/vh/px
      var desde = hasta.replace(/(\d*\.?\d+)([a-z%]*)/g, '0$2');
      var offs = (cfg && cfg.offsets) || { start: '0', end: '100' };
      gsap.fromTo(inner,
        { clipPath: desde },
        {
          clipPath: hasta, ease: 'none',
          scrollTrigger: {
            trigger: row,
            start: 'top ' + (100 - (parseFloat(offs.start) || 0)) + '%',
            end: 'top ' + (100 - (parseFloat(offs.end) || 100)) + '%',
            scrub: true, invalidateOnRefresh: true
          }
        });
    });
  })();

  /* ============================================================
     5b-bis. PARALLAX DE FONDOS (.row-bg.translate).
        La extensión congeló el translateY de la captura y dejaba
        franja sin imagen (el border-radius del clip recortaba zona
        vacía). Medido en la oficial a 1440×900 (condos-hero,
        muestreo del recorrido completo): el fondo mide la fila +
        0.266·vh (~240px) anclado en top:-margen, y baja LINEAL a
        0.2× la velocidad de scroll durante TODO el tránsito de la
        fila (y: 0 en 'top bottom' → 0.2·(vh+alto) en 'bottom top';
        0/45/90/…/360 a pasos de 0.25·vh). La franja que descubre
        al final queda siempre por encima del viewport (el fondo
        cede a 0.2× mientras la fila sube a 1×).
     ============================================================ */
  (function fondosParallax() {
    document.querySelectorAll('.row-bg.translate').forEach(function (bg) {
      var wrap = bg.closest('.row-bg-wrap');
      var row = bg.closest('.wpb_row');
      if (!wrap || !row) return;
      var margen = function () { return window.innerHeight * 0.266; };
      function medir() {
        var m = margen();
        bg.style.height = (wrap.offsetHeight + m) + 'px';
        bg.style.top = -m + 'px';
      }
      medir();
      ScrollTrigger.addEventListener('refreshInit', medir);
      gsap.fromTo(bg,
        { y: 0, scale: 1.005, force3D: true },
        {
          y: function () { return 0.2 * (window.innerHeight + wrap.offsetHeight); },
          scale: 1.005, ease: 'none', force3D: true,
          scrollTrigger: {
            trigger: wrap, start: 'top bottom', end: 'bottom top',
            scrub: true, invalidateOnRefresh: true
          }
        });
    });
  })();

  /* ============================================================
     5c. COLUMNAS CON SCROLL-ANIMATION (Ocean & Landscape):
        los textos entran desplazados y cruzan el centro con el
        scroll. La intensidad viene en el markup
        ("data-scroll-animation-intensity") en dos formatos:
        - "n" (p. ej. "3.5"): recorrido SIMÉTRICO +M → −M cruzando
          por cero a media pantalla. Medido en la oficial a
          1440×900 (fila de 157px, n=3.5): M = n·(vh+alto)/20
          (187px; muestras +260 → −258 lineales sobre el
          recorrido bottom→top).
        - "a to b" (p. ej. "-2 to 0"): de a·K a b·K con
          K ≈ vw/18 (medido antes en la oficial; se conserva).
     ============================================================ */
  (function columnasScroll() {
    document.querySelectorAll('.wpb_column[data-scroll-animation="true"]').forEach(function (col) {
      if (!col.offsetWidth) return; // variante mobile oculta
      var inner = col.querySelector(':scope > .vc_column-inner');
      var movimiento = col.getAttribute('data-scroll-animation-movement');
      if (!inner || movimiento !== 'transform_x') return;
      var bruto = (col.getAttribute('data-scroll-animation-intensity') || '0');
      var partes = bruto.split('to');
      var fila = col.closest('.wpb_row') || col;
      var desde, hasta, K;
      if (partes.length > 1) {
        desde = parseFloat(partes[0]) || 0;
        hasta = parseFloat(partes[1]) || 0;
        K = function () { return window.innerWidth / 18; };
      } else {
        desde = parseFloat(partes[0]) || 0;
        hasta = -desde;
        K = function () { return (window.innerHeight + fila.offsetHeight) / 20; };
      }
      inner.style.transform = '';
      gsap.fromTo(inner, { x: function () { return desde * K(); } }, {
        x: function () { return hasta * K(); }, ease: 'none',
        scrollTrigger: { trigger: fila, start: 'top bottom', end: 'bottom top', scrub: true, invalidateOnRefresh: true }
      });
    });
  })();

  /* ============================================================
     6. MARQUEE "HOTEL INSPIRED RESIDENCES" — continuo por tiempo
     ============================================================ */
  (function marquee() {
    // continuo por tiempo, ~52px/s hacia la izquierda (medido en la oficial),
    // con loop perfecto usando el ancho de un chunk repetido
    document.querySelectorAll('.nectar-scrolling-text').forEach(function (root) {
      var inner = root.querySelector('.nectar-scrolling-text-inner');
      if (!inner) return;
      var chunks = inner.querySelectorAll('.nectar-scrolling-text-inner__text-chunk');
      chunks.forEach(function (c) { c.style.transform = ''; });
      var ancho = chunks.length ? chunks[0].offsetWidth : inner.scrollWidth / 2;
      if (!ancho) return;
      var anim = gsap.fromTo(inner, { x: 0 }, { x: -ancho, duration: ancho / 52, ease: 'none', repeat: -1, paused: true });
      // solo corre mientras está en viewport (ahorra main thread al scrollear otras zonas)
      ScrollTrigger.create({
        trigger: root, start: 'top bottom', end: 'bottom top',
        onToggle: function (st) { if (st.isActive) anim.play(); else anim.pause(); }
      });
    });
  })();

  /* ============================================================
     7. STICKY MEDIA (Key Locations) — el contenido entra en
        horizontal según el paso activo del scroll
     ============================================================ */
  (function stickySections() {
    document.querySelectorAll('.nectar-sticky-media-sections').forEach(function (root) {
      var secciones = Array.prototype.slice.call(root.querySelectorAll('.nectar-sticky-media-section__content-section'));
      if (secciones.length < 2 || root.offsetHeight < 100) return;

      // limpiar transforms congelados por la extensión (conservar el top sticky)
      secciones.forEach(function (s, i) {
        s.style.transform = '';
        s.style.removeProperty('--progress');
        gsap.set(s, { zIndex: i + 1 });
      });

      if (root.className.indexOf('type--horizontal') !== -1) {
        // LOCATION: scrub lineal en bloque con frenado por slot. Medido en
        // la oficial a 1440×900 (muestreo de las 6 tarjetas a lo largo del
        // pin): T = −(0.0813·vw + (total − 0.0813·vw)·progreso), y cada
        // tarjeta descansa en −paso'·i con paso' = paso − 0.0979·vw — la
        // cascada de ~141px que deja visible el borde de cada tarjeta
        // tapada (en la oficial: reposos a −599·i con offsetLeft a 740·i)
        var pasoPx = secciones[1].offsetLeft - secciones[0].offsetLeft;
        var setters = secciones.map(function (s) { return gsap.quickSetter(s, 'x', 'px'); });
        ScrollTrigger.create({
          trigger: root, start: 'top top', end: 'bottom bottom', scrub: true,
          onUpdate: function (st) {
            var vw = window.innerWidth;
            var pasoRest = pasoPx - 0.0979 * vw;
            var offset0 = 0.0813 * vw;
            var total = pasoRest * (secciones.length - 1);
            var T = -(offset0 + (total - offset0) * st.progress);
            secciones.forEach(function (s, i) { setters[i](Math.max(T, -pasoRest * i)); });
          }
        });
      }
      // type--scroll-pin (condos): sin transforms — el position:sticky del CSS
      // apila los paneles solo: el siguiente tapa al anterior al scrollear
    });
  })();

  /* ============================================================
     8. POPUP EXIT-INTENT (Hustle "Interactive Price List")
        una vez por sesión, al sacar el cursor por arriba
     ============================================================ */
  (function popup() {
    var mask = document.querySelector('.hustle-popup-mask');
    var modal = document.querySelector('.hustle-popup');
    if (!mask || !modal || sessionStorage.getItem('mk-popup')) return;
    var contenido = modal.querySelector('.hustle-popup-content') || modal;
    // el CSS de Hustle ya capturado esconde el contenido por diseño
    // (.hustle-animate { opacity:0 }, base para sus animaciones de
    // entrada/salida) y solo lo revela cuando se le añade el modificador
    // correspondiente a data-intro/data-outro del propio popup (aquí
    // "no_animation" → .hustle-animate-in--no_animation { opacity:1 },
    // sin keyframe). El plugin real alterna esa clase vía JS; como
    // sustituimos su JS por GSAP nunca se añadía, así que el contenido
    // quedaba invisible bajo el overlay aunque este sí se veía.
    var intro = modal.getAttribute('data-intro') || 'no_animation';
    var outro = modal.getAttribute('data-outro') || 'no_animation';

    function cerrar() {
      contenido.classList.remove('hustle-animate-in--' + intro);
      contenido.classList.add('hustle-animate-out--' + outro);
      gsap.to([modal, mask], {
        autoAlpha: 0, duration: 0.3, onComplete: function () {
          modal.style.display = 'none'; mask.style.display = 'none';
          document.documentElement.style.overflow = '';
        }
      });
    }
    function abrir() {
      sessionStorage.setItem('mk-popup', '1');
      mask.style.display = 'block';
      modal.style.display = 'flex';
      contenido.classList.remove('hustle-animate-out--' + outro);
      contenido.classList.add('hustle-animate-in--' + intro);
      gsap.fromTo(mask, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.35 });
      gsap.fromTo(modal, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.35 });
      gsap.fromTo(contenido, { scale: 0.92, y: 20 }, { scale: 1, y: 0, duration: 0.45, ease: 'power3.out' });
      document.documentElement.style.overflow = 'hidden';
    }

    document.addEventListener('mouseout', function salida(e) {
      if (e.relatedTarget || e.clientY > 10) return;
      document.removeEventListener('mouseout', salida);
      abrir();
    });
    modal.querySelectorAll('.hustle-button-close, [data-close], a').forEach(function (b) {
      if (b.classList.contains('hustle-button-cta')) return; // el CTA navega, no cierra
      b.addEventListener('click', function (e) {
        if (b.tagName === 'A' && (b.getAttribute('href') || '#') === '#') e.preventDefault();
        cerrar();
      });
    });
    mask.addEventListener('click', cerrar);
  })();

  window.addEventListener('load', function () { ScrollTrigger.refresh(); });
})();
