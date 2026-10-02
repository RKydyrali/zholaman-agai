import React, {useEffect, useRef, useState} from 'react';
import {createRoot} from 'react-dom/client';
import '@fontsource-variable/fredoka';
import '@fontsource-variable/caveat';
import '@fontsource/bungee/latin-400.css';
import './style.css';

const assets='/assets/';
const wishes=[
 ['More happiness.','May there always be time for the people, places, and little things that make you happy.'],
 ['Fresh inspiration.','May your next idea excite you as much as your lessons inspire us to create something of our own.'],
 ['Good health.','We wish you strength, peace of mind, and the energy to enjoy everything you love.'],
 ['The respect you deserve.','May you always feel how much your work matters and how many lives you make a little better.']
];
const memes=[['cat.png','Us when the code finally works.'],['unicorn.webp','On our way to your programming lesson.'],['meme-0.webp','It was my bug all along.'],['meme-1.webp','One tiny change before deployment.'],['meme-2.webp','“Now explain your code.”'],['meme-3.webp','You finding the bug in two seconds.'],['meme-4.webp','Let him cook.'],['meme-5.webp','Can we skip the homework?'],['meme-6.webp','The only correct answer.']];

function App(){
 const [celebrating,setCelebrating]=useState(false),[notice,setNotice]=useState('');
 const celebrationTimer=useRef(),noticeTimer=useRef();
 const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 function celebrate(){
  setCelebrating(true);setNotice('Happy Teacher’s Day, Zholaman Agai!');
  clearTimeout(celebrationTimer.current);clearTimeout(noticeTimer.current);
  celebrationTimer.current=setTimeout(()=>setCelebrating(false),2400);
  noticeTimer.current=setTimeout(()=>setNotice(''),4200);
  if(reduce)return;
  if(document.querySelectorAll('.confetti').length>120)return;
  const colors=['#ffe9a9','#f791b7','#c8a9ef','#f6d6e4','#a4c8b8'];
  for(let i=0;i<100;i++){
   const piece=document.createElement('i');piece.className='confetti';
   piece.style.cssText=`left:${Math.random()*100}vw;--color:${colors[i%colors.length]};--drift:${(Math.random()-.5)*400}px;--spin:${Math.random()*900}deg;--duration:${2.6+Math.random()*2}s;--delay:${Math.random()*.35}s;--radius:${i%3===0?'50%':'1px'}`;
   document.body.appendChild(piece);piece.addEventListener('animationend',()=>piece.remove(),{once:true});
  }
 }
 useEffect(()=>{
  document.documentElement.removeAttribute('data-theme');
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content','#71334d');
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}}),{threshold:.1});
  if(!reduce)document.querySelectorAll('[data-reveal]').forEach(el=>{el.classList.add('will-reveal');observer.observe(el)});
  return ()=>{observer.disconnect();clearTimeout(celebrationTimer.current);clearTimeout(noticeTimer.current);document.querySelectorAll('.confetti').forEach(el=>el.remove())};
 },[reduce]);
 return <div className={celebrating?'site celebrating':'site'}>
  <div className="ambient-sparkles" aria-hidden="true">{Array.from({length:12},(_,i)=><span key={i} style={{'--x':`${(i*31+8)%100}%`,'--y':`${(i*23+5)%100}%`,'--delay':`${i*.43}s`}}>✦</span>)}</div>
  <header className="header"><a href="#home" className="wordmark">Zholaman<span>✳</span>Agai</a><nav aria-label="Main navigation"><a href="#thanks">Our thank you</a><a href="#wishes">Good wishes</a><a href="#memes">A little chaos</a></nav><button className="party-button" onClick={celebrate}>Make it festive <span>✷</span></button></header>
  <main>
   <section className="hero section" id="home" aria-labelledby="hero-title">
    <div className="hero-copy"><p className="handwritten hero-pretitle">For a teacher we’re lucky to have.</p><h1 id="hero-title">Happy<br/><span>Teacher’s Day!</span></h1><p className="hero-name">Zholaman <span>Agai</span></p><p className="hero-message">You teach us to build things.<br/>You give us the confidence to try.<br/>Today, this little celebration is for you.</p><button className="celebrate-button" onClick={celebrate}>With love, from your students <span>♥</span></button></div>
    <div className="hero-portrait"><div className="portrait-halo" aria-hidden="true"/><span className="portrait-spark spark-one" aria-hidden="true">✳</span><span className="portrait-spark spark-two" aria-hidden="true">✦</span><div className="photo-window"><img src={assets+'zholaman.png'} alt="Zholaman Agai, the teacher on the right in the original photo" fetchPriority="high"/></div><span className="portrait-note handwritten">our favorite<br/>programming teacher ↗</span><span className="portrait-67">6<span>7</span></span><span className="portrait-love handwritten">big respect.<br/>even bigger gratitude.</span></div>
    <span className="hero-bottom-note handwritten">A little brainrot. A whole lot of love.</span>
   </section>
   <section id="thanks" className="gratitude section"><div className="gratitude-heading" data-reveal><span className="little-flower" aria-hidden="true">✳</span><p className="handwritten">Jokes aside, Agai.</p><h2>You make<br/><em>a difference.</em></h2></div><div className="letter" data-reveal><p className="letter-salutation handwritten">Dear Zholaman Agai,</p><p>Thank you for every lesson, every patient explanation, and every time you helped us believe that we could figure it out.</p><p>We appreciate the time and care you put into teaching us. You make room for questions, help us learn from our mistakes, and remind us that getting stuck is part of getting better.</p><p>We respect you for your knowledge, your kindness, and the way you encourage us to think for ourselves. You’re helping us become more confident people, as well as better programmers.</p><p className="letter-highlight">The code might be forgotten.<br/>The way you believed in us won’t be.</p><p className="letter-signature handwritten">With love and respect,<br/>your students <span>♥</span></p></div></section>
   <section className="wishes section" id="wishes"><div className="wishes-heading" data-reveal><p className="handwritten">A few things we wish for you.</p><h2>All the good things.<br/><span>You deserve them.</span></h2></div><div className="wish-list">{wishes.map(([title,text],i)=><div className="wish" key={title} data-reveal><span className={'wish-symbol symbol-'+i} aria-hidden="true">{['☀','✳','♥','✦'][i]}</span><div><h3>{title}</h3><p>{text}</p></div></div>)}</div><p className="wish-footnote handwritten" data-reveal>…and students who remember their semicolons, obviously.</p></section>
   <section className="meme-section section" id="memes"><div className="meme-heading" data-reveal><p className="handwritten">We had to include these.</p><h2>Maximum respect.<br/><span>Minimum seriousness.</span></h2><p>Some things are easier to explain with a cat.</p></div><div className="meme-collage">{memes.map(([image,caption],i)=><figure className={'meme meme-'+i} key={image} data-reveal style={{'--tilt':`${[-5,6,-3,4,-6,3,-4,5,-2][i]}deg`}}><img src={assets+image} alt={caption} loading="lazy"/><figcaption className="handwritten">{caption}</figcaption></figure>)}<figure className="meme meme-video" data-reveal><video src={assets+'meme.webm'} autoPlay={!reduce} muted loop playsInline controls preload="metadata" aria-label="A looping meme from your students"/><figcaption className="handwritten">Our last two brain cells.</figcaption></figure></div><div className="meme-quote" data-reveal><span className="quote-flower" aria-hidden="true">✳</span><blockquote>“да да этот сайт был<br/>навайбкоженный <span>ai slop</span>”</blockquote><p>Zholaman Agai, probably.</p><span className="handwritten quote-response">Fair. But we meant every word. ♥</span></div></section>
   <section className="finale section" data-reveal><div className="finale-flower" aria-hidden="true">✷</div><p className="handwritten">From all of us, to you.</p><h2>Thank you,<br/><span>Zholaman Agai.</span></h2><p className="finale-message">For your patience. For your encouragement.<br/>For making our programming lessons worth remembering.<br/>We’re grateful to be your students.</p><button className="celebrate-button" onClick={celebrate}>Happy Teacher’s Day! <span>✳</span></button><p className="handwritten finale-signature">Keep being you. We appreciate you.</p></section>
  </main>
  <footer><a href="#home" className="wordmark">Zholaman<span>✳</span>Agai</a><p>Made with love, respect, and just a little 67.</p><a href="#home">Back to the celebration ↑</a></footer>
  <div className={'toast '+(notice?'visible':'')} role="status">{notice}<span aria-hidden="true">♥</span></div>
 </div>
}
createRoot(document.getElementById('root')).render(<App/>);
