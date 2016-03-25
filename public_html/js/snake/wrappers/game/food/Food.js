/* global TILE_DIMENSION, COLOR_FOOD */

function Food(location, type) {
    this.location = location;
    this.type = type;

    /**
     * Draws the food.
     */
    this.draw = function () {
        var base = this.getLocation().getPoint();

        // 
        var sizeMin = 8;
        var radius = (TILE_DIMENSION / 2) - sizeMin;
        var x = base.getX() + radius + sizeMin; 
        var y = base.getY() + radius + sizeMin;

        var startAngle = 0;
        var endAngle = 2 * Math.PI;

        get2D().beginPath(); 
        get2D().fillStyle = COLOR_FOOD;
        get2D().arc(x, y, radius, startAngle, endAngle);
        get2D().fill();
        get2D().closePath();
    };

    /**
     * Eats the food
     * @returns {undefined}
     */
    this.eat = function () {
    }

    /**
     * Gets the location of the food
     * @returns {Tile}
     */
    this.getLocation = function () {
        return this.location;
    };
}