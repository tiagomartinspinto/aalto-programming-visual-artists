// Array of Dots
// An array is one variable that can hold many values - here, many
// click positions. Click to add one more dot; the loop below always
// draws every dot the array currently holds.

ArrayList<PVector> dots = new ArrayList<PVector>();

void setup() {
  size(400, 400);
  noStroke();
  fill(100, 160, 255);
}

void draw() {
  background(220);

  for (int i = 0; i < dots.size(); i++) {
    PVector dot = dots.get(i);
    circle(dot.x, dot.y, 20);
  }
}

// PVector just packages an x and a y together - the same idea as the
// {x, y} object on the p5.js side, one thing instead of two.
void mousePressed() {
  dots.add(new PVector(mouseX, mouseY));
}
