const b = require("./playerBall");
const g = require("./playGround.js");
const w = require("./window.js");
const r = require("raylib");

function isInObstXBound(n) {
    const insideLeftSide = b.ball.x + b.ball.radius >= g.allObstInfo[n].x;
    const insideRightSide = b.ball.x - b.ball.radius <= g.allObstInfo[n].x + g.allObstInfo[n].width;
    return insideLeftSide && insideRightSide;
}

function isInObstYBound(n) {
    const insideTopSide = b.ball.y + b.ball.radius >= g.allObstInfo[n].y;
    const insideBottomSide = b.ball.y - b.ball.radius <= g.allObstInfo[n].y + g.allObstInfo[n].height;
    return insideTopSide && insideBottomSide;
}

function isBallOverlapsObst(n = 1) {
    while (n <= g.obst.totalObst) {
        if (isInObstXBound(n) && isInObstYBound(n)) {
            return true;
        }
        n++;
    }
    return false;
}

function isBallOutOfBound() {
    const touchUp = b.ball.y - b.ball.radius <= 0;
    const touchDown = b.ball.y + b.ball.radius >= w.HEIGHT;
    const touchLeft = b.ball.x - b.ball.radius <= 0;
    const touchRight = b.ball.x + b.ball.radius >= w.WIDTH;
    return touchUp || touchDown || touchLeft || touchRight;
}

function isGameOver() {
    return isBallOutOfBound() || isBallOverlapsObst();
}

function resetGame() {
    b.ball.x = 0.3 * w.WIDTH;
    b.ball.y = 0.10 * w.HEIGHT;
    b.ball.radius = 30;
    b.ball.velocity = 20;

    g.obst.x = w.WIDTH;
    g.obst.y = 0;
    g.obst.width = 300;
    g.obst.height = 60;
    g.obst.speed = 5;
}

function endScreen() {
    if (r.IsKeyPressed(r.KEY_Q)) {
        r.CloseWindow();
    }
    if (r.IsKeyPressed(r.KEY_R)) {
        return resetGame();
    }
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);
    r.DrawText("Game Over", 0.2 * w.WIDTH, 0.2 * w.HEIGHT, 200, r.GRAY);
    r.DrawText("'Press Q' to quit", 0.2 * w.WIDTH, 0.6 * w.HEIGHT, 100, r.GRAY);
    r.DrawText("'Press R' to restart", 0.2 * w.WIDTH, 0.8 * w.HEIGHT, 100, r.GRAY);
    r.EndDrawing();
    endScreen();
}

module.exports = {
    endScreen, isGameOver
};
