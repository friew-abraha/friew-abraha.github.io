function fromButton() {
    //alert("Hello, World!");
    // document.getElementById("myTextArea").style.fontSize = "24pt";
    var element = document.getElementById("myTextArea").style;

    var currentVal = element.fontSize;
    element.fontSize = parseInt(currentVal) + 2 + "pt";


}

function buttonTimer() {
    let timer = setInterval(fromButton, 500);
    document.getElementById("stopTimerBtn").onclick = function() { clearInterval(timer) };
}


function fromCheck() {
    var checkedStatus = document.getElementById("myCheckBox").checked;
    let elt = document.getElementById("myTextArea").style;
    if (checkedStatus) {
        elt.fontWeight = "bold";
        elt.color = "green";
        elt.textDecoration = "underline";
        document.getElementById("body").style.backgroundImage = "url('dollar.jpg')";
        // document.getElementById("body").style.backgroundRepeat = "no-repeat";

    } else {
        elt.fontWeight = "normal";
        elt.color = "black";
        elt.textDecoration = "none";
        document.getElementById("body").style.backgroundImage = "url('white.png')";

    }
}

function igpay() {
    var str = document.getElementById("myTextArea").value.trim();
    var strArrays = str.split(" ");
    var igPayWords = "";
    if (str != "") {
        for (let i = 0; i < strArrays.length; i++) {
            igPayWords += changeWordToIgpay(strArrays[i]) + " ";
        }
        document.getElementById("myTextArea").value = igPayWords.trim();
    }

}

function changeWordToIgpay(word) {
    var finalString = "";
    if (word.charAt(0).match(/[aeiouAEIOU]/))
        finalString = word + "ay";
    else {
        var voul_index = firstVoulIndex(word);
        if (voul_index != -1) {
            var newStr = (word.slice(voul_index)).trim();
            for (let i = 0; i < voul_index; i++) {
                newStr += word.charAt(i);
            }
            finalString = newStr + "ay";
        }
    }
    return finalString;
}

function firstVoulIndex(wrd) {
    var index = -1;
    for (let i = 0; i < wrd.length; i++) {
        if (wrd.charAt(i).match(/[aeiouAEIOU]/)) {
            index = i;
            return index;
        }

    }

}


function malkovitch() {
    var sentence = document.getElementById("myTextArea").value.trim();
    var strArrays = sentence.split(" ");
    var MalkovitchWords = "";
    for (let i = 0; i < strArrays.length; i++) {
        if (strArrays[i].length >= 5) {
            strArrays[i] = "Malkovitch";
        }
        MalkovitchWords += strArrays[i] + " ";
    }
    document.getElementById("myTextArea").value = MalkovitchWords.trim();
}