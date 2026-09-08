// Loop Row
// One line of drawing code, repeated by a loop instead of being
// copied by hand. Compare this with the manual version in the
// worksheet.

void setup() {
  size(400, 100);
}

void draw() {
  background(220);
  noStroke();
  fill(100, 160, 255);

  for (int i = 0; i < 8; i++) {
    float x = 25 + i * 50;
    circle(x, 50, 30);
  }
}
