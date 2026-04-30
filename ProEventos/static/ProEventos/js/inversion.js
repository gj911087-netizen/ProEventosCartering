
  // Donut chart
  const ctx = document.getElementById('donutChart').getContext('2d');
  new Chart(ctx,{
    type:'doughnut',
    data:{
      labels:['Capital de Trabajo','Activos Fijos','Gastos Preoperativos'],
      datasets:[{
        data:[13.2,8.1,7.4],
        backgroundColor:['#c9a84c','#3949ab','#26c6da'],
        borderColor:'#07071e',
        borderWidth:3,
        hoverOffset:8
      }]
    },
    options:{
      cutout:'72%',
      plugins:{legend:{display:false},tooltip:{
        backgroundColor:'rgba(10,10,30,.95)',
        borderColor:'rgba(201,168,76,.4)',
        borderWidth:1,
        titleColor:'#c9a84c',
        bodyColor:'rgba(255,255,255,.75)',
        callbacks:{
          label:ctx=>` $${ctx.parsed}M COP (${Math.round(ctx.parsed/28.7*100)}%)`
        }
      }},
      animation:{animateRotate:true,duration:1400}
    }
  });

  // Fade
  const obs = new IntersectionObserver(entries=>{
    entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('visible'); });
  },{threshold:.1});
  document.querySelectorAll('.fade-in-up').forEach(el=>obs.observe(el));

  window.addEventListener('scroll',()=>{
    document.querySelector('.navbar')?.classList.toggle('scrolled',window.scrollY>50);
  });
