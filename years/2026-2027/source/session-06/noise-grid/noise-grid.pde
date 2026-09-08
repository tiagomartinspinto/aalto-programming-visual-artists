// Noise Grid
// random() jumps between unrelated values every time you call it.
// noise() reads a smooth, continuous field instead: nearby positions
// get nearby values, so the grid changes gradually instead of jumping
// between neighboring cells. This sketch uses noise() to control only
// one property: circle size. Click to sample a different part of the
// noise field.

int cols = 10;
int rows = 10;
float cellW;
float cellH;
float noiseScale = 0.15;
float seedX = 0;
float seedY = 0;

void setup() {
  size(500, 500);
  cellW = width / (float) cols;
  cellH = height / (float) rows;
  noStroke();
  fill(100, 160, 255);
  noLoop();
}

void draw() {
  background(220);

  for (int row = 0; row < rows; row++) {
    for (int col = 0; col < cols; col++) {
      float x = col * cellW + cellW / 2;
      float y = row * cellH + cellH / 2;

      // Two nearby cells (a small change in col/row) get a similar
      // noise value, so size changes smoothly across the grid instead
      // of jumping from cell to cell the way random() would.
      float n = noise(seedX + col * noiseScale, seedY + row * noiseScale);
      float size = map(n, 0, 1, 4, cellW * 0.9);

      circle(x, y, size);
    }
  }
}

// A new seed moves where the grid samples the noise field, so
// clicking gives a different but still smooth composition.
void mousePressed() {
  seedX = random(1000);
  seedY = random(1000);
  redraw();
}
