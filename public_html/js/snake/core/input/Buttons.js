var buttonX = 50;
var buttonY = 0;
var buttonWidth = 160;
var buttonHeight = 40;

/**
 * Registers all the buttons needed for the menu.
 * 
 * The buttons will be registred to the mouse listener which will catch the input in the proper menu state. 
 */
function registerButtons() {
    registerMainMenu();
    registerDifficultyMenu();
    registerGameModeMenu();
}

/**
 * Registers the buttons for the main menu ( MenuStates.MAIN)
 */
function registerMainMenu() {
    buttonY = 0;
    var startButton = new Button(buttonX, buttonY += 50, buttonWidth, buttonHeight, "Start", MenuStates.MAIN);
    var levelButton = new Button(buttonX, buttonY += 50, buttonWidth, buttonHeight, "Difficulty", MenuStates.MAIN);
    var gameModeButton = new Button(buttonX, buttonY += 50, buttonWidth, buttonHeight, "Game modes", MenuStates.MAIN);

    startButton.mouseDown = function () {
        if (gameState == GameStates.MENU)
            gameState = GameStates.INIT_GAME;
    };

    gameModeButton.mouseDown = function () {
        if (gameState == GameStates.MENU) {
            menuState = MenuStates.GAME_MODES;
        }
    };


    levelButton.mouseDown = function () {
        if (gameState == GameStates.MENU)
            menuState = MenuStates.DIFFICULTY;
    };

    registerButton(startButton);

    registerButton(gameModeButton);
    registerButton(levelButton);
}

/**
 * Registers the buttons for the difficulty menu ( MenuStates.DIFFICULTY)
 */
function registerDifficultyMenu() {
    // reset buttonY
    buttonY = 0;
    // instantiate button array
    var buttonsDifficulty = [];

    // push buttons
    for (var key in Difficulties) {
        var tempButton = new Button(buttonX, buttonY += 50, buttonWidth, buttonHeight, key, MenuStates.DIFFICULTY);
        buttonsDifficulty.push(tempButton);
    }

    buttonsDifficulty[0].mouseDown = function () { // EASY
        if (gameState == GameStates.MENU) {
            difficulty = Difficulties.EASY;
            menuState = MenuStates.MAIN;
        }
    };

    buttonsDifficulty[1].mouseDown = function () { // MEDIUM
        if (gameState == GameStates.MENU) {
            difficulty = Difficulties.MEDIUM;
            menuState = MenuStates.MAIN;
        }
    };

    buttonsDifficulty[2].mouseDown = function () { // HARD
        if (gameState == GameStates.MENU) {
            difficulty = Difficulties.HARD;
            menuState = MenuStates.MAIN;
        }
    };

    buttonsDifficulty[3].mouseDown = function () { // INSANE
        if (gameState == GameStates.MENU) {
            difficulty = Difficulties.INSANE;
            menuState = MenuStates.MAIN;
        }
    };

    buttonsDifficulty[4].mouseDown = function () { // IMPOSSIBLE
        if (gameState == GameStates.MENU) {
            difficulty = Difficulties.IMPOSSIBLE;
            menuState = MenuStates.MAIN;
        }
    };

    for (var i = 0; i < buttonsDifficulty.length; i++) {
        registerButton(buttonsDifficulty[i]);
    }
}

function registerGameModeMenu() {
    buttonY = 0;
    var classicButton = new Button(buttonX, buttonY += 50, buttonWidth, buttonHeight, "Classic", MenuStates.GAME_MODES);
    var wrapButton = new Button(buttonX, buttonY += 50, buttonWidth, buttonHeight, "Wall Wrap", MenuStates.GAME_MODES);
    var variableButton = new Button(buttonX, buttonY += 50, buttonWidth, buttonHeight, "Variable", MenuStates.GAME_MODES);

    classicButton.mouseDown = function () {
        if (gameState == GameStates.MENU) {
            gameMode = GameModes.CLASSIC;
            menuState = MenuStates.MAIN;
        }
    }
    wrapButton.mouseDown = function () {
        if (gameState == GameStates.MENU) {
            gameMode = GameModes.WRAP;
            menuState = MenuStates.MAIN;
        }
    }
    variableButton.mouseDown = function () {
        if (gameState == GameStates.MENU) {
            gameMode = GameModes.VARIABLE;
            menuState = MenuStates.MAIN;
        }
    }
    registerButton(classicButton);
    registerButton(wrapButton);
    registerButton(variableButton);
}