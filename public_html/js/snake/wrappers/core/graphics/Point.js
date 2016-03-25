/**
 * A point on the canvas of the game.
 * @param {int} x X coordinate
 * @param {int} y Y coordinate
 * @returns {Point} a point on the canvas of the game.
 */
function Point(x, y) {
    this.x = x;
    this.y = y;


    /**
     * Gets the X coordinate of the point.
     * @returns {int} the x coordinate
     */
    this.getX = function () {
        return this.x;
    }

    /**
     * Gets the Y coordinate of the point.
     * @returns {int} the x coordnate
     */
    this.getY = function () {
        return this.y;
    }

}