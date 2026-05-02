// ═══════════════════════════════════════════════
//  Proeventos — inversion.js
//  Inversión total: $10M
//  AF 55% ($5.5M) · CT 30% ($3M) · GP 15% ($1.5M)
// ═══════════════════════════════════════════════

const TOTAL = 10; // millones COP

// ── Donut Chart ──────────────────────────────────
const ctx = document.getElementById('donutChart').getContext('2d');
new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ['Activos Fijos', 'Capital de Trabajo', 'Gastos Preoperativos'],
    datasets: [{
      data: [5.5, 3, 1.5],
      backgroundColor: ['#3949ab', '#c9a84c', '#26c6da'],
      borderColor: '#07071e',
      borderWidth: 3,
      hoverOffset: 8
    }]
  },
  options: {
    cutout: '72%',
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(10,10,30,.95)',
        borderColor: 'rgba(201,168,76,.4)',
        borderWidth: 1,
        titleColor: '#c9a84c',
        bodyColor: 'rgba(255,255,255,.75)',
        callbacks: {
          label: ctx => ` $${ctx.parsed}M COP (${Math.round(ctx.parsed / TOTAL * 100)}%)`
        }
      }
    },
    animation: { animateRotate: true, duration: 1400 }
  }
});

// ── Fade-in on scroll ─────────────────────────────
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-in-up').forEach(el => obs.observe(el));

// ── Navbar scroll state ───────────────────────────
window.addEventListener('scroll', () => {
  document.querySelector('.navbar')?.classList.toggle('scrolled', window.scrollY > 50);
});