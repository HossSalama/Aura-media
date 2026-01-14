// Scroll Reveal
function reveal() {
    document.querySelectorAll(".reveal").forEach(el => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight - 80) {
            el.classList.add("active");
        }
    });
}
window.addEventListener("scroll", reveal);
window.addEventListener("load", reveal);

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});

// Glow Particles
function createGlowParticles() {
    for (let i = 0; i < 25; i++) {
        const p = document.createElement("div");
        p.className = "glow-particle";
        const size = Math.random() * 3 + 1;
        p.style.width = size + "px";
        p.style.height = size + "px";
        p.style.left = Math.random() * 100 + "vw";
        p.style.top = Math.random() * 100 + "vh";
        p.style.animationDuration = Math.random() * 10 + 10 + "s";
        document.body.appendChild(p);
    }
}
createGlowParticles();

const canvas = document.getElementById("fx-canvas");
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

let particles = [];

class Particle {
  constructor(x,y){
    this.x=x; this.y=y;
    this.vx=(Math.random()-0.5)*6;
    this.vy=(Math.random()-0.5)*6;
    this.life=100;
  }
  draw(){
    ctx.fillStyle=`hsl(${Math.random()*360},100%,50%)`;
    ctx.beginPath();
    ctx.arc(this.x,this.y,3,0,Math.PI*2);
    ctx.fill();
  }
  update(){
    this.x+=this.vx;
    this.y+=this.vy;
    this.life--;
  }
}

window.addEventListener("mousemove", e=>{
  for(let i=0;i<5;i++){
    particles.push(new Particle(e.clientX,e.clientY));
  }
});

function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles = particles.filter(p=>p.life>0);
  particles.forEach(p=>{p.update();p.draw();});
  requestAnimationFrame(animate);
}
animate();

/* SCREEN SHAKE */
document.querySelector(".btn-chaos").addEventListener("click", ()=>{
  document.body.style.animation="shake 0.3s";
  setTimeout(()=>document.body.style.animation="",300);
});

const style=document.createElement("style");
style.innerHTML=`
@keyframes shake{
  0%{transform:translate(0)}
  25%{transform:translate(10px,0)}
  50%{transform:translate(-10px,0)}
  75%{transform:translate(10px,0)}
  100%{transform:translate(0)}
}`;
document.head.appendChild(style);

/* CURSOR */
const cursor=document.querySelector(".cursor");
window.addEventListener("mousemove",e=>{
  cursor.style.left=e.clientX-15+"px";
  cursor.style.top=e.clientY-15+"px";
});
