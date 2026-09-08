// Array of Dots
// An array is one variable that can hold many values - here, many
// click positions. Click to add one more dot; the loop below always
// draws every dot the array currently holds.

const dots = [];

function setup() {
  const canvas = createCanvas(400, 400);
  canvas.parent("sketch");
  noStroke();
  fill(100, 160, 255);
}

function draw() {
  background(220);

  for (let i = 0; i < dots.length; i++) {
    circle(dots[i].x, dots[i].y, 20);
  }
}

// {x, y} packages a click's position together as one thing instead
// of two - the same idea as PVector on the Processing side.
function mousePressed() {
  dots.push({ x: mouseX, y: mouseY });
}
