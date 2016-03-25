/**
 * Calculates a random integer number.
 * @param {type} min included
 * @param {type} max excluded
 * @returns Random number
 */
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}