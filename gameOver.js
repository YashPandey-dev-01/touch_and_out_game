const s = require("./sketch");
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

function isBalltouchedObst(n = 1) {
    while (n <= g.totalObst) {
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
    return isBallOutOfBound() || isBalltouchedObst();
}

function resetGame() {
    b.ball.x = 0.3 * w.WIDTH;
    b.ball.y = 0.10 * w.HEIGHT;
    b.ball.radius = 30;
    b.ball.velocity = 100;

    g.obstR.x = w.WIDTH;
    g.obstR.y = 0;
    g.obstR.width = 70;
    g.obstR.height = 60;
    g.obstR.speed = 4;
}

function endScreen() {
    if (r.IsKeyPressed(r.KEY_Q)) {
        r.CloseWindow();
    }
    if (r.IsKeyPressed(r.KEY_R)) {
        return resetGame();
    }
    r.BeginDrawing();
    r.ClearBackground(r.RED);
    r.DrawText("hello", 100, 101, 100, r.BLACK);
    r.EndDrawing();
    endScreen();
}

module.exports = {
    endScreen, isGameOver
};
