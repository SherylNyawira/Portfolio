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

// Modal
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalDetail = document.getElementById("modal-detail");
const modalImg = document.getElementById("modal-img");
const closeBtn = document.querySelector("#modal .close");

document.querySelectorAll(".glass-card").forEach(card => {
  card.addEventListener("click", () => {
    modal.style.display = "flex";
    modalTitle.textContent = card.dataset.title;
    modalDetail.textContent = card.dataset.detail;
    modalImg.src = card.dataset.img;
  });
});

closeBtn.onclick = () => modal.style.display = "none";
window.onclick = e => { if (e.target === modal) modal.style.display = "none"; }
document.addEventListener("keydown", e => {
  if (e.key === "Escape") modal.style.display = "none";
});

const timelineItems = document.querySelectorAll('.timeline-item');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');  // animate in
    } else {
      entry.target.classList.remove('show'); // remove when out of view
    }
  });
}, { threshold: 0.2 });

timelineItems.forEach(item => observer.observe(item));

// Project cybersecurity Modal Elements
const projectModal = document.getElementById("project-modal");
const projectModalImg = document.getElementById("project-modal-img");
const projectModalTitle = document.getElementById("project-modal-title");
const projectModalDescription = document.getElementById("project-modal-description");
const closeProjectModal = document.querySelector("#project-modal .close");

// Open modal on card click
document.querySelectorAll(".timeline-card").forEach(card => {
  card.addEventListener("click", () => {
    projectModal.style.display = "flex";
    projectModalImg.src = card.getAttribute("data-img");
    projectModalTitle.textContent = card.getAttribute("data-title");
    projectModalDescription.textContent = card.getAttribute("data-description");
  });
});

// Close modal
closeProjectModal.addEventListener("click", () => {
  projectModal.style.display = "none";
});
projectModal.querySelector(".close").addEventListener("click", () => {
  projectModal.style.display = "none";
});

// Close if clicked outside modal-content
window.addEventListener("click", (e) => {
  if (e.target === projectModal) projectModal.style.display = "none";
});



document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple form validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (name && email && message) {
                // In a real application, you would send the form data to a server here
                // For this example, we'll just show the success message
                document.getElementById('successMessage').style.display = 'block';
                
                // Reset the form
                document.getElementById('contactForm').reset();
                
                // Hide success message after 5 seconds
                setTimeout(function() {
                    document.getElementById('successMessage').style.display = 'none';
                }, 5000);
            }
        });

 // Handle contact button to contact section
 document.getElementById('contactButton').addEventListener('click', function() {
   document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
 });
