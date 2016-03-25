/* global get2D, COLOR_BUTTON_HIGHLIGHT, COLOR_HIGHLIGHT, menuState */

function Button(x, y, width, height, text, workingMenuState) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.text = text;
    this.workingMenuState = workingMenuState;

    this.selected = false;

    /**
     * Draws the food in red.
     */
    this.draw = function () {
        if (this.workingMenuState == menuState) {
            get2D().fillStyle = COLOR_HIGHLIGHT;
            get2D().fillRect(this.getX(), this.getY(), this.getWidth(), this.getHeight());

            get2D().beginPath();
            get2D().lineWidth = "2";
            get2D().strokeStyle = this.isSelected() ? COLOR_BUTTON_HIGHLIGHT : "black";
            get2D().rect(this.getX(), this.getY(), this.getWidth(), this.getHeight());
            get2D().closePath();
            get2D().stroke();

            get2D().fillStyle = this.isSelected() ? COLOR_BUTTON_HIGHLIGHT : "black";
            get2D().font = "20px clean";
            get2D().fillText(this.text, this.x + this.width / 2 - getTextWidth(this.text) / 2, this.y + this.height * 0.682);
        }
    };

    /**
     * Implement this function to your own needs. check the MouseListener file for more information
     */
    this.mouseDown = function () {
    };

    this.select = function () {
        this.selected = true;
    };

    this.isSelected = function () {
        return this.selected;
    }

    this.deselect = function () {
        this.selected = false;
    };


    this.getX = function () {
        return this.x;
    };

    this.getY = function () {
        return this.y;
    };

    this.getWidth = function () {
        return this.width;
    };

    this.getHeight = function () {
        return this.height;
    };

    this.getText = function () {
        return this.text;
    };
}