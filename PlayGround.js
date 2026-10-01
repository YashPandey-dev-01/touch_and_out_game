const r = require("raylib");
const w = require("./window");

const obstR = {
  x: w.WIDTH,
  y: 0,
  width: 70,
  height: 60,
  speed: 4
};

function obstDimention(obstCount) {
  const x = obstR.x - 300 * obstCount;
  const y = obstR.y + obstR.height + 200 * obstCount;
  return {
    x,
    y
  };
}

function hasCrossedLeftBound() {
  return obstR.x + obstR.width < 0
}

function drawObstacleR(n, obstCount = 1) {
  if (n < obstCount) {
    return;
  }
  const newObstDimention = obstDimention(obstCount);
  const x = newObstDimention.x;
  const y = newObstDimention.y;
  r.DrawRectangleGradientH(x, y, obstR.width, obstR.height, r.RED, r.BLUE);
  obstCount++;
  drawObstacleR(n, obstCount);
}

function update() {
  obstR.x = hasCrossedLeftBound() ? 1.5 * w.WIDTH : obstR.x - obstR.speed;
}

function draw() {
  drawObstacleR(3);
}

module.exports = {
  draw,
  update
};
