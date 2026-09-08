// Hover Grid
// A nested loop draws a grid of cells: the outer loop repeats each
// row, the inner loop repeats every column inside that row. A
// condition then lets each cell react on its own.

int cols = 8;
int rows = 8;
float cellW;
float cellH;

void setup() {
  size(400, 400);
  cellW = width / (float) cols;
  cellH = height / (float) rows;
}

void draw() {
  background(220);
  noStroke();

  for (int row = 0; row < rows; row++) {
    for (int col = 0; col < cols; col++) {
      float x = col * cellW;
      float y = row * cellH;

      // Is the mouse inside this one cell?
      boolean isHovering = mouseX >= x && mouseX < x + cellW &&
        mouseY >= y && mouseY < y + cellH;

      fill(isHovering ? color(255, 70, 70) : color(100, 160, 255));
      rect(x, y, cellW - 1, cellH - 1);
    }
  }
}
