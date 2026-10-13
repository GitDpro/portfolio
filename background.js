const canvas = document.getElementById("universe");
const ctx = canvas.getContext("2d");

let width, height;
let stars = [];

let themeIndex = 0;

const mouse = {
  x: -1000,
  y: -1000,
  active: false,
};

const STAR_COUNT = () => Math.floor((width * height) / 7000);

function createStar() {
  const x = Math.random() * width;
  const y = Math.random() * height;

  return {
    x, y,
    baseX: x,
    baseY: y,
    offsetX: 0,
    offsetY: 0,

    radius: Math.random() * 1.5 + 0.5,
    alpha: 0,
    targetAlpha: Math.random() * 0.7 + 0.3,
    fadeSpeed: Math.random() * 0.1 + 0.01,
    life: Math.random() * 1000 + 500,
    age: 0,

    phase: "in",
    twinkleSpeed: Math.random() * 0.005 + 0.002,
    twinkleOffset: Math.random() * Math.PI * 2,


  };
}

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;

  stars = Array.from({ length: STAR_COUNT() }, createStar);
}

function animate(time) {
  ctx.clearRect(0, 0, width, height);

  for (let i = stars.length - 1; i >= 0; i--) {

    const star = stars[i];

    star.age++


    if (star.phase === "in" && star.alpha >= star.targetAlpha - 0.02) {
      star.phase = "alive";
      star.life = Math.random() * 500 + 400;
    }

    if (star.phase === "alive") {
      star.life--;

      
      star.targetAlpha = 0.5 + Math.sin(time * star.twinkleSpeed + star.twinkleOffset) * 0.45;

      if (star.life <= 0) {
        star.phase = "out";
        star.targetAlpha = 0;
      }
    }

    star.alpha += (star.targetAlpha - star.alpha) *(star.phase === "out" ? 0.025 : star.fadeSpeed);

    if (star.phase === "out" && star.alpha < 0.01) {
      stars.splice(i, 1);
      stars.push(createStar());
      continue;
    }


    

    const dx = mouse.x - star.baseX;
    const dy = mouse.y - star.baseY;

    const distance = Math.hypot(dx, dy);

    const strength =
      mouse.active && distance < 180
        ? ((1 - distance / 180) ** 2 * 45) / (distance || 1)
        : 0;

    star.offsetX += (dx * strength - star.offsetX) * 0.12;
    star.offsetY += (dy * strength - star.offsetY) * 0.12;

    star.x = star.baseX + star.offsetX;
    star.y = star.baseY + star.offsetY;

   

   ctx.globalAlpha = star.alpha
   
    

    ctx.fillStyle = "#8bc2f9";
    ctx.beginPath();

    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);

    ctx.fill();
  }

  ctx.globalAlpha = 1;
  requestAnimationFrame(animate);
}

window.addEventListener("pointermove", ({ clientX, clientY }) => {
  mouse.x = clientX;
  mouse.y = clientY;
  mouse.active = true;
});

window.addEventListener("pointerleave", () => (mouse.active = false));

window.addEventListener("blur", () => {
  mouse.active = false;
});

window.addEventListener("resize", resize);

resize();
requestAnimationFrame(animate);
