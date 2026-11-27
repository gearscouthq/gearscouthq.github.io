/* GearScout v2 interactions */
(function(){
  var d=document,root=d.documentElement;root.classList.add('js');
  var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  // mobile menu
  var btn=d.querySelector('.menu-btn');
  if(btn){btn.addEventListener('click',function(){var ul=btn.nextElementSibling;var o=ul.classList.toggle('open');btn.setAttribute('aria-expanded',o)})}
  // nav border on scroll
  var nav=d.getElementById('gnav');
  // reveal on scroll
  var els=[].slice.call(d.querySelectorAll('.reveal'));
  if('IntersectionObserver' in window&&!reduce){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{rootMargin:'0px 0px -8% 0px',threshold:.08});
    els.forEach(function(el){io.observe(el)});
  }else{els.forEach(function(el){el.classList.add('in')})}
  // scroll-driven scale for hero media
  var sc=[].slice.call(d.querySelectorAll('[data-scale]'));
  function onScroll(){
    if(nav)nav.classList.toggle('scrolled',scrollY>8);
    if(reduce)return;
    var vh=innerHeight;
    sc.forEach(function(el){var r=el.getBoundingClientRect();var p=1-Math.min(Math.max((r.top)/(vh*0.9),0),1);el.style.setProperty('--s',(0.92+0.08*p).toFixed(4))});
  }
  var tick=false;addEventListener('scroll',function(){if(!tick){tick=true;requestAnimationFrame(function(){onScroll();tick=false})}},{passive:true});onScroll();
  // gallery arrows
  var gal=d.getElementById('gallery');
  [].forEach.call(d.querySelectorAll('.gal-btn'),function(b){b.addEventListener('click',function(){gal.scrollBy({left:(+b.dataset.dir)*(gal.clientWidth*0.8),behavior:reduce?'auto':'smooth'})})});
  // jump nav active state
  var jl=[].slice.call(d.querySelectorAll('.jump a'));
  if(jl.length&&'IntersectionObserver' in window){
    var jo=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){jl.forEach(function(a){a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id)})}})},{rootMargin:'-40% 0px -55% 0px'});
    jl.forEach(function(a){var t=d.querySelector(a.getAttribute('href'));if(t)jo.observe(t)});
  }
})();
