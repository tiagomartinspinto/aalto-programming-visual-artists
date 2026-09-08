// Particles Follow
// One Particle is a recipe for one thing - the same idea as a
// function in Session 05, except this recipe also carries its own
// values (position, speed, life) instead of just drawing something.
// An ArrayList<Particle> stores as many particles as currently exist,
// the same idea as the dots array in Array of Dots, just holding
// Particle objects instead of positions.

ArrayList<Particle> particles = new ArrayList<Particle>();
int maxParticles = 400; // safety net: keeps the count bounded no matter how fast particles are made or how slowly they fade

void setup() {
  size(600, 400);
}

void draw() {
  background(0);

  // Make one new particle at the mouse position, unless the array is
  // already at its safety limit.
  if (particles.size() < maxParticles) {
    particles.add(new Particle(mouseX, mouseY));
  }

  // Visit every particle in the array, back to front. Going backward
  // means removing one does not skip the next one in line.
  for (int i = particles.size() - 1; i >= 0; i--) {
    Particle p = particles.get(i);
    p.update();
    p.display();

    if (p.isDead()) {
      particles.remove(i);
    }
  }
}

// The recipe for one particle: starting values (the constructor), how
// it changes every frame (update), how it draws itself (display), and
// how it knows it is finished (isDead).
class Particle {
  float x, y;
  float speedX, speedY;
  float life;

  Particle(float startX, float startY) {
    x = startX;
    y = startY;
    speedX = random(-2, 2);
    speedY = random(-2, 2);
    life = 255;
  }

  void update() {
    x += speedX;
    y += speedY;
    life -= 3;
  }

  void display() {
    noStroke();
    fill(255, life);
    ellipse(x, y, 8, 8);
  }

  boolean isDead() {
    return life <= 0;
  }
}
