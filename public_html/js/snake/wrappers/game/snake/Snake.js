/**
 * A snake
 * @param {Tile} tile description
 * @returns {Snake}
 */
function Snake(tile) {
    this.parts = [];
    this.start = tile;
    this.direction = Direction.SOUTH;
    this.lastDirection = this.direction;
    this.score = 0;

    /**
     * Initializes the snake
     */
    this.init = function () {
        var tile = this.start;
        var part = new SnakePart(tile);
        this.parts.push(part);
    };

    /**
     * Makes the snake eat     
     */
    this.eat = function () {
        this.parts.push(this.parts[this.parts.length - 1]);
        this.score++;
    };

    /**
     * Moves the snake
     */
    this.move = function () {
        if (this.getParts().length > 0 && this.direction !== null) {
            var x = this.getParts()[0].getLocation().getX();
            var y = this.getParts()[0].getLocation().getY();

            // Prevent the user from killing himself by going into the opposing direction of his last set direction
            if (this.lastDirection != null && getOpposingDirection(this.lastDirection) == this.direction) {
                this.direction = this.lastDirection;
            }

            //set coordinates
            switch (this.direction) {
                case Direction.NORTH:
                    if (y-- <= 0) {
                        if (gameMode != GameModes.CLASSIC) {
                            y = GRID_HEIGHT - 1;
                        } else {
                            finishGame();
                        }
                    }
                    break;
                case Direction.SOUTH:
                    if (y++ >= GRID_HEIGHT - 1) {
                        if (gameMode != GameModes.CLASSIC) {
                            y = 0;
                        } else {
                            finishGame();
                        }
                    }
                    break;
                case Direction.EAST:
                    if (x++ >= GRID_WIDTH - 1) {
                        if (gameMode != GameModes.CLASSIC) {
                            x = 0;
                        } else {
                            finishGame();
                        }
                    }
                    break;
                case Direction.WEST:
                    if (x-- <= 0) {
                        if (gameMode != GameModes.CLASSIC) {
                            x = GRID_WIDTH - 1;
                        } else {
                            finishGame();
                        }
                    }
                    break;
            }

            var tile = new Tile(x, y);
            var part = new SnakePart(tile);
            this.parts.unshift(part);
            this.parts.pop();

            this.lastDirection = this.direction;

            if (this.getTiles()[0].equals(this.getTiles()[1])) {
                finishGame();
            }

        }
    };

    /**
     * Draws the snake with all it's parts.
     */
    this.draw = function (color) {

        for (var i = 1; i < this.getParts().length; i++) {
            var cur = this.getParts()[i];
            cur.draw(false, i % 4 == 0 ? "Brown" : i % 3 == 0 ? "Black" : i % 2 == 0 ? "Black" : "Brown");
        }

        //draw line in through snake parts
        get2D().beginPath();
        for (var i = 0; i < this.getParts().length; i++) {
            if (i < this.getParts().length - 1) {
                var cur = this.getParts()[i];
                var nex = this.getParts()[i + 1];
                if (cur.getLocation().isNeighbour(nex.getLocation())) {
                    var curX = cur.getLocation().getX() * TILE_DIMENSION + TILE_DIMENSION / 2;
                    var curY = cur.getLocation().getY() * TILE_DIMENSION + TILE_DIMENSION / 2;
                    var nexX = nex.getLocation().getX() * TILE_DIMENSION + TILE_DIMENSION / 2;
                    var nexY = nex.getLocation().getY() * TILE_DIMENSION + TILE_DIMENSION / 2;

                    get2D().moveTo(curX, curY);
                    get2D().lineTo(nexX, nexY);
                }
            }
        }
        get2D().strokeStyle = "Grey";
        get2D().lineWidth = "5";
        get2D().stroke();
        get2D().closePath();
        this.getParts()[0].draw(true, color);
        this.getParts()[0].drawEyes(this.lastDirection);
    };

    /**
     * Gets the parts of the snake
     * @returns {Array} the snakeparts of this snake
     */
    this.getParts = function () {
        return this.parts;
    };

    /**
     * 
     * @returns {Array} the locations of the snake parts
     */
    this.getTiles = function () {
        var tiles = [];
        for (var i = 0; i < this.getParts().length; i++) {
            tiles.push(this.getParts()[i].getLocation());
        }
        return tiles;
    };
    /**
     * Checks whether the given tile is located on one of the snake parts.
     * @param {Tile} tile
     * @returns {Boolean} true if one of the snake parts' location equals the tile
     */
    this.contains = function (tile) {
        for (var i = 0; i < this.getParts().length; i++) {
            if (this.getParts()[i].getLocation().equals(tile)) {
                return true;
            }
        }
        return false;
    };

    /**
     * Checks if the front of this snake collides with any of the given tiles.
     * @param {array} tiles
     * @returns {Boolean} true if it collides with one of these tiles
     */
    this.collides = function (tiles) {
        var head = this.getParts()[0].getLocation();
        for (var i = 0; i < tiles.length; i++) {
            if (tiles[i].equals(head)) {
                return true;
            }
        }
        return false;
    };

    /**
     * Checks if the given snake matches this snake by checking the head location.
     * @param {Snake} snake
     * @returns {boolean} true if given snake matches this snake.
     */
    this.equals = function (snake) {
        return this.getTiles()[0].equals(snake.getTiles()[0]);
    }
}