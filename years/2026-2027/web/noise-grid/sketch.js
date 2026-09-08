// Noise Grid
// random() jumps between unrelated values every time you call it.
// noise() reads a smooth, continuous field instead: nearby positions
// get nearby values, so the grid changes gradually instead of jumping
// between neighboring cells. This sketch uses noise() to control only
// one property: circle size. Click to sample a different part of the
// noise field.

const cols = 10;
const rows = 10;
let cellW;
let cellH;
const noiseScale = 0.15;
let seedX = 0;
let seedY = 0;

function setup() {
  const canvas = createCanvas(500, 500);
  canvas.parent("sketch");
  cellW = width / cols;
  cellH = height / rows;
  noStroke();
  fill(100, 160, 255);
  noLoop();
}

function draw() {
  background(220);

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = col * cellW + cellW / 2;
      const y = row * cellH + cellH / 2;

      // Two nearby cells (a small change in col/row) get a similar
      // noise value, so size changes smoothly across the grid instead
      // of jumping from cell to cell the way random() would.
      const n = noise(seedX + col * noiseScale, seedY + row * noiseScale);
      const size = map(n, 0, 1, 4, cellW * 0.9);

      circle(x, y, size);
    }
  }
}

// A new seed moves where the grid samples the noise field, so
// clicking gives a different but still smooth composition.
function mousePressed() {
  seedX = random(1000);
  seedY = random(1000);
  redraw();
}
