/* global TILE_DIMENSION, get2D, Direction */

/**
 * A part of the body of a snakes
 * @param {Tile} tile
 * @returns {SnakePart}
 */
function SnakePart(tile) {
    this.location = tile;

    /**
     * Draws the snake part in green
     * @param {String} isHead true if it's the head of the snake, false if other part
     */
    this.draw = function (isHead, color) {
        this.location.draw(color == null ? isHead ? 'Red' : "black" : color);
    };


    /**
     * Draws the eyes of the snake
     * @param {Direction} direction
     */
    this.drawEyes = function (direction) {
        var x = this.getLocation().getX(), y = this.getLocation().getY();
        var base = new Point(x * TILE_DIMENSION, y * TILE_DIMENSION);
        var split = TILE_DIMENSION / 8;

        var topLeft = new Point(base.getX() + split * 2, base.getY() + split * 2);
        var topRight = new Point(base.getX() + split * 6, base.getY() + split * 2);
        var bottomLeft = new Point(base.getX() + split * 2, base.getY() + split * 6);
        var bottomRight = new Point(base.getX() + split * 6, base.getY() + split * 6);

        var points = [];
        switch (direction) {
            case Direction.EAST:
                points = [topRight, bottomRight];
                break;
            case Direction.NORTH:
                points = [topRight, topLeft];
                break;
            case Direction.WEST:
                points = [topLeft, bottomLeft];
                break;
            case Direction.SOUTH:
                points = [bottomLeft, bottomRight];
                break;
        }

        var innerSize = 4, outerSize = 10;
        for (var i = 0; i < points.length; i++) {
            var point = points[i];
            get2D().fillStyle = "yellow";
            get2D().fillRect(point.getX() - outerSize / 2, point.getY() - outerSize / 2, outerSize, outerSize);
            get2D().fillStyle = "black";
            get2D().fillRect(point.getX() - innerSize / 2, point.getY() - innerSize / 2, innerSize, innerSize);
        }
    };

    /**
     * Gets the location of the snake part
     * @returns {Tile}
     */
    this.getLocation = function () {
        return this.location;
    };
}