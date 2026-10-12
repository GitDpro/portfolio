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

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;

  stars = Array.from(
    { length: Math.floor((width * height) / 9000) },
    () => {
      const x = Math.random() * width;
      const y = Math.random() * height;

      return {
        x, y, baseX: x, baseY: y,
        offsetX: 0, offsetY: 0,
        radius: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.5 + 0.4,
        speed: Math.random() * 0.02 + 0.005,
      };
    }
  )
}


function animate(time) {
  ctx.clearRect(0,0,width,height)

  for (const star of stars) {
    const dx = mouse.x - star.baseX
    const dy = mouse.y - star.baseY

    const distance = Math.hypot(dx,dy);

    const strength = mouse.active && distance < 180 ? (1- distance/180) ** 2 * 22 / (distance || 1) : 0;

    star.offsetX += (dx * strength - star.offsetX) * 0.08
    star.offsetY += (dy * strength - star.offsetY) * 0.08

    star.x = star.baseX + star.offsetX
    star.y = star.baseY + star.offsetY

    ctx.globalAplha = star.alpha * (0.75 + Math.sin(time * star.speed + star.baseX) * 0.25);
  }

}


window.addEventListener("pointermove", (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
  mouse.active = true;
});


window.addEventListener("blur", () => {
  mouse.active = false;
});


window.addEventListener("pointerdown", (event) => {
  if (event.target.closest("a, button")) {
    return;
  }

  createShockwave(event.clientX, event.clientY);
});