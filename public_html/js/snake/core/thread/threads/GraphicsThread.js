function getGraphicsThread() {
    var graphicsThread = new Thread(1000 / FPS, ThreadNames.GRAPHICS);

    graphicsThread.run = function () {
        drawGame();
    };

    return graphicsThread;
}
;