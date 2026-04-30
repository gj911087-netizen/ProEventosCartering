
  const obs = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add('visible');
        e.target.querySelectorAll('.prog-fill').forEach(bar=>{
          setTimeout(()=>{ bar.style.width = bar.dataset.width+'%'; },400);
        });
      }
    });
  },{threshold:.1});
  document.querySelectorAll('.fade-in-up').forEach(el=>obs.observe(el));

  window.addEventListener('scroll',()=>{
    document.querySelector('.navbar')?.classList.toggle('scrolled',window.scrollY>50);
  });
