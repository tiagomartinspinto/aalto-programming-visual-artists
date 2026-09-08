// Simple Waves
// The same single-loop idea as Loop Row, but instead of counting
// circles, sin() gives each one a smoothly changing height.

float waveSpeed = 0.05;
float waveAmplitude = 50;
float waveSpacing = 0.1;

void setup() {
  size(600, 300);
}

void draw() {
  background(20);
  noFill();
  stroke(245);

  float time = frameCount * waveSpeed;

  for (float x = 0; x < width; x += 20) {
    // sin() always returns a value between -1 and 1, moving smoothly
    // back and forth. Multiplying it by waveAmplitude turns that into
    // a height in pixels; adding it to the middle of the canvas turns
    // it into a y position.
    float y = height / 2 + sin(x * waveSpacing + time) * waveAmplitude;
    circle(x, y, 10);
  }
}
