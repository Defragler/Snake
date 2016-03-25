var Direction = {
    NORTH: 0,
    EAST: 1,
    SOUTH: 2,
    WEST: 3
};

/**
 * Calculates the opposing direction
 * @param {Direciton} direction
 * @returns {Direction} the opposing direction
 */
function getOpposingDirection(direction) {
    direction += 2;
    if (direction >= 4) {
        direction -= 4;
    }
    return direction;
}