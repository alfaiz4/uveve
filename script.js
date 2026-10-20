/* ====== PENGATURAN: ubah di sini ====== */
const CONFIG = {
  nama1: "Michael",
  nama2: "chelsea",
  tanggalJadian: [2026, 5, 10],   // [tahun, bulan, tanggal]
  // Isi path foto untuk mengganti ilustrasi, contoh: "images/foto1.jpg"
  // Biarkan null untuk tetap memakai ilustrasi bawaan.
  foto: ["foto1.jpg", "foto2.jpg", "foto3.jpg"]
};
/* ======================================= */

(function(){
  var reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
  // isi nama dari CONFIG
  document.getElementById('names').innerHTML=CONFIG.nama1+' <span class="amp">&amp;</span> '+CONFIG.nama2;
  // ganti ilustrasi dengan foto jika diisi
  document.querySelectorAll('.card').forEach(function(c,i){
    if(!CONFIG.foto[i])return;
    var img=new Image();img.src=CONFIG.foto[i];img.alt='Foto kenangan '+(i+1);
    c.replaceChild(img,c.querySelector('svg'));
  });
  // split headings into words
  document.querySelectorAll('[data-split]').forEach(function(h){
    var i=0;
    (function walk(n){
      Array.from(n.childNodes).forEach(function(c){
        if(c.nodeType===3){
          var f=document.createDocumentFragment();
          c.textContent.split(/(\s+)/).forEach(function(t){
            if(!t)return;
            if(/^\s+$/.test(t)){f.appendChild(document.createTextNode(' '));return}
            var s=document.createElement('span');s.className='w';s.style.setProperty('--i',i++);s.textContent=t;f.appendChild(s);
          });
          n.replaceChild(f,c);
        }else if(c.nodeType===1){walk(c)}
      });
    })(h);
  });
  // reveal: in when scrolled into view, out when scrolled back up past it
  var els=document.querySelectorAll('.rv,.sp');
  if(reduce){els.forEach(function(e){e.classList.add('in')})}
  else{
    var io=new IntersectionObserver(function(es){
      es.forEach(function(e){
        var on=e.isIntersecting||e.boundingClientRect.top<0;
        e.target.classList.toggle('in',on);
      });
    },{rootMargin:'0px 0px -14% 0px',threshold:0.05});
    els.forEach(function(e){io.observe(e)});
  }
  // petals
  var box=document.getElementById('petals');
  if(!reduce){
    for(var i=0;i<22;i++){
      var p=document.createElement('i');p.className='petal';
      var s=.6+Math.random()*1.1;
      p.style.cssText='left:'+Math.random()*100+'%;--z:'+(Math.random()*240-120)+'px;width:'+14*s+'px;height:'+18*s+'px;animation-duration:'+(9+Math.random()*10)+'s;animation-delay:-'+Math.random()*18+'s;opacity:'+(.4+Math.random()*.5);
      box.appendChild(p);
    }
  }
  // days together
  document.getElementById('days').textContent=Math.floor((new Date()-new Date(CONFIG.tanggalJadian[0],CONFIG.tanggalJadian[1]-1,CONFIG.tanggalJadian[2]))/864e5).toLocaleString('id-ID');
  // depth: tilt + scroll parallax
  var root=document.documentElement;
  function tilt(x,y){root.style.setProperty('--ry',(x*8).toFixed(2)+'deg');root.style.setProperty('--rx',(-y*6).toFixed(2)+'deg')}
  if(!reduce){
    addEventListener('pointermove',function(e){tilt(e.clientX/innerWidth-.5,e.clientY/innerHeight-.5)});
    addEventListener('deviceorientation',function(e){
      if(e.gamma==null)return;
      tilt(Math.max(-.5,Math.min(.5,e.gamma/60)),Math.max(-.5,Math.min(.5,(e.beta-45)/60)));
    });
    addEventListener('scroll',function(){root.style.setProperty('--sy',scrollY)},{passive:true});
  }
})();
