// Hover Color
// One shape, one question: is the mouse inside it?
// If yes, the circle turns red. If no, it stays its normal color.

function setup() {
  const canvas = createCanvas(400, 400);
  canvas.parent("sketch");
}

function draw() {
  background(220);

  const isHovering = dist(mouseX, mouseY, width / 2, height / 2) < 80;

  if (isHovering) {
    fill(255, 70, 70);
  } else {
    fill(100, 160, 255);
  }
  noStroke();
  ellipse(width / 2, height / 2, 160, 160);
}
