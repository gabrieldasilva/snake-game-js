// Context
var canvas, ctx;

// Game world
var gridSize = 20; // 20x20 = 400
var tileSize = 20;
var nextX = 0;
var nextY = 0;

// Sanake
var defaultTailSize = 3;
var tailSize = defaultTailSize;
var snakeTrail = [];
var snakeX = 10;
var snakeY = 10;

// Apple
var appleX = 15;
var appleY = 15;

// Draw everything
const draw = function () {
    snakeX += nextX;
    snakeY += nextY;

    // snake over game world?
    if (snakeX < 0) {
        snakeX = gridSize - 1;
    }
    if (snakeX > gridSize - 1) {
        snakeX = 0;
    }
    if (snakeY < 0) {
        snakeY = gridSize - 1;
    }
    if (snakeY > gridSize - 1) {
        snakeY = 0;
    }

    // snake bite the apple?
    if (snakeX === appleX && snakeY === appleY) {
        tailSize++;
        // calculate the new apple position
        appleX = Math.floor(Math.random() * gridSize);
        appleY = Math.floor(Math.random() * gridSize);
    }

    // (re)paint background
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // paint the snake;
    ctx.fillStyle = "green";
    for (var i = 0; i < snakeTrail.length; i++) {
        ctx.fillRect(
            snakeTrail[i].x * tileSize,
            snakeTrail[i].y * tileSize,
            tileSize,
            tileSize
        );

        // snake bite it's tail
        if (snakeTrail[i].x === snakeX && snakeTrail[i].y ===snakeY) {
            tailSize = defaultTailSize;
        }
    }

    // paint the apple
    ctx.fillStyle = "red";
    ctx.fillRect(appleX * tileSize, appleY * tileSize, tileSize, tileSize);

    // set snake trail
    snakeTrail.push(
        {
            x: snakeX,
            y: snakeY
        }
    );

    while (snakeTrail.length > tailSize) {
        snakeTrail.shift();
    }
};

// Input
const keyDownEvent = function (event) {
    switch (event.key) {
        case "ArrowLeft":
            nextX = -1;
            nextY = 0;
            break;
        case "ArrowUp":
            nextX = 0;
            nextY = -1;
            break;
        case "ArrowRight":
            nextX = 1;
            nextY = 0;
            break;
        case "ArrowDown":
            nextX = 0;
            nextY = 1;
            break;
    }
};

window.onload = function () {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    // Bind key down event on the document root
    document.addEventListener('keydown', keyDownEvent);

    // Render X times per second
    var x = 8;
    setInterval(draw, 1000 / x);
};
