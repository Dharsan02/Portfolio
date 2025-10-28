// ------------------ RUNNER GAME ------------------
const canvasGame = document.getElementById("runnerGame");
const ctxGame = canvasGame.getContext("2d");

let dino = { x: 50, y: 40, width: 20, height: 20, vy: 0, jump: false };
let gravity = 0.8, ground = 50, obstacles = [], speed = 3, frame = 0;

function drawDino() {
  ctxGame.fillStyle = "#00eaff";
  ctxGame.fillRect(dino.x, dino.y, dino.width, dino.height);
}

function drawGround() {
  ctxGame.strokeStyle = "rgba(0,255,255,0.3)";
  ctxGame.beginPath();
  ctxGame.moveTo(0, ground);
  ctxGame.lineTo(canvasGame.width, ground);
  ctxGame.stroke();
}

function drawObstacles() {
  ctxGame.fillStyle = "rgba(0,255,255,0.6)";
  obstacles.forEach(obs => ctxGame.fillRect(obs.x, obs.y, obs.width, obs.height));
}

function update() {
  ctxGame.clearRect(0, 0, canvasGame.width, canvasGame.height);
  drawGround();

  if (dino.jump) {
    dino.vy -= gravity;
    dino.y -= dino.vy;
    if (dino.y >= ground - dino.height) {
      dino.y = ground - dino.height;
      dino.jump = false;
      dino.vy = 0;
    }
  }

  if (frame % 100 === 0)
    obstacles.push({ x: canvasGame.width, y: ground - 10, width: 10, height: 10 });

  obstacles.forEach(obs => obs.x -= speed);
  obstacles = obstacles.filter(obs => obs.x + obs.width > 0);

  drawDino();
  drawObstacles();
  frame++;
  requestAnimationFrame(update);
}

document.addEventListener("keydown", e => {
  if (e.code === "Space" && !dino.jump) {
    dino.jump = true;
    dino.vy = 10;
  }
});

document.querySelector(".scroll-icon").addEventListener("click", () => {
  document.getElementById("about").scrollIntoView({ behavior: "smooth" });
});

update();


// ------------------ COUNTDOWN ------------------
let endDate = localStorage.getItem("countdownEndDate");

if (!endDate) {
  endDate = new Date();
  endDate.setDate(endDate.getDate() + 30);
  localStorage.setItem("countdownEndDate", endDate);
} else {
  endDate = new Date(endDate);
}

function updateCountdown() {
  const now = new Date().getTime();
  const distance = endDate.getTime() - now;

  if (distance <= 0) {
    document.getElementById("days").innerText = "00";
    document.getElementById("hours").innerText = "00";
    document.getElementById("minutes").innerText = "00";
    document.getElementById("seconds").innerText = "00";
    document.querySelector(".countdown-finish").innerText = "Launching Soon!";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  document.getElementById("days").innerText = String(days).padStart(2, "0");
  document.getElementById("hours").innerText = String(hours).padStart(2, "0");
  document.getElementById("minutes").innerText = String(minutes).padStart(2, "0");
  document.getElementById("seconds").innerText = String(seconds).padStart(2, "0");
}

setInterval(updateCountdown, 1000);


// ------------------ DETAILS DISPLAY ------------------
function showDetails() {
  const response = {
    name: "Dharsan S",
    stack: ["Python", "Django REST Framework", "SQLite", "JWT", "Postman", "HTML & CSS"],
    email: "dharsan.s212@gmail.com",
    location: "Chennai, India",
    github: "https://github.com/Dharsan02"
  };
  document.getElementById("responseBox1").innerHTML =
    `<pre>${JSON.stringify(response, null, 2)}</pre>`;
}


// ------------------ SEND BUTTON HANDLER ------------------
document.getElementById("sendBtn").addEventListener("click", async () => {
  const responseBox = document.getElementById("responseBox");
  const bodyText = document.getElementById("bodyInput").value;
  const url = document.getElementById("url").value;

  responseBox.textContent = "Sending...";

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: bodyText,
    });

    const text = await res.text();
    responseBox.innerHTML = `<pre>${text}</pre>`;
  } catch (error) {
    responseBox.textContent = "Error: " + error.message;
  }
});


// ------------------ SNOW ANIMATION ------------------
const snowCanvas = document.getElementById("snowCanvas");
const snowCtx = snowCanvas.getContext("2d");

snowCanvas.width = window.innerWidth;
snowCanvas.height = window.innerHeight;

let snowflakes = [];

function createSnowflakes() {
  for (let i = 0; i < 100; i++) {
    snowflakes.push({
      x: Math.random() * snowCanvas.width,
      y: Math.random() * snowCanvas.height,
      radius: Math.random() * 3 + 1,
      speed: Math.random() * 1 + 0.5,
      opacity: Math.random()
    });
  }
}

function drawSnowflakes() {
  snowCtx.clearRect(0, 0, snowCanvas.width, snowCanvas.height);
  snowCtx.fillStyle = "rgba(255, 255, 255, 0.8)";
  snowCtx.beginPath();

  for (let flake of snowflakes) {
    snowCtx.moveTo(flake.x, flake.y);
    snowCtx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
  }

  snowCtx.fill();
  moveSnowflakes();
}

function moveSnowflakes() {
  for (let flake of snowflakes) {
    flake.y += flake.speed;
    if (flake.y > snowCanvas.height) {
      flake.y = 0;
      flake.x = Math.random() * snowCanvas.width;
    }
  }
}

function animateSnow() {
  drawSnowflakes();
  requestAnimationFrame(animateSnow);
}

createSnowflakes();
animateSnow();

window.addEventListener("resize", () => {
  snowCanvas.width = window.innerWidth;
  snowCanvas.height = window.innerHeight;
  snowflakes = [];
  createSnowflakes();
  
});

 const logo = document.getElementById("logo");
    const finalText = "&lt;Dharsan&gt;";
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789<>";
    let animating = false;

    logo.addEventListener("mouseenter", () => {
      if (animating) return;
      animating = true;

      let iteration = 0;
      const interval = setInterval(() => {
        logo.innerHTML = finalText
          .split("")
          .map((char, index) => {
            if (index < iteration) return finalText[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("");

        if (iteration >= finalText.length) {
          clearInterval(interval);
          logo.innerHTML = finalText;
          animating = false;
        }

        iteration += 0.5;
      }, 70);
    });

    logo.addEventListener("mouseleave", () => {
      logo.innerHTML = "&lt;D&gt;";
    });


document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80, // offset for navbar height
        behavior: 'smooth'
      });
    }
  });
});
