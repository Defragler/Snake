main();

function main() {
    addThreads();
    startThread(ThreadNames.STATE);
    startThread(ThreadNames.GRAPHICS);
    startThread(ThreadNames.AUDIO);
}