/* Makai — navegación móvil (hamburger + off-canvas).
   Propietario: agente mobile-nav. Cargado después de main.js.
   Mismo estilo que main.js: IIFE, vanilla, cada módulo se salta si
   su markup no existe.

   Medido en la original (390×844 y 800×1024, emulación táctil):
   - El panel #slide-out-widget-area (340px, fondo blanco) entra desde la
     IZQUIERDA: el CSS custom del cliente lo ancla en left:0 con
     translate3d(-101%,0,0) a ≤1020px. El JS del theme solo añade la clase
     `open` + transform inline translate3d(0,0,0); la transición la pone el
     CSS ya capturado en style.css: transform .7s cubic-bezier(.25,1,.2,1)
     y opacity .1s (apertura) / .2s ease .3s (cierre). Al cerrar se quita
     la clase y el transform inline y el CSS lo devuelve solo.
   - El overlay #slide-out-widget-area-bg NO se usa en este estilo (queda
     1×1px, opacity 0) y el scroll de la página NO se bloquea.
   - El cierre no es la X del markup (.slide_out_area_close: display none)
     sino el toggle fijo .slide-out-hover-icon-effect que el theme mueve
     con inline top/left para quedar sobre el hamburger del header
     (línea central de ambos .lines-button alineada: top 25px / left 29px)
     y cuyo .lines-button recibe la clase `unhidden-line` (dibuja las
     líneas en #627b68 sobre el panel; en hover el CSS las convierte en X).
     También cierran: click fuera del panel y click en un link del menú.
   - Submenús (data-dropdown-func="default"): patrón subvista — ul.menu
     recibe `subview`, el li `subviewopen` (el CSS oculta el resto y
     muestra el sub-menu con su li.back "Back"); el theme funde el menú
     quitando `menuopen` con transition all .25s (clase menu-toggle) y
     pina la altura de .menu-wrap en px (medido: 228px con DOWNLOADS).
   - Al abrir, el theme fija en .inner height:auto + min-height = viewport
     − paddings del panel (80+54) − margin-bottom de .inner (30) −
     bottom-meta-wrap con su margin-top (medido: 527px a 844 de alto).
   - body.mobile la añade el JS de Salient a ≤999px (presente a 999,
     ausente a 1000); muchas reglas de style.css dependen de ella. */
(function () {
  'use strict';

  /* ============================================================
     1. CLASE mobile EN BODY — como Salient, según ancho (≤999px),
        en carga y en resize (matchMedia cubre ambos sentidos)
     ============================================================ */
  (function bodyMobile() {
    var mq = window.matchMedia('(max-width: 999px)');
    function aplicar() { document.body.classList.toggle('mobile', mq.matches); }
    aplicar();
    if (mq.addEventListener) mq.addEventListener('change', aplicar);
    else window.addEventListener('resize', aplicar);
  })();

  /* ============================================================
     2. OFF-CANVAS (panel + toggles + subvistas)
     ============================================================ */
  (function offcanvas() {
    var panel = document.getElementById('slide-out-widget-area');
    if (!panel) return;
    var headerToggle = document.querySelector('#header-outer .slide-out-widget-area-toggle.mobile-icon');
    var fijo = document.querySelector('.slide-out-widget-area-toggle.slide-out-hover-icon-effect');
    var linesFijo = fijo ? fijo.querySelector('.lines-button') : null;
    var inner = panel.querySelector('.inner-wrap > .inner');
    var menuUl = panel.querySelector('.off-canvas-menu-container ul.menu');
    var abierto = false;

    /* normalizar estado congelado por la extensión de guardado */
    panel.classList.remove('open');
    panel.style.transform = '';
    if (linesFijo) linesFijo.classList.remove('unhidden-line');
    if (menuUl) {
      menuUl.classList.add('menuopen');
      menuUl.classList.remove('subview', 'menu-toggle');
      Array.prototype.slice.call(menuUl.querySelectorAll('.subviewopen')).forEach(function (li) {
        li.classList.remove('subviewopen');
      });
    }

    function anchorsToggle() {
      var sel = [];
      if (headerToggle) sel.push(headerToggle.querySelector('a'));
      if (fijo) sel.push(fijo.querySelector('a'));
      return sel.filter(Boolean);
    }

    /* el toggle fijo (fixed) se recoloca para que la línea central de su
       .lines-button caiga exactamente sobre la del hamburger del header
       (medido en la original: inline top:25px/left:29px a ambos anchos) */
    function alinearFijo() {
      if (!fijo || !headerToggle) return;
      var hl = headerToggle.querySelector('.lines-button');
      var fl = fijo.querySelector('.lines-button');
      if (!hl || !fl) return;
      var rh = hl.getBoundingClientRect();
      var rf = fijo.getBoundingClientRect();
      var rfl = fl.getBoundingClientRect();
      fijo.style.top = Math.round(rh.top - (rfl.top - rf.top)) + 'px';
      fijo.style.left = Math.round(rh.left - (rfl.left - rf.left)) + 'px';
    }

    /* .inner: min-height para que el bloque de menú quede centrado en
       vertical y el bottom-meta-wrap al fondo (fórmula que reproduce el
       527px medido en la original a 844 de alto de viewport) */
    function medirInner() {
      if (!inner) return;
      var meta = panel.querySelector('.bottom-meta-wrap');
      var csP = getComputedStyle(panel);
      var csI = getComputedStyle(inner);
      var libre = window.innerHeight
        - (parseFloat(csP.paddingTop) || 0) - (parseFloat(csP.paddingBottom) || 0)
        - (parseFloat(csI.marginBottom) || 0)
        - (meta ? meta.offsetHeight + (parseFloat(getComputedStyle(meta).marginTop) || 0) : 0);
      inner.style.height = 'auto';
      inner.style.minHeight = Math.max(0, Math.round(libre)) + 'px';
    }

    function abrir() {
      if (abierto) return;
      abierto = true;
      alinearFijo();
      medirInner();
      panel.classList.add('open');
      panel.style.transform = 'translate3d(0,0,0)'; // la transición .7s la pone style.css
      if (linesFijo) linesFijo.classList.add('unhidden-line');
      anchorsToggle().forEach(function (a) { a.setAttribute('aria-expanded', 'true'); });
    }

    function cerrar() {
      if (!abierto) return;
      abierto = false;
      panel.classList.remove('open');
      panel.style.transform = ''; // el CSS lo devuelve a translate3d(-101%,0,0) + opacity 0
      if (linesFijo) linesFijo.classList.remove('unhidden-line');
      anchorsToggle().forEach(function (a) { a.setAttribute('aria-expanded', 'false'); });
    }

    /* subvistas: fundido de .25s quitando/poniendo menuopen (clase
       menu-toggle activa la transition del theme) y altura de .menu-wrap
       pinada en px como hace la original */
    var enTransicion = false;
    function transicionSubvista(cambiar) {
      if (!menuUl || enTransicion) return;
      enTransicion = true;
      var wrap = menuUl.closest('.menu-wrap');
      if (wrap && !wrap.style.height) wrap.style.height = wrap.offsetHeight + 'px';
      menuUl.classList.add('menu-toggle');
      menuUl.classList.remove('menuopen');
      setTimeout(function () {
        cambiar();
        var alto = menuUl.offsetHeight;
        if (wrap) {
          if (typeof gsap !== 'undefined') gsap.to(wrap, { height: alto, duration: 0.3, ease: 'power2.inOut' });
          else wrap.style.height = alto + 'px';
        }
        menuUl.classList.add('menuopen');
        setTimeout(function () {
          menuUl.classList.remove('menu-toggle');
          enTransicion = false;
        }, 260);
      }, 260);
    }

    /* router de clicks: toggles (abre/cierra), fuera (cierra), dentro
       (subvistas y links). Un único listener en document, como el theme. */
    document.addEventListener('click', function (e) {
      var t = e.target;
      if (!(t instanceof Element)) return;

      var toggle = t.closest('.slide-out-widget-area-toggle');
      if (toggle && !panel.contains(toggle)) {
        e.preventDefault();
        if (abierto) cerrar(); else abrir();
        return;
      }

      if (!abierto) return;

      if (!panel.contains(t)) {
        // click fuera: cierra sin activar lo que hubiera debajo
        e.preventDefault();
        cerrar();
        return;
      }

      var a = t.closest('a');
      if (!a || !panel.contains(a)) return;
      var li = a.parentElement;

      // "Back" de una subvista
      if (li && li.classList.contains('back')) {
        e.preventDefault();
        var abiertoLi = a.closest('.subviewopen');
        transicionSubvista(function () {
          if (abiertoLi) abiertoLi.classList.remove('subviewopen');
          if (menuUl && !menuUl.querySelector('.subviewopen')) menuUl.classList.remove('subview');
        });
        return;
      }

      // padre con hijos → abre su subvista (aunque el href sea real,
      // como el selector de idioma; es lo que hace la original)
      if (li && li.classList.contains('menu-item-has-children') && li.querySelector(':scope > ul')) {
        e.preventDefault();
        transicionSubvista(function () {
          menuUl.classList.add('subview');
          li.classList.add('subviewopen');
        });
        return;
      }

      // link ancla de la home: cerrar y scrollear suave (la original anima
      // el ancla ~750ms easeOutCubic — body data-cad="750"/data-cae)
      var href = a.getAttribute('href') || '';
      var pos = href.indexOf('#');
      if (pos !== -1) {
        var destino = document.getElementById(href.slice(pos + 1));
        if (destino) {
          e.preventDefault();
          cerrar();
          if (window.lenis) {
            window.lenis.scrollTo(destino, {
              duration: 0.75,
              easing: function (k) { return 1 - Math.pow(1 - k, 3); }
            });
          } else {
            destino.scrollIntoView({ behavior: 'smooth' });
          }
          return;
        }
        if (href === '#') { e.preventDefault(); return; }
      }
      // link real (brochures, FAQs, price list…): cerrar y dejar navegar
      cerrar();
    });

    /* en resize: recolocar/medir si está abierto; si se cruza al rango
       desktop (≥1025px, nav de main.js) se cierra para no interferir */
    window.addEventListener('resize', function () {
      if (!abierto) return;
      if (window.innerWidth >= 1025) { cerrar(); return; }
      alinearFijo();
      medirInner();
    });
  })();
})();
