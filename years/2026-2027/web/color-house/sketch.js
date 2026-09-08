// Color House
// A click changes two variables. The drawing does not change; the
// values it reads do.

let houseColor;
let skyColor;

function setup() {
  const canvas = createCanvas(400, 400);
  canvas.parent("sketch");
  noStroke();
  houseColor = color(255, 122, 168);
  skyColor = color(210, 225, 240);
}

function draw() {
  background(skyColor);

  fill(houseColor);
  rect(150, 220, 120, 120);
  triangle(140, 220, 210, 155, 280, 220);
}

// mousePressed() runs once, the moment you click.
// It does not draw anything itself - it only changes the two
// variables that draw() reads on the very next frame.
function mousePressed() {
  houseColor = color(random(255), random(255), random(255));
  skyColor = color(random(150, 255), random(150, 255), random(150, 255));
}
