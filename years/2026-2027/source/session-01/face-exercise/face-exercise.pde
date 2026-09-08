// Face Exercise
// Draws a face by calling one reusable function more than once.
//
// The face used to be drawn with one long list of shape commands.
// Once that drawing lived inside a function (drawFace), calling it
// again with different numbers became the easy way to make more faces.

void setup() {
  size(500, 500);
  noLoop(); // The drawing does not change on its own, so draw() only needs to run once.
}

void draw() {
  background(200, 220, 255);

  // Same function, three different parameters: position and size change,
  // the drawing code does not.
  drawFace(160, 150, 160);
  drawFace(360, 340, 120);
  drawFace(90, 380, 90);
}

// x and y are the center of the face. diameter controls its size.
// Everything inside this function is drawn relative to those three
// numbers, so the same code works for a big face or a small one.
void drawFace(float x, float y, float diameter) {
  // Face
  fill(255, 220, 200);
  noStroke();
  ellipse(x, y, diameter, diameter);

  // Eyes
  fill(0);
  float eyeOffsetX = diameter * 0.15;
  float eyeOffsetY = diameter * 0.1;
  float eyeSize = diameter * 0.1;
  ellipse(x - eyeOffsetX, y - eyeOffsetY, eyeSize, eyeSize);
  ellipse(x + eyeOffsetX, y - eyeOffsetY, eyeSize, eyeSize);

  // Mouth
  noFill();
  stroke(0);
  strokeWeight(max(2, diameter * 0.02));
  arc(x, y + diameter * 0.1, diameter * 0.5, diameter * 0.25, 0, PI);
}
