/* global players, Direction, Direction, WasdKeys, MenuStates, GameStates, ArrowKeys, Difficulties */
window.addEventListener("keydown", keyPressEvent, false);

/**
 * Executes when keyPress events occur
 * @param {KeyEvent} e
 */
function keyPressEvent(e) {
    // console.log(e.keyCode);
    switch (gameState) {
        case GameStates.GAME:
            checkGameKeys(e);
            break;
        case GameStates.MENU :
            if (e.keyCode == 27) { //escape key
                gameState = GameStates.MENU;
                menuState = MenuStates.MAIN;
            }
            break;

        case GameStates.RESULTS:
            //Text typing
            var char = String.fromCharCode(e.keyCode);
            if (e.keyCode >= 65 && e.keyCode <= 90) {
                scoreName += char;
            }
            if (e.keyCode == 32) { //space
                scoreName += " ";
            }

            // text removal (cannot use backspace for now)
            if (e.keyCode == 46) { // delete key 
                scoreName = scoreName.substr(0, scoreName.length - 1);
            }

            // Enter key -> Save score -> go to: Main meu   
            if (e.keyCode == 13) {
                var score = new Score(scoreName, players[0].score, gameMode);
                setScore(difficulty, score);

                gameState = GameStates.MENU;
                menuState = MenuStates.MAIN;
            }
            if (e.keyCode == 27) { // escape
                gameState = GameStates.MENU;
                menuState = MenuStates.MAIN;
            }
            break;
        default:
            break;
    }
}
/**
 * 
 * @param {KeyEvent} e
 */
function checkGameKeys(e) {
    switch (e.keyCode) {
        case ArrowKeys.UP:
            players[0].direction = Direction.NORTH;
            break;
        case ArrowKeys.DOWN:
            players[0].direction = Direction.SOUTH;
            break;
        case ArrowKeys.LEFT:
            players[0].direction = Direction.WEST;
            break;
        case ArrowKeys.RIGHT:
            players[0].direction = Direction.EAST;
            break;
        case 27: //escape key
            gameState = GameStates.MENU;
            menuState = MenuStates.MAIN;
            break;
        case 46:// delete key 
            finishGame();
            break
    }

    //secondary controls
    switch (e.keyCode) {
        case WasdKeys.UP:
            players.length > 1 ? players[1].direction = Direction.NORTH : players[0].direction = Direction.NORTH;
            break;
        case WasdKeys.DOWN:
            players.length > 1 ? players[1].direction = Direction.SOUTH : players[0].direction = Direction.SOUTH;
            break;
        case WasdKeys.LEFT:
            players.length > 1 ? players[1].direction = Direction.WEST : players[0].direction = Direction.WEST;
            break;
        case WasdKeys.RIGHT:
            players.length > 1 ? players[1].direction = Direction.EAST : players[0].direction = Direction.EAST;
            break;
    }
}

