const r = require("raylib");
const w = require("./window");

const obst = {
  x: w.WIDTH,
  y: 0,
  width: 300,
  height: 60,
  speed: 5,
  totalObst: 10,
  mainObstFisrt: true
};

const allObstInfo = {};

function obstDimention(obstCount) {
  const value1 = obst.x - 200 * obstCount;
  const value2 = obst.x + 200 * obstCount;

  const x = obst.mainObstFisrt ? value2 : value1;
  const y = obst.y + 130 * obstCount;

  obst.mainObstFisrt = !obst.mainObstFisrt;
  return {
    x,
    y
  };
}

function hasCrossedLeftBound() {
  return obst.x + 100 * obst.totalObst < 0
}

function drawObst(n, obstCount = 1) {
  if (n < obstCount) {
    return;
  }

  const newObstDimention = obstDimention(obstCount);

  const x = newObstDimention.x;
  const y = newObstDimention.y;
  const width = obst.width;
  const height = obst.height;

  r.DrawRectangleGradientH(x, y, width, height, r.RED, r.BLUE);
  allObstInfo[obstCount] = { x, y, width, height };

  obstCount++;
  drawObst(n, obstCount);
}

function update() {
  obst.x = hasCrossedLeftBound() ? 1.3 * w.WIDTH : obst.x - obst.speed;
}

function draw() {
  drawObst(obst.totalObst);
}

module.exports = {
  draw,
  update,
  allObstInfo,
  obst,
};
