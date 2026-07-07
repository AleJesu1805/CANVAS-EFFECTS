const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let hue = 100;
let containerPoints = [];
canvas.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const posMouse = {
    x: undefined,
    y: undefined,
}

canvas.addEventListener("touchmove", (e) => {
    posMouse.x = e.changedTouches[0].clientX;
    posMouse.y = e.changedTouches[0].clientY;
    for (let i = 0; i < 5; i++) {
        containerPoints.push(new Particle());
    }
    console.log(e);
});

canvas.addEventListener("mousemove", (e) => {
    posMouse.x = e.x;
    posMouse.y = e.y;
    for (let i = 0; i < 5; i++) {
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
        this.color = `hsl(${hue}, 100%, 50%)`;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size >= 1) this.size -= 0.1;
    }
    drawParticle() {
        ctx.fillStyle = this.color;
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