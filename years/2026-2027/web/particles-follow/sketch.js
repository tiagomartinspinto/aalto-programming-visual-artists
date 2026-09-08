// Particles Follow
// One Particle is a recipe for one thing - the same idea as a
// function in Session 05, except this recipe also carries its own
// values (position, speed, life) instead of just drawing something.
// The particles array stores as many particles as currently exist,
// the same idea as the dots array in Array of Dots, just holding
// Particle objects instead of positions.

const particles = [];
const MAX_PARTICLES = 400; // safety net: keeps the count bounded no matter how fast particles are made or how slowly they fade

function setup() {
  const canvas = createCanvas(600, 400);
  canvas.parent("sketch");
}

function draw() {
  background(0);

  // Make one new particle at the mouse position, unless the array is
  // already at its safety limit.
  if (particles.length < MAX_PARTICLES) {
    particles.push(new Particle(mouseX, mouseY));
  }

  // Visit every particle in the array, back to front. Going backward
  // means removing one does not skip the next one in line.
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].display();

    if (particles[i].isDead()) {
      particles.splice(i, 1);
    }
  }
}

// The recipe for one particle: starting values (the constructor), how
// it changes every frame (update), how it draws itself (display), and
// how it knows it is finished (isDead).
class Particle {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.speedX = random(-2, 2);
    this.speedY = random(-2, 2);
    this.life = 255;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.life -= 3;
  }

  display() {
    noStroke();
    fill(255, this.life);
    ellipse(this.x, this.y, 8, 8);
  }

  isDead() {
    return this.life <= 0;
  }
}
