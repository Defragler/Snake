var buttons = [];

/**
 * This function will run if the mouseDown listener has been added and when there is a mouse down event
 * @param {MouseEvent} e
 */
function onMouseDown(e) {
    var mousePosition = getMousePosition(e);
    checkButtonsDown(mousePosition[0], mousePosition[1]);
}

/**
 * This function will run if the mouseMove listener has been added and when there is a mouse move event
 * @param {MouseEvent} e
 */
function onMouseMove(e) {
    var mousePosition = getMousePosition(e);
    checkButtonsMove(mousePosition[0], mousePosition[1]);
}

/**
 * Checks if any of the registered buttons should be pressed
 * @param {integer} x
 * @param {integer} y
 */
function checkButtonsDown(x, y) {
    for (var i = 0; i < buttons.length; i++) {
        if (x >= buttons[i].getX() && x <= buttons[i].getX() + buttons[i].getWidth()) {
            if (y >= buttons[i].getY() && y <= buttons[i].getY() + buttons[i].getHeight()) {
                if (menuState == buttons[i].workingMenuState) {
                    buttons[i].mouseDown();
                    break;
                }
            }
        }
    }
}

/**
 * Checks if any of the registered buttons should be selected
 * @param {integer} x
 * @param {integer} y
 */
function checkButtonsMove(x, y) {
    for (var i = 0; i < buttons.length; i++) {
        if (x >= buttons[i].getX() && x <= buttons[i].getX() + buttons[i].getWidth()) {
            if (y >= buttons[i].getY() && y <= buttons[i].getY() + buttons[i].getHeight()) {
                if (menuState == buttons[i].workingMenuState) {
                    buttons[i].select();
                    break;
                }
            }
        }
        if (buttons[i].isSelected()) {
            buttons[i].deselect();
        }
    }
}

/**
 * Adds a mouse down listener to the gamecanvas
 */
function addMouseDownListener() {
    getCanvas().addEventListener("mousedown", onMouseDown);
}

/**
 * Adds a mouse move listener to the gamecanvas
 */
function addMouseMoveListener() {
    getCanvas().addEventListener("mousemove", onMouseMove);
}

/**
 * 
 * @param {MouseEvent} e
 * @returns {[x,y]}
 */
function getMousePosition(e) {
    var canvasRectangle = getCanvas().getBoundingClientRect();
    var x = e.clientX - canvasRectangle.left;
    var y = e.clientY - canvasRectangle.top;
    return [x, y];
}

/**
 * Registers a button for the mouse listener
 * @param {Button} button  
 */
function registerButton(button) {
    if (buttons.indexOf(button) < 0)
        buttons.push(button);
}