import React,{useState,useEffect,useRef} from 'react';
import htm from 'htm';
import {M,fine} from './shared.js';
import {RES,GH,LI,MAIL,CH,SK,RINGS,CERT,PR} from './data.js';
import photo from './assets/aman.jpg';
const html=htm.bind(React.createElement);
const Lt=({text})=>text.split('').map((c,i)=>html`<span class="lt" key=${i}>${c}</span>`);
function Tilt({cls,children,as='div',...p}){
 const mv=e=>{if(!fine)return;const el=e.currentTarget,r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;
  el.style.transform=`perspective(800px) rotateY(${(x-.5)*10}deg) rotateX(${(.5-y)*10}deg) translateY(-4px)`;el.style.setProperty('--gx',x*100+'%');el.style.setProperty('--gy',y*100+'%')};
 return React.createElement(as,{className:'card '+(cls||''),onPointerMove:mv,onPointerLeave:e=>{e.currentTarget.style.transform=''},...p},children);
}
function Mag({cls,children,...p}){
 const mv=e=>{if(!fine)return;const el=e.currentTarget,r=el.getBoundingClientRect();el.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.3}px,${(e.clientY-r.top-r.height/2)*.4}px)`};
 return html`<a class=${'bt '+(cls||'')} onPointerMove=${mv} onPointerLeave=${e=>e.currentTarget.style.transform=''} ...${p}>${children}</a>`;
}
const Sc=({id,len,cls,children})=>html`<section class=${'sc '+(cls||'')} id=${id} style=${{height:len+'vh'}}><div class="stick">${children}</div></section>`;
const HS=({id,len,i,title,items,render})=>html`<${Sc} id=${id} len=${len}><div class="hh"><small>0${i+1}</small><h2>${title}</h2></div><div class="trkw"><div class="trk">${items.map(render)}</div></div><div class="bar"><i></i></div><//>`;

function Orbit(){
 const [a,setA]=useState('AI / ML'),sky=useRef();
 const mv=e=>{if(!fine)return;const r=sky.current.getBoundingClientRect();sky.current.style.transform=`perspective(900px) rotateY(${((e.clientX-r.left)/r.width-.5)*16}deg) rotateX(${(.5-(e.clientY-r.top)/r.height)*16}deg)`};
 return html`<div class="orb r"><div class="sky" ref=${sky} onPointerMove=${mv} onPointerLeave=${()=>sky.current.style.transform=''}>
 <div class="core">AMAN</div>
 ${RINGS.map(([r,d,L],i)=>html`<div class="ring" key=${i} style=${{'--r':r,'--d':d+'s',animationDirection:i%2?'reverse':'normal'}}>${L.map((k,j)=>html`<a key=${k} class=${k===a?'on':''} style=${{'--a':(360/L.length*j)+'deg'}} onPointerEnter=${()=>setA(k)} onClick=${()=>setA(k)}><span style=${{'--d':d+'s',animationDirection:i%2?'reverse':'normal'}}>${k}</span></a>`)}</div>`)}
 </div>
 <${Tilt} style=${{width:'auto'}}><h3>${a}</h3><div class="chips">${SK[a].split(',').map(s=>html`<span class="chip" key=${s}>${s}</span>`)}</div><p>Hover or tap an orbit to explore each stack.</p><div class="row" style=${{marginTop:12}}><${Mag} href="#all-skills">View all skills →<//></div><//></div>`;
}
function SkillsPage(){
 return html`<div class="pgx"><div class="pgi"><a class="bk" href="#skills">← BACK TO PORTFOLIO</a><h1 class="big">All <i>skills.</i></h1><p class="sub">Everything I work with, by category.</p><div class="sg">${Object.entries(SK).map(([k,v],i)=>html`<${Tilt} key=${k} style=${{width:'auto'}}><div class="n">0${i+1}</div><h3>${k}</h3><div class="chips">${v.split(',').map(s=>html`<span class="chip" key=${s}>${s}</span>`)}</div><//>`)}</div></div></div>`;
}
function App(){
 const [ld,setLd]=useState(0),[th,setTh]=useState('dark'),[pg,setPg]=useState(location.hash==='#all-skills');
 useEffect(()=>{const h=()=>setPg(location.hash==='#all-skills');addEventListener('hashchange',h);return()=>removeEventListener('hashchange',h)},[]);
 useEffect(()=>{document.body.style.overflow=pg?'hidden':''},[pg]);
 useEffect(()=>{let v=0;const t=setInterval(()=>{v+=Math.random()*13+7;setLd(Math.min(100,v|0));if(v>=100)clearInterval(t)},110);
  const mv=e=>{M.x=e.clientX;M.y=e.clientY;document.body.classList.add('cur')};addEventListener('pointermove',mv);
  const lv=()=>document.body.classList.remove('cur');document.documentElement.addEventListener('pointerleave',lv);
  const ov=e=>{const g=document.getElementById('cr');g&&g.classList.toggle('h',!!e.target.closest('a,button,.card'))};addEventListener('pointerover',ov);
  if(fine)document.body.classList.add('fine');
  return()=>{clearInterval(t);removeEventListener('pointermove',mv);removeEventListener('pointerover',ov)}},[]);
 useEffect(()=>{const mq=matchMedia('(prefers-color-scheme: dark)'),ap=()=>{document.documentElement.dataset.theme=th==='system'?(mq.matches?'dark':'light'):th};ap();mq.addEventListener('change',ap);return()=>mq.removeEventListener('change',ap)},[th]);
 const I=i=>({style:{'--i':i}});
 return html`<${React.Fragment}>
 <div class=${'ld '+(ld>=100?'off':'')}><div><small>Threading the reel</small><b>${String(ld).padStart(3,'0')}%</b></div></div>
 ${pg&&html`<${SkillsPage}/>`}<div class="cr" id="cr"></div><div class="cd" id="cd"></div>
 <div class="hd"><div><b id="hdN">01</b><i class="ln"></i><span id="hdT">INTRO</span></div><small>AMAN</small></div>
 <div class="nv">${CH.map((c,i)=>html`<a class="i" key=${c[0]} href=${'#'+c[0]} data-i=${i}><b>0${i+1}</b>${c[1]}</a>`)}
 <div class="th">${[['light','☀'],['dark','☾'],['system','▭']].map(([k,s])=>html`<button key=${k} class=${th===k?'on':''} aria-label=${k+' theme'} onClick=${()=>setTh(k)}>${s}</button>`)}</div>
 <div class="nl"><a href="#horizon">CONTACT</a><a href=${RES} target="_blank" rel="noopener">RESUME</a></div></div>
 <div class="hud"><b id="hudN">01 / 09</b><strong id="hudT">INTRO</strong><span id="hudS">ARRIVAL</span><em id="hudP">0%</em></div>

 <${Sc} id="intro" len=${170}><div class="intro"><small>India — Portfolio</small><h1><${Lt} text="AMAN"/></h1><p>Creating the Future with AI</p><small style=${{marginTop:14}}>AI/ML · Full-Stack · Bioinformatics</small><div class="sh">SCROLL TO BEGIN</div></div><//>

 <${Sc} id="identity" len=${320}><div class="idw">${['BUILD','SOLVE','LEARN','CREATE','IMPACT'].map((w,i)=>html`<div class="wd" key=${w} ...${I(i)}><${Lt} text=${w}/></div>`)}</div>
 <div class="idl"><h2 class="big">Creating the Future.<br/><i>with AI.</i></h2><p>I build intelligent, scalable, data-driven applications where research meets engineering.</p></div><//>

 <${Sc} id="about" len=${150}><div class="split"><div class="pc r"><img alt="Portrait of Aman" src=${photo}/><h3>Aman</h3><span>AI/ML Engineer</span><${Mag} href=${MAIL}>Email me<//><div class="so"><a href=${GH} target="_blank" rel="noopener" aria-label="GitHub">GH</a><a href=${LI} target="_blank" rel="noopener" aria-label="LinkedIn">in</a></div></div>
 <div class="dv"></div>
 <div class="ab r" ...${I(3)}><h2>About Me</h2><p>MCA graduate with hands-on experience in Artificial Intelligence, Machine Learning, Deep Learning, Computer Vision, Bioinformatics, NLP and Full-Stack Development. Interested in building intelligent, scalable, data-driven applications and real-world AI solutions.</p>
 <div class="st"><div><b>MCA</b><span>UNIV. OF MYSORE</span></div><div><b>5</b><span>PROJECTS</span></div><div><b>8</b><span>CERTIFICATES</span></div></div>
 <div class="chips">${['Reading','Cycling','Trekking','Photography'].map(h=>html`<span class="chip" key=${h}>${h}</span>`)}</div>
 <div class="row"><${Mag} href=${RES} target="_blank" rel="noopener">Resume<//><${Mag} cls="o" href=${GH} target="_blank" rel="noopener">GitHub<//></div></div></div><//>

 <${Sc} id="experience" len=${140}><div class="xp"><h2 class="big r" style=${{marginBottom:20}}>The path <i>so far.</i></h2>
 ${[['01','September–October 2024','Data Analytics Intern','Unified Mentor'],['02','May–June 2024','IoT Intern','Innovant IT Solutions']].map((x,i)=>html`<div class="xr r" key=${x[0]} ...${I(i+2)}><b>${x[0]}</b><div><em>${x[1]}</em><h3>${x[2]}</h3><p>${x[3]}</p></div></div>`)}</div><//>

 <${HS} id="projects" len=${460} i=${4} title="Project Universe" items=${PR} render=${(p,i)=>html`<${Tilt} cls=${p.w?'w':''} key=${p.t}><div class="n">0${i+1}</div><h3>${p.t}</h3>${p.s&&html`<p>${p.s}</p>`}<ul>${p.b.map(b=>html`<li key=${b}>${b}</li>`)}</ul><div class="chips">${p.c.map(c=>html`<span class="chip" key=${c}>${c}</span>`)}</div>${p.l&&html`<a class="l" href=${p.l} target="_blank" rel="noopener">SOURCE ↗</a>`}<//>`}/>

 <${Sc} id="skills" len=${150}><${Orbit}/><//>

 <${Sc} id="education" len=${140}>${[['MCA','Master of Computer Applications','University of Mysore, Manasagangotri Campus','2024–2026'],['BCA','Bachelor of Computer Applications','Sahyadri Science College','2021–2024']].map((x,i)=>html`<div class="ed r" key=${x[0]} ...${I(i*3)}><div class="o"><${Lt} text=${x[0]}/></div><div><h3>${x[1]}</h3><p>${x[2]}</p><em>${x[3]}</em></div></div>`)}<//>

 <${HS} id="certs" len=${420} i=${7} title="Certification Vault" items=${CERT} render=${(c,i)=>html`<${Tilt} as="a" key=${c[0]} href=${c[2]} target="_blank" rel="noopener"><div class="n">0${i+1}</div><h3>${c[0]}</h3><small>${c[1]}</small><span class="l">VIEW CERTIFICATE ↗</span><//>`}/>

 <${Sc} id="horizon" len=${130} cls="last"><div class="hz r"><h2 class="big">Let’s build something<br/><i>meaningful.</i></h2><p style=${{marginTop:20}}><a class="m" href=${MAIL}>Amantarikere1@gmail.com</a></p><p><a class="m" href="tel:+919353478502">+91 9353478502</a></p><p>Tarikere, Karnataka, India</p>
 <div class="row"><${Mag} href=${MAIL}>Contact<//><${Mag} cls="o" href=${RES} target="_blank" rel="noopener">View Resume<//></div><footer>© 2026 AMAN</footer></div><//>
 <//>`;
}

export default App;
