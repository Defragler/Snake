/**
 * A particle explosion
 * 
 * Every 15 degrees a particle will be launched from the center of the tile, based on the steps the particles will move on with the angle they have.
 * 
 * @param {Tile} tile The tile from where to start the explosion
 * @param {Color} color the color of the explosion
 * @param {boolean} swirl if true
 * @param {boolean} fade if true graduetely decreases the alpha of the chosen color
 * @returns {Explosion} a graphic explosion
 */
function Explosion(tile, color, swirl, fade) {
    this.tile = tile;
    this.color = color;
    this.swirl = swirl || false;
    this.fade = fade || false;

    // particle size
    this.lineWidth = 3;
    this.lineLength = 4;

    // particle direction and location
    this.angles = [];
    this.points = [];

    // step count and max steps of this particle explosion
    this.step = 0;
    this.maxSteps = 24;

    this.start = function () {
        var basePoint = this.tile.getPoint();
        var centerPoint = new Point(basePoint.getX() + TILE_DIMENSION / 2, basePoint.getY() + TILE_DIMENSION / 2);


        for (var i = 0; i < 360 / 15; i++) {
            this.angles[i] = i * 15;
        }

        //init point array start from center
        for (var i = 0; i < this.angles.length; i++) {
            this.points.push(centerPoint);
        }
    }

    this.draw = function () {

        for (var i = 0; i < this.angles.length; i++) {
            //calculate line based on angle
            var pBegin = this.points[i];
            var angle = this.angles[i] * Math.PI / 180;
            var sin = Math.sin(angle);
            var cos = Math.cos(angle);
            var endPoint = new Point(pBegin.getX() + this.lineLength * (sin), pBegin.getY() + this.lineLength * (cos));

            //calculate alpha and apply to color
            var alpha = 1.0 - (this.step / this.maxSteps);
            var tempColor = this.color;
            tempColor.alpha = alpha;

            // apply stroke color and line width
            get2D().strokeStyle = tempColor.getRGBA();
            get2D().lineWidth = "" + this.lineWidth;

            //draw line
            get2D().beginPath();
            get2D().moveTo(pBegin.getX(), pBegin.getY());
            get2D().lineTo(endPoint.getX(), endPoint.getY());
            get2D().stroke();
            get2D().closePath();

            //Set beginpoint to endpoint
            this.points[i] = endPoint;
        }

        if (this.swirl && this.step % 2) {
            this.angles.unshift(this.angles.pop());
        }

        this.step++;
        if (this.step > this.maxSteps) {
            explosions.shift();
        }
    }
}