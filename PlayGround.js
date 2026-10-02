const r = require("raylib");
const w = require("./window");

const totalObst = 4;

const obstR = {
  x: w.WIDTH,
  y: 0,
  width: 70,
  height: 30,
  speed: 4,
};

const allObstInfo = {};

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
  const width = obstR.width;
  const height = obstR.height;

  r.DrawRectangleGradientH(x, y, width, height, r.RED, r.BLUE);
  allObstInfo[obstCount] = { x, y, width, height };

  obstCount++;
  drawObstacleR(n, obstCount);
}

function update() {
  obstR.x = hasCrossedLeftBound() ? 1.5 * w.WIDTH : obstR.x - obstR.speed;
}

function draw() {
  drawObstacleR(totalObst);
}

module.exports = {
  draw,
  update,
  allObstInfo,
  obstR,
  totalObst
};
