/**
 * A score of a player entity
 * @param {string} name the players name
 * @param {int} score the score
 * @param {GameModes} gameMode  the game mode the score was set in
 * @returns {Score} a Score object containing name and score of the player
 */
function Score(name, score, gameMode) {
    this.name = name;
    this.score = score;
    this.gameMode = gameMode;

    /**
     * Gets the name
     * @returns {string} the name
     */
    this.getName = function () {
        return this.name;
    };

    /**
     * Gets the game mode the score was set in
     * @returns {GameModes} the game mode
     */
    this.getGameMode = function () {
        return this.gameMode;
    }

    /**
     * Gets the score
     * @returns {int} the score
     */
    this.getScore = function () {
        return this.score;
    };
}