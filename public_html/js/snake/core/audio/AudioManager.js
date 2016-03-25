var sounds = [];
soundManager.setup({// where to find the SWF files, if needed

    onready: function () {
        // SM2 has loaded, API ready to use e.g., createSound() etc.
    },
    ontimeout: function () {
        // Uh-oh. No HTML5 support, SWF missing, Flash blocked or other issue
    }});
/**
 * Plays the sounds that are added to the audio manager.
 * @returns {undefined}
 */
function playSounds() {
    for (var i = 0; i < sounds.length; i++) {
//      \  console.log(sounds[i].name + " " + sounds[i].isPlaying());
        if (sounds[i].audio.playState == 0) {
            sounds[i].audio.play();
            console.log("Playing " + sounds[i].fileName);
        }
        if (!sounds[i].loop) {
            console.log("Removed sound " + sounds[i].name);
//            sounds[i].audio.stop();
            removeSound(sounds[i]);
        }
    }
}

/**
 * Adds a sound to be played to the stack
 * @param {Sound} sound
 */
function addSound(sound) {
    var tempSound = new Sound(sound.fileName, sound.name, sound.loop);
    sounds.push(tempSound);
    console.log("Added sound: " + sound.fileName);
}

/**
 * Removes a sound from the play stack
 * @param {type} sound a sound
 */
function removeSound(sound) {
    sounds.splice(sounds.indexOf(sound), 1);
}