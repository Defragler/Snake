var effects = [];

function drawEffects() {
    for (var i = 0; i < effects.length; i++) {
        effects[i].draw();
    }
}

function addEffect(effect) {
    effects.push(effect);
}

function removeEffect(effect) {
    effects.splice(effects.indexOf(effect), 1);
}