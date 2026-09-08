// Hover Grid
// A nested loop draws a grid of cells: the outer loop repeats each
// row, the inner loop repeats every column inside that row. A
// condition then lets each cell react on its own.

const cols = 8;
const rows = 8;
let cellW;
let cellH;

function setup() {
  const canvas = createCanvas(400, 400);
  canvas.parent("sketch");
  cellW = width / cols;
  cellH = height / rows;
}

function draw() {
  background(220);
  noStroke();

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = col * cellW;
      const y = row * cellH;

      // Is the mouse inside this one cell?
      const isHovering = mouseX >= x && mouseX < x + cellW &&
        mouseY >= y && mouseY < y + cellH;

      fill(isHovering ? color(255, 70, 70) : color(100, 160, 255));
      rect(x, y, cellW - 1, cellH - 1);
    }
  }
}
