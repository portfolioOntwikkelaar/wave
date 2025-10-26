const mistCanvas = document.getElementById("mist");
const ctx = mistCanvas.getContext("2d");

function resize() {
  mistCanvas.width = window.innerWidth;
  mistCanvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

let mistParticles = [];
for (let i = 0; i < 100; i++) {
  mistParticles.push({
    x: Math.random() * mistCanvas.width,
    y: Math.random() * mistCanvas.height,
    radius: Math.random() * 100 + 50,
    alpha: Math.random() * 0.15 + 0.05,
    dx: (Math.random() - 0.5) * 0.5,
    dy: (Math.random() - 0.5) * 0.5,
  });
}

let mistEnabled = false;

function drawMist() {
  ctx.clearRect(0, 0, mistCanvas.width, mistCanvas.height);
  if (mistEnabled) {
    for (let p of mistParticles) {
      ctx.beginPath();
      let gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
      gradient.addColorStop(0, `rgba(73, 255, 24, ${p.alpha})`);
      gradient.addColorStop(1, "transparent");
      ctx.fillStyle = gradient;
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();

      p.x += p.dx;
      p.y += p.dy;

      if (p.x < -p.radius) p.x = mistCanvas.width + p.radius;
      if (p.y < -p.radius) p.y = mistCanvas.height + p.radius;
      if (p.x > mistCanvas.width + p.radius) p.x = -p.radius;
      if (p.y > mistCanvas.height + p.radius) p.y = -p.radius;
    }
  }
  requestAnimationFrame(drawMist);
}

drawMist();

// button interactions
document.getElementById("mistButton").addEventListener("click", () => {
  mistEnabled = !mistEnabled;
});

document.getElementById("pulseButton").addEventListener("click", () => {
  document.querySelector(".content").classList.toggle("pulse-active");
});
