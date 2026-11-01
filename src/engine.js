import {M} from './shared.js';
import {CH} from './data.js';

export function startEngine(){
/* ---- one frame loop: scroll scenes, letters, cursor, canvas ---- */
const cv=document.getElementById('bg'),cx=cv.getContext('2d'),$=id=>document.getElementById(id)||{style:{},classList:{toggle(){}}};
let W,H,LY=[],TH='',G=0,SC=[],LT=[],act=-1,lastP=-1,cdx=0,cdy=0,D=[];
const rnd=s=>()=>(s=s*16807%2147483647)/2147483647;
function build(){W=cv.width=innerWidth;H=cv.height=innerHeight;TH=document.documentElement.dataset.theme||'dark';const L=TH==='light',rgb=L?'0,100,160':'34,229,255';
 LY=[0,1,2].map(i=>{const c=document.createElement('canvas'),w=c.width=W*1.5,h=c.height=H*.62,x=c.getContext('2d'),R=rnd(11+i*17),cols=13+i*4,rows=4,base=h*(.2+i*.22),amp=h*(.17-i*.035),V=[];
  for(let r=0;r<=rows;r++){V[r]=[];for(let k=0;k<=cols;k++){V[r][k]=[k/cols*w+(R()-.5)*w/cols*.5,r===0?base+(R()-.5)*2*amp*(.35+.65*Math.abs(Math.sin(k*1.7+i))):base+(h-base)*r/rows+(R()-.5)*amp*.45]}}
  x.beginPath();x.moveTo(0,h);for(let k=0;k<=cols;k++)x.lineTo(V[0][k][0],V[0][k][1]);x.lineTo(w,h);x.closePath();
  x.fillStyle=L?`rgb(${214-i*14},${224-i*14},${250-i*10})`:`rgb(${6+i*3},${8+i*3},${22+i*5})`;x.fill();
  const tri=(a,b,d)=>{x.beginPath();x.moveTo(...a);x.lineTo(...b);x.lineTo(...d);x.closePath();x.fillStyle=`rgba(${rgb},${((L?.04:.02)+R()*(L?.2:.15)*(1-i*.22)).toFixed(3)})`;x.fill()};
  for(let r=0;r<rows;r++)for(let k=0;k<cols;k++){tri(V[r][k],V[r][k+1],V[r+1][k]);tri(V[r][k+1],V[r+1][k+1],V[r+1][k])}
  x.beginPath();for(let k=0;k<=cols;k++)k?x.lineTo(...V[0][k]):x.moveTo(...V[0][k]);x.strokeStyle=`rgba(${rgb},.3)`;x.stroke();return c});
 D=Array.from({length:Math.min(90,W/14|0)},()=>({x:Math.random()*W,y:Math.random()*H,v:Math.random()*.35+.1,r:Math.random()*1.6+.4}))}
build();addEventListener('resize',build);
function frame(t){
 if(!SC.length){SC=[...document.querySelectorAll('.sc')];LT=[...document.querySelectorAll('.lt')];if(!SC.length){requestAnimationFrame(frame);return}}
 const vh=innerHeight,mx=M.x<0?0:M.x/W-.5,my=M.y<0?0:M.y/H-.5;let ap=0;
 G=scrollY/Math.max(1,document.documentElement.scrollHeight-vh);
 SC.forEach((s,i)=>{const r=s.getBoundingClientRect(),e=Math.min(1,Math.max(0,(vh-r.top)/vh)),rg=r.height-vh,p=rg>0?Math.min(1,Math.max(0,-r.top/rg)):0;
  s.style.setProperty('--e',e.toFixed(3));s.style.setProperty('--p',p.toFixed(3));
  if(r.top<=vh*.5&&r.bottom>vh*.5){if(i!==act){act=i;const c=CH[i],n=String(i+1).padStart(2,'0');$('hdN').textContent=n;$('hdT').textContent=c[1].toUpperCase();$('hudN').textContent=n+' / 0'+CH.length;$('hudT').textContent=c[1].toUpperCase();$('hudS').textContent=c[2].toUpperCase();document.querySelectorAll('.nv a.i').forEach((a,k)=>a.classList.toggle('on',k===i))}ap=p}
  const tk=s.querySelector('.trk');if(tk)tk.style.transform=`translateX(${-p*Math.max(0,tk.scrollWidth-innerWidth)}px)`});
 const pc=Math.round(ap*100);if(pc!==lastP){lastP=pc;$('hudP').textContent=pc+'%'}
 for(const s of LT){const b=s.getBoundingClientRect();if(b.bottom<0||b.top>vh)continue;const dx=M.x-(b.left+b.width/2),dy=M.y-(b.top+b.height/2),q=M.x<0?0:Math.max(0,1-Math.hypot(dx,dy)/230);s.style.transform=q?`translate(${-dx*q*.1}px,${-dy*q*.1}px) scale(${1+q*.18})`:'';s.style.webkitTextFillColor=q>.04?`rgba(var(--aur),${q.toFixed(2)})`:''}
 cdx+=(M.x-cdx)*.16;cdy+=(M.y-cdy)*.16;const cd=$('cd'),cr=$('cr');if(cd){cd.style.transform=`translate(${M.x}px,${M.y}px)`;cr.style.transform=`translate(${cdx}px,${cdy}px)`}
 document.documentElement.style.setProperty('--mx',M.x+'px');document.documentElement.style.setProperty('--my',M.y+'px');
 if((document.documentElement.dataset.theme||'dark')!==TH)build();
 const L=TH==='light',rgb=L?'0,110,170':'34,229,255';cx.clearRect(0,0,W,H);
 const sx=W/2-mx*40,sy=H*(.6-G*.14)-my*20,R0=H*.3;
 let g=cx.createRadialGradient(sx,sy,0,sx,sy,R0);g.addColorStop(0,`rgba(${rgb},${L?.5:.6})`);g.addColorStop(.35,`rgba(${L?'122,47,224':'165,91,255'},${L?.2:.3})`);g.addColorStop(1,`rgba(${rgb},0)`);cx.fillStyle=g;cx.fillRect(0,0,W,H);
 cx.lineWidth=1;cx.strokeStyle=`rgba(${rgb},.4)`;cx.beginPath();cx.arc(sx,sy,H*.3,0,7);cx.stroke();
 cx.setLineDash([2,10]);cx.lineDashOffset=-t/60;cx.strokeStyle=`rgba(${L?'122,47,224':'165,91,255'},.5)`;cx.beginPath();cx.arc(sx,sy,H*.38,0,7);cx.stroke();cx.setLineDash([]);
 LY.forEach((c,i)=>{const d=[.35,.7,1.2][i];cx.drawImage(c,-(c.width-W)/2-mx*d*70+(G-.5)*d*60,H-c.height+my*d*14-G*d*30)});
 for(const p of D){p.y-=p.v;if(p.y<-5){p.y=H+5;p.x=Math.random()*W}const dx=p.x-M.x,dy=p.y-M.y,d=Math.hypot(dx,dy);if(d<130&&d>0){p.x+=dx/d*(130-d)*.05;p.y+=dy/d*(130-d)*.05}cx.fillStyle=`rgba(${rgb},${d<160?.9:.45})`;cx.beginPath();cx.arc(p.x,p.y,p.r,0,7);cx.fill()}
 requestAnimationFrame(frame)}
requestAnimationFrame(frame);

}
