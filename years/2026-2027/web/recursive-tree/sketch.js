// Recursive Tree
// branch() draws one segment, then calls itself twice to draw two
// smaller branches - the same rule, applied again at a smaller scale.
// It stops calling itself once a branch gets too short: that stopping
// rule is the base case, and it is what keeps the tree finite.

let baseLength = 110;
let branchCalls = 0;
const MAX_BRANCH_CALLS = 4000; // safety net: stop even if a branch barely shrinks

function setup() {
  const canvas = createCanvas(500, 500);
  canvas.parent("sketch");
}

function draw() {
  background(15, 18, 26);
  strokeWeight(2);
  stroke(146, 209, 255);

  // The same sin() idea as Simple Waves in Session 04, applied to an
  // angle instead of a height, so the tree sways instead of standing
  // still.
  const angle = radians(25 + sin(frameCount * 0.02) * 10);
  branchCalls = 0;

  push();
  translate(width / 2, height);
  branch(baseLength, angle);
  pop();
}

// Draws one branch, then - if it is still long enough - draws two
// smaller branches from its tip. Each of those branches does the same
// thing again, which is why one small rule produces a whole tree.
function branch(length, angle) {
  branchCalls++;
  if (branchCalls > MAX_BRANCH_CALLS) return;

  line(0, 0, 0, -length);
  translate(0, -length);

  // Base case: once a branch is this short, stop branching further.
  if (length > 8) {
    push();
    rotate(angle);
    branch(length * 0.67, angle);
    pop();

    push();
    rotate(-angle);
    branch(length * 0.67, angle);
    pop();
  }
}

// The same click-to-regenerate idea as Shapes Function in Session 05,
// just changing where the tree starts instead of what it draws.
function mousePressed() {
  baseLength = random(70, 150);
}
