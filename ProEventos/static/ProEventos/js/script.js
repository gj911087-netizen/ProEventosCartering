
  // ── AOS Init ──
  AOS.init({ duration: 700, once: true, offset: 80 });

  // ── Navbar scroll ──
  window.addEventListener('scroll', () => {
    document.getElementById('mainNav').classList.toggle('scrolled', window.scrollY > 60);
  });

  // ── Formulario ──
  document.getElementById('contactForm').addEventListener('submit', function() {

    const toast = document.getElementById('toastConfirm');
    toast.classList.add('show');

});

  // ── Ocultar imágenes rotas en TODA la web ──
  // Cuando una imagen no carga, oculta el bloque contenedor (col, card, etc.)
  document.addEventListener('DOMContentLoaded', function() {
    function ocultarImagenRota(img) {
      // Busca el contenedor col más cercano, si no existe oculta el padre directo
      var col = img.closest('[class*="col-"]');
      if (col) {
        col.style.display = 'none';
      } else {
        img.style.display = 'none';
      }
    }

    // Aplicar a todas las imágenes ya cargadas que fallaron
    document.querySelectorAll('img').forEach(function(img) {
      if (img.complete && !img.naturalWidth) {
        ocultarImagenRota(img);
      }
      img.addEventListener('error', function() {
        ocultarImagenRota(this);
      });
    });
  });

  const sections = document.querySelectorAll('section[id], div[id="inicio"]');
  const navLinks = document.querySelectorAll('.nav-link');
  window.addEventListener('scroll', () => {
    let current = '';
    document.querySelectorAll('section').forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    navLinks.forEach(link => {
      link.style.color = link.getAttribute('href') === '#'+current
        ? 'var(--dorado)' : '';
    });
  });

  // js del dropdown

   document.querySelectorAll('.navbar .dropdown').forEach(function(dropdown) {
    dropdown.addEventListener('mouseenter', function() {
      this.querySelector('.dropdown-menu').classList.add('show');
    });
    dropdown.addEventListener('mouseleave', function() {
      this.querySelector('.dropdown-menu').classList.remove('show');
    });
  });


