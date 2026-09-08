// Color House
// A click changes two variables. The drawing does not change; the
// values it reads do.

color houseColor = color(255, 122, 168);
color skyColor = color(210, 225, 240);

void setup() {
  size(400, 400);
  noStroke();
}

void draw() {
  background(skyColor);

  fill(houseColor);
  rect(150, 220, 120, 120);
  triangle(140, 220, 210, 155, 280, 220);
}

// mousePressed() runs once, the moment you click.
// It does not draw anything itself - it only changes the two
// variables that draw() reads on the very next frame.
void mousePressed() {
  houseColor = color(random(255), random(255), random(255));
  skyColor = color(random(150, 255), random(150, 255), random(150, 255));
}
