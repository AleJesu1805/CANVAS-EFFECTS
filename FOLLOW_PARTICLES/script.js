const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let containerPoints = [];
let hue = 100;
canvas.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const posMouse = {
    x: undefined,
    y: undefined,
}

canvas.addEventListener("pointermove", (e) => {
    posMouse.x = e.x;
    posMouse.y = e.y;
    for (let i = 0; i < 10; i++) {
        containerPoints.push(new Particle());
    }
});

class Particle {
    constructor() {
        this.x = posMouse.x;
        this.y = posMouse.y;
        this.speedX = Math.random() * 3 - 1;
        this.speedY = Math.random() * 3 - 1;
        this.size = Math.random() * 15 + 1;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size >= 1) this.size -= 0.1;
    }
    drawParticle() {
        ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function showParticle() {
    for (let i = 0; i < containerPoints.length; i++) {
        containerPoints[i].update();
        containerPoints[i].drawParticle();
    }
}

function draw() {
    // ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = `#0001`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    showParticle();
    hue++;
    requestAnimationFrame(draw);
}
draw();