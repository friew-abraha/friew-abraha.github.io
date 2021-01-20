"use strict";
var delay = 250;
var timerID = "";
var originalText = "";

function setSize() {
    var selectedSizeIndex = document.getElementById("size").selectedIndex;

    if (selectedSizeIndex == "0") { document.getElementById("textarea").style.fontSize = "7pt"; } else if (selectedSizeIndex == "1") { document.getElementById("textarea").style.fontSize = "10pt"; } else if (selectedSizeIndex == "2") { document.getElementById("textarea").style.fontSize = "12pt"; } else if (selectedSizeIndex == "3") { document.getElementById("textarea").style.fontSize = "16pt"; } else if (selectedSizeIndex == "4") { document.getElementById("textarea").style.fontSize = "24pt"; } else { document.getElementById("textarea").style.fontSize = "32pt"; }
}

function stopAnimation() {
    clearInterval(timerID);
    document.getElementById("btnstart").disabled = false;
    document.getElementById("animtype").disabled = false;
    originalText = document.getElementById("textarea").value = originalText;
}

function turboCharger() {
    if (document.getElementById("turbo").checked === true) { delay = 100; } else { delay = 250; }
    animationTypeIdentifier();
}

function animationTypeIdentifier() {
    setSize();
    document.getElementById("btnstop").disabled = false;
    document.getElementById("btnstart").disabled = true;
    document.getElementById("animtype").disabled = true;
    clearInterval(timerID);
    originalText = document.getElementById("textarea").value;
    var animType = document.getElementById("animtype").value;

    if (animType == "blank") { document.getElementById("textarea").value = ""; } else if (animType == "juggler") { displayAnimation("juggler"); } else if (animType == "exercise") { displayAnimation("exercise"); } else if (animType == "dive") { displayAnimation("dive"); } else if (animType == "bike") { displayAnimation("bike"); } else if (animType == "custom") { return; } else { return; }
}

function displayAnimation(animationType) {
    if (animationType == "blank") { return; } else if (animationType == "juggler") { var splitted = ANIMATIONS["juggler"].split("=====\n"); } else if (animationType == "exercise") { var splitted = ANIMATIONS["exercise"].split("=====\n"); } else if (animationType == "dive") { var splitted = ANIMATIONS["dive"].split("=====\n"); } else if (animationType == "bike") { var splitted = ANIMATIONS["bike"].split("=====\n"); } else { return; }
    var index = 0;
    timerID = setInterval(function display() {
        document.getElementById("textarea").value = splitted[index++];
        if (index >= splitted.length) { index = 0; }
    }, delay);
}