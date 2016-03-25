// Input
var ArrowKeys = {UP: 38, DOWN: 40, LEFT: 37, RIGHT: 39};
var WasdKeys = {UP: 87, DOWN: 83, LEFT: 65, RIGHT: 68};

// States
var GameStates = {INIT: 0, MENU: 1, INIT_GAME: 2, GAME: 3, RESULTS: 4};
var MenuStates = {MAIN: 0, DIFFICULTY: 1};

// Game modes TODO!
var GameModes = {CLASSIC: "Classic", WRAP: "Wall Wrap", VARIABLE: "Variable"};

var ThreadNames = {GAME: "Game", STATE: "State", GRAPHICS: "Graphics", AUDIO: "Audio"};

//Difficulties 
var Difficulties = {
    EASY: new Difficulty(6, "Easy"),
    MEDIUM: new Difficulty(12, "Medium"),
    HARD: new Difficulty(18, "Hard"),
    INSANE: new Difficulty(30, "Insane"),
    IMPOSSIBLE: new Difficulty(60, "Impossible")
};

//Foodtype
var FoodType = {NORMAL: 0, EXPLODE: 1, IMPLODE: 2}

/**
 * Adds the score object to the matching key of te difficulties enum.
 * 
 * @param {Difficulties} difficulty the difficulty
 * @param {Score} score the score
 */
function setScore(difficulty, score) {
    if (score.getName().length == 0) {
        score.name = "Anonymous";
    }
    switch (difficulty) {
        case Difficulties.EASY:
            Difficulties.EASY.addScore(score);
            break;
        case Difficulties.MEDIUM:
            Difficulties.MEDIUM.addScore(score);
            break;
        case Difficulties.HARD:
            Difficulties.HARD.addScore(score);
            break;
        case Difficulties.INSANE:
            Difficulties.INSANE.addScore(score);
            break;
        case Difficulties.IMPOSSIBLE:
            Difficulties.IMPOSSIBLE.addScore(score);
            break;
    }
}

/**
 * Sets the difficulty
 * @param {Difficulties} difficulty the difficulty
 */
function setDifficulty(difficulty) {
    switch (difficulty) {
        case Difficulties.EASY:
            difficulty = Difficulties.EASY;
            break;
        case Difficulties.MEDIUM:
            difficulty = Difficulties.MEDIUM;
            break;
        case Difficulties.HARD:
            difficulty = Difficulties.HARD;
            break;
        case Difficulties.INSANE:
            difficulty = Difficulties.INSANE;
            break;
        case Difficulties.IMPOSSIBLE:
            difficulty = Difficulties.IMPOSSIBLE;
            break;
    }
}