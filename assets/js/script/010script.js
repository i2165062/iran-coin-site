const $ = (s,r=document)=>r.querySelector(s);
const $$= (s,r=document)=>Array.from(r.querySelectorAll(s));

document.documentElement.classList.add('js');

document.addEventListener("DOMContentLoaded",()=>{
  const container=$("#eraContainer");
  const modal=$("#personModal");
  const dialog=$("#modalDialog");
  const closeBtn=$("#modalClose");
  const imgEl=$("#modalImage");
  const titleEl=$("#modalTitle");
  const metaEl=$("#modalMeta");
  const descEl=$("#modalDesc");
  const tlCanvas=$("#timelineCanvas");
  const inCanvas=$("#influenceCanvas");
  const mpCanvas=$("#mapCanvas");

  /* Grid */
  container.innerHTML="";
  scientistsData.timelineGroups.forEach(group=>{
    const sec=document.createElement("section");
    sec.className="era fade-in";
    sec.innerHTML=`
      <h2 class="era__title">${group.era}</h2>
      <p class="era__desc">${group.description}</p>
      <div class="grid"></div>
    `;
    const grid=$(".grid",sec);

    group.members.forEach(m=>{
      const card=document.createElement("article");
      card.className="card";
      card.innerHTML=`
        <div class="card__media">
          <img class="card__img" src="${m.image}" alt="${m.name}" loading="lazy"
          onerror="this.onerror=null;this.src='images/placeholder.png'">
        </div>
        <div class="card__body">
          <h3 class="card__title">${m.name}</h3>
          <p class="card__meta">${m.century} — ${m.field}</p>
        </div>`;
      card.addEventListener("click",e=>{e.preventDefault();e.stopPropagation();openModal(m);});
      grid.appendChild(card);
    });
    container.appendChild(sec);
  });

  /* Reveal */
  const io=new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('reveal');io.unobserve(e.target);}});
  },{threshold:.12});
  $$(".card").forEach(c=>io.observe(c));

  /* Modal Logic */
  let resizeHandler=null;
  function openModal(m){
    modal.setAttribute("aria-hidden","false");
    document.body.style.overflow="hidden";
    imgEl.onerror=()=>{imgEl.onerror=null;imgEl.src='images/placeholder.png';};
    imgEl.src=m.image||'images/placeholder.png';
    imgEl.alt=m.name;
    titleEl.textContent=m.name;
    metaEl.textContent=`${m.century} — ${m.field}`;
    descEl.textContent=m.summary;
    dialog.addEventListener("click",e=>e.stopPropagation(),{once:true});
    requestAnimationFrame(()=>requestAnimationFrame(()=>renderAll(m)));
    resizeHandler=()=>renderAll(m);
    window.addEventListener("resize",resizeHandler);
  }
  function closeModal(){
    modal.setAttribute("aria-hidden","true");
    document.body.style.overflow="";
    window.removeEventListener("resize",resizeHandler);
  }
  closeBtn.addEventListener("click",closeModal);
  modal.addEventListener("click",e=>{if(e.target===modal)closeModal();});
  document.addEventListener("keydown",e=>{if(e.key==="Escape"&&modal.getAttribute("aria-hidden")==="false")closeModal();});

  /* Canvas Helpers */
  function fitCanvas(canvas,wRatio=16,hRatio=9){
    const p=canvas.parentElement;
    const w=Math.max(300,p.clientWidth);
    const h=Math.round(w*(hRatio/wRatio));
    const dpr=Math.min(2,window.devicePixelRatio||1);
    canvas.width=w*dpr;
    canvas.height=h*dpr;
    canvas.style.width=w+"px";
    canvas.style.height=h+"px";
    const ctx=canvas.getContext("2d");
    ctx.setTransform(dpr,0,0,dpr,0,0);
    return{ctx,w,h};
  }

  function renderAll(m){
    drawTimeline(tlCanvas,m);
    drawInfluence(inCanvas,m.influence||{});
    drawMap(mpCanvas,m.regions||[]);
  }

  /* Timeline */
  function drawTimeline(canvas,m){
    const {ctx,w,h}=fitCanvas(canvas,16,4.5);
    ctx.clearRect(0,0,w,h);
    const birth=m.birth??1000;
    const death=m.death??(birth+60);
    const margin=40,y=h/2;
    const safeDiff=Math.max(40,death-birth);
    const minYear=birth-20;
    const maxYear=birth+safeDiff+20;
    const x=yr=>margin+((yr-minYear)/(maxYear-minYear))*(w-margin*2);

    ctx.strokeStyle="rgba(255,255,255,.25)";
    ctx.lineWidth=2;
    ctx.beginPath();
    ctx.moveTo(margin,y);
    ctx.lineTo(w-margin,y);
    ctx.stroke();

    const x1=x(birth),x2=x(death);
    const g=ctx.createLinearGradient(x1,y,x2,y);
    g.addColorStop(0,"#33e1ff");
    g.addColorStop(1,"#00ffd5");
    ctx.strokeStyle=g;
    ctx.lineWidth=6;
    ctx.lineCap="round";
    ctx.shadowColor="#33e1ff";
    ctx.shadowBlur=10;
    ctx.beginPath();
    ctx.moveTo(x1,y);
    ctx.lineTo(x2,y);
    ctx.stroke();
    ctx.shadowBlur=0;
    ctx.fillStyle="#33e1ff";
    dot(ctx,x1,y,6);
    dot(ctx,x2,y,6);
    ctx.fillStyle="rgba(255,255,255,.9)";
    ctx.font="12px Inter";
    ctx.textAlign="center";
    ctx.fillText(String(birth),x1,y-12);
    ctx.fillText(String(death||"present"),x2,y-12);
  }

  /* Influence Chart */
  function drawInfluence(c,inf){
    const {ctx,w,h}=fitCanvas(c,16,9);
    ctx.clearRect(0,0,w,h);
    const keys=Object.keys(inf);
    if(!keys.length)return;
    const margin=18;
    const labelW=90;
    const barH=Math.min(26,(h-margin*2)/(keys.length+0.5));
    const gap=barH*0.7;
    ctx.font="12px Inter";
    ctx.textBaseline="middle";

    keys.forEach((k,i)=>{
      const v=Math.max(0,Math.min(100,inf[k]));
      const y=margin+i*(barH+gap);
      const x0=margin+labelW;
      const maxW=w-x0-margin-5;
      ctx.fillStyle="rgba(255,255,255,.07)";
      rrect(ctx,x0,y,maxW,barH,6);ctx.fill();
      const g=ctx.createLinearGradient(x0,y,x0+maxW,y);
      g.addColorStop(0,"#33e1ff");
      g.addColorStop(1,"#00ffd5");
      ctx.fillStyle=g;
      ctx.shadowColor="#33e1ff";
      ctx.shadowBlur=8;
      rrect(ctx,x0,y,maxW*(v/100),barH,6);
      ctx.fill();
      ctx.shadowBlur=0;
      ctx.fillStyle="#fff";
      ctx.textAlign="right";
      ctx.fillText(k,x0-10,y+barH/2);
      ctx.textAlign="left";
      ctx.fillText(v+"%",x0+maxW*(v/100)+6,y+barH/2);
    });
  }

  /* Global Reach */
  function drawMap(c,regions){
    const {ctx,w,h}=fitCanvas(c,16,7);
    ctx.clearRect(0,0,w,h);
    ctx.strokeStyle="rgba(255,255,255,.08)";
    ctx.lineWidth=1;
    for(let i=1;i<=8;i++){const x=i*w/9;ctx.beginPath();ctx.moveTo(x,10);ctx.lineTo(x,h-10);ctx.stroke();}
    for(let j=1;j<=3;j++){const y=j*h/4;ctx.beginPath();ctx.moveTo(10,y);ctx.lineTo(w-10,y);ctx.stroke();}
    const pts={
      Iran:[w*0.42,h*0.55],Arabia:[w*0.44,h*0.7],
      India:[w*0.56,h*0.62],China:[w*0.7,h*0.5],
      "Central Asia":[w*0.5,h*0.45],Europe:[w*0.55,h*0.3],
      Spain:[w*0.45,h*0.28],USA:[w*0.2,h*0.35],Global:[w*0.8,h*0.3]
    };
    const o=pts.Iran;
    glowDot(ctx,o[0],o[1],7,"#33e1ff");
    (regions||[]).forEach(r=>{
      if(!pts[r])return;
      const[tx,ty]=pts[r];
      arc(ctx,o[0],o[1],tx,ty,"#33e1ff");
      glowDot(ctx,tx,ty,5,"#33e1ff");
    });
    ctx.fillStyle="#fff";
    ctx.font="12px Inter";
    ctx.textAlign="center";
    ctx.fillText("Iran",o[0],o[1]-12);
  }

  /* Helpers */
  function dot(ctx,x,y,r){ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();}
  function glowDot(ctx,x,y,r,c){ctx.save();ctx.fillStyle=c;ctx.shadowColor=c;ctx.shadowBlur=10;dot(ctx,x,y,r);ctx.restore();}
  function rrect(ctx,x,y,w,h,r){
    const rr=Math.min(r,w/2,h/2);
    ctx.beginPath();ctx.moveTo(x+rr,y);
    ctx.arcTo(x+w,y,x+w,y+h,rr);
    ctx.arcTo(x+w,y+h,x,y+h,rr);
    ctx.arcTo(x,y+h,x,y,rr);
    ctx.arcTo(x,y,x+w,y,rr);
    ctx.closePath();
  }
  function arc(ctx,x1,y1,x2,y2,color){
    const mx=(x1+x2)/2,my=(y1+y2)/2-40;
    ctx.save();ctx.strokeStyle=color;ctx.lineWidth=2;ctx.shadowColor=color;ctx.shadowBlur=10;
    ctx.beginPath();ctx.moveTo(x1,y1);ctx.quadraticCurveTo(mx,my,x2,y2);ctx.stroke();ctx.restore();
  }
});
