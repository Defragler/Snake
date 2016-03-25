/* global GameStates, GRID_HEIGHT, TILE_DIMENSION, players, gameState, difficulty, buttons, COLOR_HIGHLIGHT, GRID_WIDTH, SNAKE_COLORS */
var context2d;

function getCanvas() {
    return document.getElementById("mainCanvas");
}

/**
 * Gets the 2D rendering context of the canvas
 * @returns {context2d}
 */
function get2D() {
    if (context2d == null) {
        context2d = getCanvas().getContext('2d');
    }
    return context2d;
}

/**
 * Draws the game
 */
function drawGame() {
    drawGamePanel();
    switch (gameState) {
        case GameStates.INIT:
            get2D().fillStyle = "White";
            get2D().font = "30px Montserrat";
            get2D().fillText("Initializing", (GRID_WIDTH * TILE_DIMENSION) / 2, (GRID_HEIGHT * TILE_DIMENSION) / 2 + 25);
            break;

        case GameStates.INIT_GAME:
            break;

        case GameStates.GAME:
            drawEffects();
            for (var i = 0; i < players.length; i++) {
                players[i].draw(SNAKE_COLORS[i]);
            }
            food.draw();

            break;

        case GameStates.MENU:
            drawMenu();
            break;

        case GameStates.RESULTS:
            // draw last game tick
            drawEffects();
            for (var i = 0; i < players.length; i++) {
                players[i].draw(SNAKE_COLORS[i]);
            }
            food.draw();

            // draw results
            get2D().fillStyle = "White";
            get2D().font = "20px clean";
            var mainText = players[0].score;
            get2D().fillText(mainText, (GRID_WIDTH * TILE_DIMENSION) / 2 - getTextWidth(mainText) / 2, (GRID_HEIGHT * TILE_DIMENSION) / 2 + 25);

            // draw input
            var scoreText = scoreName.length == 0 ? "enter your name..." : scoreName;
            get2D().fillText(scoreText, (GRID_WIDTH * TILE_DIMENSION) / 2 - getTextWidth(scoreText) / 2, (GRID_HEIGHT * TILE_DIMENSION) / 2 + 55);
            break;

        default:
            break;
    }
    drawBar();
}

function drawBar() {
    var y = GRID_HEIGHT * TILE_DIMENSION;
    get2D().fillStyle = COLOR_HIGHLIGHT;
    get2D().fillRect(0, y, GRID_WIDTH * TILE_DIMENSION, BAR_HEIGHT);


    if (gameState == GameStates.GAME) {
        get2D().fillStyle = "White";
        get2D().font = "30px clean";
        get2D().fillText("Score " + players[0].score, 1, y + 25);
        get2D().fillText("Hit escape to return to the menu", 1, y + 55);
    }
}


/**
 * Draws the panel of the game ( background)
 */
function drawGamePanel() {
    get2D().fillStyle = COLOR_CONTENT;
    get2D().fillRect(0, 0, GRID_WIDTH * TILE_DIMENSION, GRID_HEIGHT * TILE_DIMENSION);
}

function drawMenu() {
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].draw();
    }

    // draw info pane
    var lines = [];
    lines.push(difficulty.name + " " + gameMode);

    // draw highscores
    if (difficulty != null && difficulty.getScores().length > 0) {
        lines.push("");
        lines.push("Highscores");
        for (var i = 0; i < difficulty.getScores().length; i++) {
            if (difficulty.getScores()[i].getGameMode() == gameMode) {
                lines.push(difficulty.getScores()[i].getScore() + "  -  " + difficulty.getScores()[i].getName());
            }
        }
    }

    drawInfoPane(lines);
}

/**
 * Draws the info pane with the given lines
 * @param {String[]} lines
 */
function drawInfoPane(lines) {
    var x = 250, y = 50, width = 700, height = 500;

    get2D().fillStyle = COLOR_HIGHLIGHT;
    get2D().fillRect(x, y, width, height);
    get2D().strokeStyle = "black";
    get2D().lineWidth = 2;
    get2D().beginPath();
    get2D().rect(x, y, width, height);
    get2D().closePath();
    get2D().stroke();
    get2D().fillStyle = "black";

    for (var i = 0; i < lines.length; i++) {
        get2D().fillText(lines[i], x + 25, y += 30);
    }
}

/**
 * 
 * @param {String} text
 * @returns {int} width of given text in pixels
 */
function getTextWidth(text) {
    return get2D().measureText(text).width;
}