const w = require("./window.js");
const r = require("raylib");

const ball = {
    x: 0.3 * w.WIDTH,
    y: 0.10 * w.HEIGHT,
    radius: 30,
    velocity: 100
};

function updateBallPos() {
    ball.y = r.IsKeyPressed(r.KEY_UP) ? ball.y - ball.velocity : ball.y;
    ball.y = r.IsKeyPressed(r.KEY_DOWN) ? ball.y + ball.velocity : ball.y;
    ball.x = r.IsKeyPressed(r.KEY_LEFT) ? ball.x - ball.velocity : ball.x;
    ball.x = r.IsKeyPressed(r.KEY_RIGHT) ? ball.x + ball.velocity : ball.x;
    return ball;
}

function update() {
    updateBallPos();
}

function draw() {
    r.DrawCircleGradient(ball.x, ball.y, ball.radius, r.VIOLET, r.BLUE);
}

module.exports = {
    draw,
    update,
    ball
};