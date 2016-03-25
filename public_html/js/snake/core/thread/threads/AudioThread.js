function getAudioThread() {
    var audioThread = new Thread(difficulty.getGameTick(), ThreadNames.AUDIO);
    audioThread.run = function () {
        playSounds();
    }
    return audioThread;
}