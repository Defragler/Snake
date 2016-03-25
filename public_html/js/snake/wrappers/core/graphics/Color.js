/**
 * A color with or without alpha
 * @param {type} red range (0-255)
 * @param {type} green range (0-255)
 * @param {type} blue range (0-255)
 * @param {type} alpha range (0.0-1.0)
 * @returns {Color}
 */
function Color(red, green, blue, alpha) {
    this.red = red;
    this.green = green;
    this.blue = blue;
    this.alpha = alpha || null;

    /**
     * Gets the red color range
     * @returns {int} red
     */
    this.getRed = function () {
        return this.red;
    }

    /**
     * Gets the green color range
     * @returns {int} green
     */
    this.getGreen = function () {
        return this.green;
    }

    /**
     * Gets the blue color range
     * @returns {int} blue
     */
    this.getBlue = function () {
        return this.blue;
    }

    /**
     * Gets the alpha
     * @returns {double} alpha 
     */
    this.getAlpha = function () {
        return this.alpha;
    }

    /**
     * Gets the color as an RGBA(r,g,b,a) string
     * @returns {String}
     */
    this.getRGBA = function () {
        var builder = "rgba(" + this.getRed() + ", " + this.getGreen() + ", " + this.getBlue();

        if (this.getAlpha() != null) {
            builder += ", " + this.getAlpha();
        }

        builder += ")";
        return builder;
    }
}