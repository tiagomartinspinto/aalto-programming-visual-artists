// Mouse Shapes
// mouseX and mouseY are variables that p5.js updates for you,
// every frame, without you writing any code to change them.
// This sketch reads those two variables and uses map() to turn them
// into everything else: two positions and three colors.

const circleSize = 50;
const squareSize = 50;

function setup() {
  const canvas = createCanvas(800, 600);
  canvas.parent("sketch");
  rectMode(CENTER);
}

function draw() {
  // Background color: three variables computed from mouseX/mouseY,
  // each mapped from the mouse's pixel range into a 0-255 color range.
  const bgR = map(mouseX, 0, width, 0, 255);
  const bgG = map(mouseY, 0, height, 0, 255);
  const bgB = map(mouseX + mouseY, 0, width + height, 0, 255);
  background(bgR, bgG, bgB);

  // Circle position: follows the mouse directly.
  const circleX = mouseX;
  const circleY = mouseY;

  // Square position: moves the opposite way, around the center.
  const squareX = width - mouseX;
  const squareY = height - mouseY;

  // Circle color: mapped from its own position, so it changes as it moves.
  const cR = map(circleX, 0, width, 0, 255);
  const cG = map(circleY, 0, height, 0, 255);
  fill(cR, cG, 200);
  noStroke();
  ellipse(circleX, circleY, circleSize, circleSize);

  // Square color: same idea, using the square's own position.
  const sR = map(squareX, 0, width, 0, 255);
  const sG = map(squareY, 0, height, 0, 255);
  fill(sR, 200, sG);
  rect(squareX, squareY, squareSize, squareSize);
}
