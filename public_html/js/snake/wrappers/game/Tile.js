/**
 * A tile existing in the world
 * @param {int} x
 * @param {int} y
 * @returns {Tile}
 */
function Tile(x, y) {
    this.x = x;
    this.y = y;

    /**
     * @param {Tile} tile
     * @returns {Boolean}
     */
    this.equals = function (tile) {
        return this.x === tile.x && this.y === tile.y;
    };

    /**
     * Checks if this tile is a neighbour on the grid of the given tile
     * @param {Tile} tile
     * @returns {Boolean}
     */
    this.isNeighbour = function (tile) {
        if (this.getX() == tile.getX()) {
            var verticalDistance = this.getY() - tile.getY();
            return verticalDistance == 1 ^ verticalDistance == -1;
        }
        if (this.getY() == tile.getY()) {
            var horizontalDistance = this.getX() - tile.getX();
            return horizontalDistance == 1 ^ horizontalDistance == -1;
        }
        return false;
    };

    /**
     * Draws the tile within the grid with the given color
     * 
     * @param {String} color
     */
    this.draw = function (color) {
        var base = this.getPoint();
        
        get2D().fillStyle = color;
        get2D().fillRect(base.getX() + 2, base.getY() + 2, TILE_DIMENSION - 4, TILE_DIMENSION - 4);
    };

    /**
     * Gets the x coordinate
     * @returns {int} x
     */
    this.getX = function () {
        return this.x;
    };

    /**
     * Gets the y coordinate
     * @returns {int} y
     */
    this.getY = function () {
        return this.y;
    };
    
    /**
     * Calculates the left upper point of this tile.
     * @returns {Point} left upper point
     */
    this.getPoint = function () {
        return new Point(x * TILE_DIMENSION, y * TILE_DIMENSION);
    }
}
