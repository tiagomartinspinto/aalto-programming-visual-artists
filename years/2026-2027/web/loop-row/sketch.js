// Loop Row
// One line of drawing code, repeated by a loop instead of being
// copied by hand. Compare this with the manual version in the
// worksheet.

function setup() {
  const canvas = createCanvas(400, 100);
  canvas.parent("sketch");
}

function draw() {
  background(220);
  noStroke();
  fill(100, 160, 255);

  for (let i = 0; i < 8; i++) {
    const x = 25 + i * 50;
    circle(x, 50, 30);
  }
}
