const r = require("raylib");
const w = require("./window");

let groundX = 0.1 * w.WIDTH;
let velocity = 1;

function isOutOfBound() {
  return groundX < 0 || groundX > w.WIDTH
}

function newVelocity() {
  return isOutOfBound ? - velocity : velocity;
}
function update() {
  velocity = newVelocity();
  // console.log(velocity);
  groundX = groundX - velocity;
}

function circleDetails() {
  return {
    x: groundX,
    y: w.HEIGHT + 0.2 * w.HEIGHT,
    radius: 0.2 * w.WIDTH,
  };
}

function nextCircleX(x, n, radius) {
  return x + n * radius;
}

function draw(n = 0) {
  if (n === 6) {
    groundX = groundX - 1;
    console.log(groundX);
    return;
  }

  const groundCircle = circleDetails();
  groundCircle.x = nextCircleX(groundCircle.x, n, groundCircle.radius);

  r.DrawCircleSector(groundCircle, groundCircle.radius, 90, 270, 100, r.GREEN);

  draw(++n);
}

module.exports = {
  draw,
  update
};

