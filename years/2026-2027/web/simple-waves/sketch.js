// Simple Waves
// The same single-loop idea as Loop Row, but instead of counting
// circles, sin() gives each one a smoothly changing height.

const waveSpeed = 0.05;
const waveAmplitude = 50;
const waveSpacing = 0.1;

function setup() {
  const canvas = createCanvas(600, 300);
  canvas.parent("sketch");
}

function draw() {
  background(20);
  noFill();
  stroke(245);

  const time = frameCount * waveSpeed;

  for (let x = 0; x < width; x += 20) {
    // sin() always returns a value between -1 and 1, moving smoothly
    // back and forth. Multiplying it by waveAmplitude turns that into
    // a height in pixels; adding it to the middle of the canvas turns
    // it into a y position.
    const y = height / 2 + sin(x * waveSpacing + time) * waveAmplitude;
    circle(x, y, 10);
  }
}
