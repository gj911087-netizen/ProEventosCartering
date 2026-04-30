/* ══════════════════════════════════════════════════════════
   canvas.js  —  Business Model Canvas · Proeventos S.A.S.
   Ruta: ProEventos/static/ProEventos/js/canvas.js
══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ──────────────────────────────────────────────────────
     1. DETECCIÓN DE DISPOSITIVO TÁCTIL
  ────────────────────────────────────────────────────── */
  const isTouch = () =>
    window.matchMedia('(hover: none)').matches || 'ontouchstart' in window;

  /* ──────────────────────────────────────────────────────
     2. BARRAS DE INTENSIDAD (decorativas por bloque)
     Agrega automáticamente la barra al final de cada bloque
  ────────────────────────────────────────────────────── */
  const intensityMap = {
    'b-aliados':     4,
    'b-activos':     5,
    'b-actividades': 3,
    'b-vp':          5,
    'b-relaciones':  4,
    'b-canales':     3,
    'b-segmentos':   4,
    'b-costos':      3,
    'b-ingresos':    5,
  };

  document.querySelectorAll('.canvas-block').forEach(block => {
    const key = Object.keys(intensityMap).find(k => block.classList.contains(k));
    if (!key) return;

    const filled = intensityMap[key];
    const bar = document.createElement('div');
    bar.className = 'intensity-bar';

    for (let i = 1; i <= 5; i++) {
      const span = document.createElement('span');
      if (i <= filled) span.classList.add('on');
      bar.appendChild(span);
    }
    block.appendChild(bar);
  });

  /* ──────────────────────────────────────────────────────
     3. TILT 3D INDIVIDUAL POR BLOQUE (desktop)
  ────────────────────────────────────────────────────── */
  if (!isTouch()) {
    document.querySelectorAll('.canvas-block').forEach(block => {
      const isVP    = block.classList.contains('b-vp');
      const maxTilt = isVP ? 8 : 12;

      block.addEventListener('mousemove', e => {
        const r  = block.getBoundingClientRect();
        const cx = r.left + r.width  / 2;
        const cy = r.top  + r.height / 2;
        const dx = (e.clientX - cx) / (r.width  / 2);   // -1 a +1
        const dy = (e.clientY - cy) / (r.height / 2);   // -1 a +1

        const ry =  dx * maxTilt;
        const rx = -dy * maxTilt;
        const sc = isVP ? 1.025 : 1.018;
        const ty = isVP ? -12   : -10;

        block.style.transform =
          `translateY(${ty}px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${sc})`;
      });

      block.addEventListener('mouseleave', () => {
        block.style.transform = '';
      });
    });
  }

  /* ──────────────────────────────────────────────────────
     4. PARALLAX SUAVE DEL TABLERO COMPLETO (desktop)
     El lienzo completo gira levemente con el mouse
  ────────────────────────────────────────────────────── */
  const board       = document.getElementById('canvasBoard');
  const perspective = document.getElementById('canvasPerspective');

  if (board && perspective && !isTouch()) {
    let targetRX = 0, targetRY = 0;
    let currentRX = 0, currentRY = 0;
    let rafId = null;

    const MAX_BOARD_TILT = 3; // grados máximos del tablero completo

    perspective.addEventListener('mousemove', e => {
      const r  = perspective.getBoundingClientRect();
      const cx = r.left + r.width  / 2;
      const cy = r.top  + r.height / 2;
      const dx = (e.clientX - cx) / (r.width  / 2);
      const dy = (e.clientY - cy) / (r.height / 2);

      targetRY =  dx * MAX_BOARD_TILT;
      targetRX = -dy * MAX_BOARD_TILT;
    });

    perspective.addEventListener('mouseleave', () => {
      targetRX = 0;
      targetRY = 0;
    });

    /* Interpolación suave (lerp) */
    const animate = () => {
      currentRX += (targetRX - currentRX) * 0.07;
      currentRY += (targetRY - currentRY) * 0.07;

      board.style.transform =
        `rotateX(${currentRX}deg) rotateY(${currentRY}deg)`;

      rafId = requestAnimationFrame(animate);
    };
    animate();

    /* Limpiar al salir de la página */
    window.addEventListener('beforeunload', () => {
      if (rafId) cancelAnimationFrame(rafId);
    });
  }

  /* ──────────────────────────────────────────────────────
     5. ANIMACIÓN DE ENTRADA CON INTERSECTION OBSERVER
     (por si el bloque está fuera del viewport al cargar)
  ────────────────────────────────────────────────────── */
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));



});