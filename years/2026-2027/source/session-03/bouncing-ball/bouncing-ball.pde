// Bouncing Ball Color
// One ball. Its position changes every frame by adding speed to it.
// When an edge condition becomes true, the ball reverses direction
// and picks a new color - a visible consequence of the if statement.

float x = 200;
float y = 200;

float speedX = 3;
float speedY = 2;

float radius = 25;

color ballColor;

void setup() {
  size(400, 400);
  ballColor = color(100, 160, 255);
}

void draw() {
  background(220);

  // Draw the ball where it currently is.
  fill(ballColor);
  noStroke();
  ellipse(x, y, radius * 2, radius * 2);

  // Move the ball: position changes every frame by its speed.
  x += speedX;
  y += speedY;

  // Left/right edge: reverse the horizontal speed and change color.
  if (x < radius || x > width - radius) {
    speedX *= -1;
    ballColor = color(random(255), random(255), random(255));
  }

  // Top/bottom edge: reverse the vertical speed and change color.
  if (y < radius || y > height - radius) {
    speedY *= -1;
    ballColor = color(random(255), random(255), random(255));
  }
}
