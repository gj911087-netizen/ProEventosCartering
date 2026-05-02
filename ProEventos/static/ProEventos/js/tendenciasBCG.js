
  // Animate bars
  const barObs = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.querySelectorAll('.trend-bar-fill').forEach(bar=>{
          const w = bar.dataset.width;
          setTimeout(()=>{ bar.style.width = w+'%'; },200);
        });
        barObs.unobserve(e.target);
      }
    });
  },{threshold:.2});
  document.querySelectorAll('.col-lg-7').forEach(el=>barObs.observe(el));

  // Fade
  const obs = new IntersectionObserver(entries=>{
    entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('visible'); });
  },{threshold:.1});
  document.querySelectorAll('.fade-in-up').forEach(el=>obs.observe(el));

  window.addEventListener('scroll',()=>{
    document.querySelector('.navbar')?.classList.toggle('scrolled',window.scrollY>50);
  });
// Animate scenario bars + chart bars
const escObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      // barras de escenarios
      e.target.querySelectorAll('.esc-bar-fill').forEach(bar => {
        const w = bar.dataset.w;
        if (w) setTimeout(() => { bar.style.width = w + '%'; }, 300);
      });
      // columnas del gráfico
      e.target.querySelectorAll('.grafico-col').forEach(col => {
        const h = col.dataset.h;
        if (h) setTimeout(() => { col.style.height = h + '%'; }, 400);
      });
      escObs.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.escenario-card, .grafico-wrap').forEach(el => escObs.observe(el));