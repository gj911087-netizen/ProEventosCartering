/* ══════════════════════════════════════
   referencias.js
   Proeventos Catering
══════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. FADE IN ON SCROLL ── */
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.fade-in-up').forEach((el, i) => {
    el.style.transitionDelay = (i * 0.05) + 's';
    obs.observe(el);
  });

  /* ── 2. FILTROS ── */
  const filterBtns = document.querySelectorAll('.ref-filter-btn');
  const refCards   = document.querySelectorAll('.ref-card');
  const refCount   = document.getElementById('refCount');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Activar botón
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      let visible  = 0;

      refCards.forEach(card => {
        const match = filter === 'all' || card.dataset.type === filter;
        if (match) {
          card.classList.remove('hidden');
          visible++;
        } else {
          card.classList.add('hidden');
        }
      });

      // Actualizar contador con animación
      refCount.style.opacity = '0';
      setTimeout(() => {
        refCount.textContent  = visible;
        refCount.style.opacity = '1';
      }, 200);
    });
  });

  /* ── 3. NAVBAR SCROLL ── */
  window.addEventListener('scroll', () => {
    document.querySelector('.navbar')?.classList.toggle('scrolled', window.scrollY > 50);
  });

});