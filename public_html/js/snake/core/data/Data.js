// Graphics Data
var FPS = 60;

//Game Data
//
// Grid Data
var TILE_DIMENSION = 40;
var GRID_HEIGHT = 16;
var GRID_WIDTH = 25;
var BAR_HEIGHT = 100;

// final Game Data
var PLAYER_COUNT = 1;

var scoreName = "";

// game object data
var players = [];
var food = null;
var explosions = [];

// Game mode
var gameMode = GameModes.WRAP;

// Enums
var difficulty = Difficulties.EASY;

//States
var gameState = GameStates.INIT;
var menuState = MenuStates.MAIN;



