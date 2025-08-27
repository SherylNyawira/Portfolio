// Spaceship Cursor
const cursor = document.getElementById("cursor");
document.addEventListener("mousemove", e => {
  cursor.style.left = e.pageX + "px";
  cursor.style.top = e.pageY + "px";

  // Add glowing trail
  createTrail(e.pageX, e.pageY);
});

// Starfield Background
const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Normal stars floating in background
let stars = Array(200).fill().map(() => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  radius: Math.random() * 1.5,
  dx: (Math.random() - 0.5) * 0.5,
  dy: (Math.random() - 0.5) * 0.5
}));

// Store the star "trails" left by cursor
let trails = [];

function createTrail(x, y) {
  trails.push({
    x, 
    y,
    radius: Math.random() * 2 + 1,
    opacity: 1
  });
}

function animate() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw floating background stars
  stars.forEach(star => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();

    star.x += star.dx;
    star.y += star.dy;

    if (star.x < 0 || star.x > canvas.width) star.dx *= -1;
    if (star.y < 0 || star.y > canvas.height) star.dy *= -1;
  });

  // Draw cursor trails (glowing fading stars)
  trails.forEach((trail, i) => {
    ctx.beginPath();
    ctx.arc(trail.x, trail.y, trail.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0, 255, 255, ${trail.opacity})`;
    ctx.fill();

    trail.opacity -= 0.02; // fade out
    trail.radius += 0.05;  // expand slightly

    if (trail.opacity <= 0) trails.splice(i, 1);
  });

  requestAnimationFrame(animate);
}
animate();


// Handle window resize
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const pages = Array.from(document.querySelectorAll(".page")).map(p => p.id);
let currentPage = 0;
let isScrolling = false;

function navigateTo(pageId) {
  document.querySelectorAll(".page").forEach(page => {
    page.classList.remove("active");
  });
  document.getElementById(pageId).classList.add("active");
  currentPage = pages.indexOf(pageId);
}




