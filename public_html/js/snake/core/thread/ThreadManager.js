/**
 * This array contains the threads that can be started or stopped.
 * @type Array {Thread}
 */
var threads = [];

/**
 * Adds a thread to the thread manager
 * @param {Thread} thread
 * @returns true if thread has been added to the thread manager, false if not.
 */
function addThread(thread) {
    if (!threadExists(thread)) {
        threads.push(thread);
        console.log("Pushed thread: " + thread.getThreadID());
        return true;
    }
    return false;
}

/**
 * Removes the thread from the thread manager. 
 * 
 * @param {ThreadsNames} thread
 * @returns {Boolean} true if the thread existed and is removed, false if not existing
 */
function removeThread(thread) {
    if (threadExists(thread)) {
        threads.splice(threads.indexOf(thread), 1);
    }
    //TODO ADD return value
}

/**
 * Starts the given thread.
 * @param {ThreadNames} thread the thread that has to be started
 * @returns {boolean} true if started, false if already running.
 */
function startThread(thread) {
    for (var i = 0; i < threads.length; i++) {
        if (threads[i].getThreadID() == thread) {
            if (!threads[i].isRunning()) {
                threads[i].start();
                console.log("Started thread: " + threads[i].getThreadID());
                return true;
            }
            return false;
        }
    }
    return false;
}

/**
 * Stops the given thread.
 * @param {ThreadNames} thread
 * @returns {boolean} true if stopped, false if already stopped.
 */
function stopThread(thread) {
    for (var i = 0; i < threads.length; i++) {
        if (threads[i].getThreadID() == thread) {
            if (threads[i].getInterval() != false) {
                threads[i].stop();
                console.log("Stopped thread: " + threads[i].getThreadID());
                return true;
            }
            return false;
        }
    }
    return false;
}

/**
 * Updates a thread, the sleep interval will be updated. Thread will be stopped and restarted.
 * @param {ThreadNames} thread
 * @param {int} sleep
 * @returns {boolean} true if thread is found and updated, false if not.
 */
function updateThread(thread, sleep) {
    for (var i = 0; i < threads.length; i++) {
        if (threads[i].getThreadID() == thread) {
            threads[i].sleep = sleep;
            console.log("Updated thread: " + threads[i].getThreadID() + " - " + threads[i].sleep);
            restartThreads();
            return true;
        }
    }

    return false;
}

/**
 * Checks if a thread exist within the thread manager.
 * 
 * Use at least one of the parameters
 * 
 * @param {Threads} thread
 * @returns {Boolean} true if the thread exists, false if not.
 */
function threadExists(thread) {
    for (var i = 0; i < threads.length; i++) {
        if (threads[i].getThreadID() == thread) {
            return true;
        }
    }
    return false;
}

/**
 * Stops all the threads and start them in the original order
 */
function restartThreads() {
    for (var i = 0; i < threads.length; i++) {
        stopThread(threads[i].getThreadID());
        startThread(threads[i].getThreadID());
    }
}

/**
 * Creates the threads the games needs to work normally. 
 * The first thread gets the highest priority in the running list, in this case the game thread because we want accurate gameplay!
 */
function addThreads() {
    addThread(getGameThread());
    addThread(getGraphicsThread());
    addThread(getStateThread());
    addThread(getAudioThread());
}