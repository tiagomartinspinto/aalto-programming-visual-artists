// Shapes Function
// One function, called many times with different random parameters,
// builds a whole composition. Click to regenerate: same function,
// same rule, a completely different result every time.

void setup() {
  size(500, 500);
  rectMode(CENTER);
  noLoop(); // draw once per click instead of animating every frame
}

void draw() {
  background(15);

  // Same function, 20 calls, three random values each time: where,
  // how big, and (inside the function) what shape and color.
  for (int i = 0; i < 20; i++) {
    drawAbstractShape(random(width), random(height), random(30, 100));
  }
}

// x and y are the shape's position, size is its scale. Everything
// else about the shape - which kind, and which color - is decided
// inside the function itself, using random().
void drawAbstractShape(float x, float y, float size) {
  int shapeType = int(random(3));
  fill(random(255), random(255), random(255), 150);
  noStroke();

  if (shapeType == 0) {
    ellipse(x, y, size, size);
  } else if (shapeType == 1) {
    rect(x, y, size, size);
  } else {
    float half = size / 2;
    triangle(x, y - half, x - half, y + half, x + half, y + half);
  }
}

// redraw() runs draw() one more time - the same pattern as
// mousePressed() in Color House, just triggering a new composition
// instead of a new color.
void mousePressed() {
  redraw();
}
