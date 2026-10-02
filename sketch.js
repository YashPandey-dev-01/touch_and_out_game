const r = require("raylib");
const w = require("./window.js");
const g = require("./playGround.js");
const b = require("./playerBall.js");

function running() {
  return !r.WindowShouldClose();
}

function setup() {
  r.SetTraceLogLevel(r.LOG_NONE);
  r.InitWindow(w.WIDTH, w.HEIGHT, w.TITLE);
  r.SetTargetFPS(w.FPS);
}

function update() {
  b.update();
  g.update();
}

function draw() {
  r.BeginDrawing();
  r.ClearBackground(r.WHITE);

  b.draw();
  g.draw();

  r.EndDrawing();
}

function teardown() {
  r.CloseWindow();
}

module.exports = {
  running,
  setup,
  update,
  draw,
  teardown,
};
