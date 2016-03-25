/**
 * A thread that can be started and stopped.
 * 
 * The thread is an object which is making use of the interval system in javascript. This object makes it easier to manage intervals in javascript.
 * @param {int} sleep the sleep time
 * @param {ThreadNames} threads the thread in the thread enum, will be used for identification
 * @returns {Thread} the thread
 */
function Thread(sleep, threadID) {
    this.interval = false;
    this.threadID = threadID;
    this.sleep = sleep || 100;

    /**
     * Gets the thread name of the thread which is also the identifier for the thread.
     * @returns {ThreadNames} the name/id of the thread
     */
    this.getThreadID = function () {
        return this.threadID;
    };

    /**
     * Gets the sleep time.
     * @returns {int} the sleep time
     */
    this.getSleep = function () {
        return this.sleep;
    }

    /**
     * Gets the interval the thread needs to run.
     * @returns {int} the interval
     */
    this.getInterval = function () {
        return this.interval;
    };

    /**
     * This should be implemented when creating a new thread;
     */
    this.run = function () {

    };

    /**
     * Starts the thread
     * 
     * The interval that setInterval returns is saved in the interval
     */
    this.start = function () {
        this.interval = setInterval(this.run, this.getSleep());
    };

    /**
     * Ends the loop of the thread after the current iteration is finished.
     * @returns {boolean} true if the thread is stopped, false if can't stop
     */
    this.stop = function () {
        clearInterval(this.getInterval());
        this.interval = false;
    };

    /**
     * Checks if the thread is running.
     * @returns {Boolean} true if running, false if not
     */
    this.isRunning = function () {
        return this.interval != false;
    }


}