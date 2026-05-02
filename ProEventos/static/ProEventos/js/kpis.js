// ── Cargar desde archivo local ──
function loadFile(event, imgId, phId){
  const file = event.target.files[0];
  if(!file) return;
  const reader = new FileReader();
  reader.onload = e => applyImage(imgId, phId, e.target.result);
  reader.readAsDataURL(file);
}

// ── Cargar desde URL ──
function loadUrl(imgId, inputId, phId, popupId){
  const url = document.getElementById(inputId).value.trim();
  if(!url) return;
  applyImage(imgId, phId, url);
  document.getElementById(popupId).classList.remove('open');
}

// ── Aplicar imagen ──
function applyImage(imgId, phId, src){
  const img = document.getElementById(imgId);
  const ph  = document.getElementById(phId);
  img.src = src;
  img.style.display = 'block';
  ph.style.display  = 'none';
}

// ── Toggle popup URL ──
function toggleUrlPopup(popupId, e){
  e.stopPropagation();
  document.querySelectorAll('.url-popup').forEach(p=>{
    if(p.id !== popupId) p.classList.remove('open');
  });
  document.getElementById(popupId).classList.toggle('open');
}
document.addEventListener('click', ()=>{
  document.querySelectorAll('.url-popup').forEach(p=>p.classList.remove('open'));
});

// ── Animate on scroll ──
const obs = new IntersectionObserver(entries=>{
  entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('visible'); });
},{threshold:.1});
document.querySelectorAll('.fade-in-up').forEach(el=>obs.observe(el));

// ── Navbar scroll ──
window.addEventListener('scroll',()=>{
  document.querySelector('.navbar')?.classList.toggle('scrolled',window.scrollY>50);
});