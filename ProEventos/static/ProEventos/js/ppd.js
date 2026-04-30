
  // Animate on scroll
  const observer = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting) e.target.classList.add('visible');
    });
  },{threshold:.15});
  document.querySelectorAll('.fade-in-up').forEach(el=>observer.observe(el));

  // Navbar scroll
  window.addEventListener('scroll',()=>{
    document.querySelector('.navbar')?.classList.toggle('scrolled',window.scrollY>50);
  });