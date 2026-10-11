const canvas = document.getElementById("universe");
const ctx = canvas.getContext("2d");

const themes = [
  { star: "#a8c7ff", glow: "#617dff" },
  { star: "#e1b7ff", glow: "#a45cff" },
  { star: "#ffe1a1", glow: "#ff9e42" },
  { star: "#a4ffe8", glow: "#36d9c5" },
];

let themeIndex = 0;
let width = window.innerWidth;
let height = window.innerHeight;

let stars = [];
let shockwaves = [];
let shootingStars = [];

const mouse = {
  x: -1000,
  y: -1000,
  active: false,
};

function resize() {}

function createStar() {}

function updateStars() {}

function drawStar(star, time) {}

function drawConnections() {}

function createShockwave(x, y) {}

function drawShockwaves() {}

function spawnShootingStar() {}

function drawShootingStars() {}

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