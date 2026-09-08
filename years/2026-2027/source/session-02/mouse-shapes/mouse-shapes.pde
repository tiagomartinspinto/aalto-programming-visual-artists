// Mouse Shapes
// mouseX and mouseY are variables that Processing updates for you,
// every frame, without you writing any code to change them.
// This sketch reads those two variables and uses map() to turn them
// into everything else: two positions and three colors.

float circleSize = 50;
float squareSize = 50;

void setup() {
  size(800, 600);
  rectMode(CENTER);
}

void draw() {
  // Background color: three variables computed from mouseX/mouseY,
  // each mapped from the mouse's pixel range into a 0-255 color range.
  float bgR = map(mouseX, 0, width, 0, 255);
  float bgG = map(mouseY, 0, height, 0, 255);
  float bgB = map(mouseX + mouseY, 0, width + height, 0, 255);
  background(bgR, bgG, bgB);

  // Circle position: follows the mouse directly.
  float circleX = mouseX;
  float circleY = mouseY;

  // Square position: moves the opposite way, around the center.
  float squareX = width - mouseX;
  float squareY = height - mouseY;

  // Circle color: mapped from its own position, so it changes as it moves.
  float cR = map(circleX, 0, width, 0, 255);
  float cG = map(circleY, 0, height, 0, 255);
  fill(cR, cG, 200);
  noStroke();
  ellipse(circleX, circleY, circleSize, circleSize);

  // Square color: same idea, using the square's own position.
  float sR = map(squareX, 0, width, 0, 255);
  float sG = map(squareY, 0, height, 0, 255);
  fill(sR, 200, sG);
  rect(squareX, squareY, squareSize, squareSize);
}
