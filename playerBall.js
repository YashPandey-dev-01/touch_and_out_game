const w = require("./window.js");
const r = require("raylib");
const g = require("./playGround.js");

const ball = {
    x: 0.3 * w.WIDTH,
    y: 0.10 * w.HEIGHT,
    radius: 30,
    velocity: 100
};

function isInObstXBound() {
    const insideLeftSide = ball.x + ball.radius >= g.allObstInfo["1"].x;
    const insideRightSide = ball.x - ball.radius <= g.allObstInfo["1"].x + g.allObstInfo["1"].width;
    return insideLeftSide && insideRightSide;
}

function isInObstYBound() {
    const insideTopSide = ball.y + ball.radius >= g.allObstInfo["1"].y;
    const insideBottomSide = ball.y - ball.radius <= g.allObstInfo["1"].y + g.allObstInfo["1"].height;
    return insideTopSide && insideBottomSide;
}

function isBalltouchedObst() {
    return isInObstXBound() && isInObstYBound();
}

function isBallOutOfBound() {
    const touchUp = ball.y - ball.radius <= 0;
    const touchDown = ball.y + ball.radius >= w.HEIGHT;
    const touchLeft = ball.x - ball.radius <= 0;
    const touchRight = ball.x + ball.radius >= w.WIDTH;
    return touchUp || touchDown || touchLeft || touchRight;
}

function updateBallPos() {
    ball.y = r.IsKeyPressed(r.KEY_UP) ? ball.y - ball.velocity : ball.y;
    ball.y = r.IsKeyPressed(r.KEY_DOWN) ? ball.y + ball.velocity : ball.y;
    ball.x = r.IsKeyPressed(r.KEY_LEFT) ? ball.x - ball.velocity : ball.x;
    ball.x = r.IsKeyPressed(r.KEY_RIGHT) ? ball.x + ball.velocity : ball.x;
    return ball;
}

function update() {
    updateBallPos();
    ball.radius = isBallOutOfBound() ? 400 : ball.radius;
    ball.radius = isBalltouchedObst() ? 400 : ball.radius;
}

function draw() {
    r.DrawCircleGradient(ball.x, ball.y, ball.radius, r.VIOLET, r.BLUE);
}

module.exports = {
    draw,
    update
};