/**
 * A Sound that can be played.
 * 
 * @param {String} fileName
 * @param {String} name
 * @returns {Sound} a sound
 */
function Sound(fileName, name, loop) {
    this.fileName = fileName;
    this.playing = false;

    this.audio = soundManager.createSound({
        url: this.fileName,
        onfinish: function () {
            this.finishedPlaying = false;
        }
    });
    this.name = name;

    this.loop = loop || false;

    /**
     * 
     * @returns {Boolean} true if the sound is still playing, false if not.
     */
    this.isPlaying = function () {
        return this.playing;
    }
}