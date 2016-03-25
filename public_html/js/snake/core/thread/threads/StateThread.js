function getStateThread() {
    var stateThread = new Thread(100, ThreadNames.STATE);
    
    stateThread.run = function () {
        switch (gameState) {
            case GameStates.INIT:             
                registerButtons();
                addMouseDownListener();
                addMouseMoveListener();
                gameState = GameStates.MENU;
                break;

            case GameStates.MENU:
                break;

            case GameStates.INIT_GAME:               
                initGame();
                break;

            case GameStates.GAME:
                break;

            case GameStates.RESULTS:
                break;
                
            default:
                break;
        }
    };
    
    return stateThread;
}