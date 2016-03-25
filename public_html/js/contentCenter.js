function centerGame() {
    var mainCanvas = document.getElementById('mainCanvas');
    var margin = (html.clientHeight - mainCanvas.clientHeight) / 2;
    mainCanvas.style.marginTop = margin + "px";
}