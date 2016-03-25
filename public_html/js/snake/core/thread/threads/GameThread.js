function getGameThread() {
    var gameThread = new Thread(1000 / difficulty.getGameTick(), ThreadNames.GAME);

    gameThread.run = function () {
        // move the players, they have to move first
        for (var i = 0; i < players.length; i++) {
            players[i].move();
        }

        // check collisions with either the snakes or food
        for (var i = 0; i < players.length; i++) {
            //check snake collisions
            if (checkSnakeCollision(i)) {
                var explosion = new Explosion(players[i].getParts()[0].getLocation(), new Color(255, 255, 255));
                explosion.start();
                explosion.lineWidth = 6;
                addEffect(explosion);
                finishGame();
                return;
            }
            // check food collisions
            if (food !== null) {
                if (checkFoodCollision(i)) {
                    players[i].eat();

                    var explosion = new Explosion(food.getLocation(), new Color(0, 255, 0), true, true);
                    explosion.start();
                    addEffect(explosion);
                    addSound(SOUND_FOOD_EAT);

                    food = null;
                    createFood();
                }
            }
        }

        if (gameMode == GameModes.VARIABLE) {
            if (random(0, 10) == 0) {
                changeGameDifficulty();
                console.log("Changed difficulty: " + difficulty.getName());
            }
        }

    };

    return gameThread;
}


function changeGameDifficulty() {
    difficulty = getRandomDifficulty();
    updateThread(ThreadNames.GAME, 1000 / difficulty.getGameTick());
    updateThread(ThreadNames.AUDIO, 1000 / difficulty.getGameTick());
    restartThreads();
}


function getRandomDifficulty() {
    var count = random(0, 3);
    switch (count) {
        case 0:
            return Difficulties.EASY;
            break;
        case 1:
            return Difficulties.MEDIUM;
            break;
        case 2:
            return Difficulties.HARD;
            break;
        case 3:
            return Difficulties.IMPOSSIBLE;
            break;
    }
}


/**
 * Initializes a game
 * @returns {undefined}
 */
function initGame() {
    initPlayers();
    food = null;
    createFood();

    for (var x = 0; x < 25; x += random(4, 6)) {
        for (var y = 0; y < 16; y += random(4, 6)) {
            var tempExplosion = new Explosion(new Tile(x, y), new Color(0, 0, 0), false, true);
            tempExplosion.lineLength = 15;
            tempExplosion.lineWidth = 5;
            tempExplosion.fade = true;
            tempExplosion.start();
            addEffect(tempExplosion);
        }
    }

    //Synch audio thread to game thread so audio plays after a gametick happens
    updateThread(ThreadNames.AUDIO, 1000 / difficulty.getGameTick());

    // add background music
    var soundBackground = SOUND_BACKGROUND;
    soundBackground.loop = true;
    addSound(soundBackground);

    //start game thread
    startThread(ThreadNames.GAME);
    updateThread(ThreadNames.GAME, 1000 / difficulty.getGameTick());
    gameState = GameStates.GAME;
}

/**
 * Initializes all the players
 */
function initPlayers() {
    players = [];
    for (var i = 0; i < PLAYER_COUNT; i++) {
        players.push(new Snake(new Tile(1 + i * 2, 1 + i * 2)));
        players[i].init();
        for (var j = 0; j < 2; j++) {
            players[i].eat();
        }
        players[i].score = 0;
    }
}

/**
 * Checks if any of the active players contains the given tile.
 * 
 * @param {Tile} tile the tile to check
 * @returns {Boolean} True if the any of the players contains the given tile
 */
function playersContain(tile) {
    var contains = false;
    for (var i = 0; i < players.length; i++) {
        if (players[i].contains(tile)) {
            contains = true;
        }
    }
    return contains;
}

/**
 * Checks if the snake collides with one if it's body parts or other snakes.
 * 
 * @param {int} snakeIndex the index of the snake that has to be checked
 * @returns {Boolean} true if the snake collides with itself
 */
function checkSnakeCollision(snakeIndex) {
    //check collisions with other players
    /*for (var p = 0; p < players.length; p++) {
     if (p !== snakeIndex) {
     if (players[snakeIndex].collides(players[p].getTiles())) {
     return true;
     }
     }
     }*/

    //check self collision
    for (var i = 1; i < players[snakeIndex].getParts().length; i++) {
        if (players[snakeIndex].getParts()[i].getLocation().equals(players[snakeIndex].getParts()[0].getLocation())) {
            return true;
        }
    }
    return false;
}

/**
 * Creates a piece of food on a random location on the game board. 
 * 
 * The piece of food will never be located on a part of a snake.
 */
function createFood() {
    if (food === null) {
        var tile = new Tile(random(0, GRID_WIDTH - 1), random(0, GRID_HEIGHT - 1));
        while (playersContain(tile)) {
            tile = new Tile(random(0, GRID_WIDTH - 1), random(0, GRID_HEIGHT - 1));
        }
        food = new Food(tile);
    }
}

/**
 * Ends a game session, stops the game interval and sets the gameState to RESULTS.
 */
function finishGame() {
    scoreName = "";
    removeSound(SOUND_BACKGROUND);
    stopThread(ThreadNames.GAME);
    gameState = GameStates.RESULTS;
    console.log("finishing");
}



/**
 * Checks if the given snake is able to eat a piece of food.
 * 
 * @param {int} snakeIndex
 * @returns {Boolean} true if the head of the snake is ontop of a piece of food
 */
function checkFoodCollision(snakeIndex) {
    if (food !== null) {
        var foodLocation = food.getLocation();
        return players[snakeIndex].getParts()[0].getLocation().equals(foodLocation);
    }
    return false;
}