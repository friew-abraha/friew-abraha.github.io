(function() {

    let Anim_Type = "";

    "use strict"
    window.onload = function() {
        document.getElementById("animation").onchange = getAnimationPage;
        document.getElementById("fontsize").onchange = setAnimationSize;
        document.getElementById("start").onclick = animationLooper;
        document.getElementById("stop").onclick = animationStopper;
    };

    function getAnimationPage() {
        let e = document.getElementById("animation");
        let v = document.getElementById("text-area");
        if (e.value === "Blank") {
            v.innerHTML = BLANK;
        } else if (e.value === "Exercise") {
            Anim_Type = EXERCISE;
            v.innerHTML = EXERCISE.split("=====")[0];

        } else if (e.value === "Juggler") {
            Anim_Type = JUGGLER;
            v.innerHTML = JUGGLER.split("=====")[0];

        } else if (e.value === "Bike") {
            Anim_Type = BIKE;
            v.innerHTML = BIKE.split("=====")[0];

        } else if (e.value === "Dive") {
            Anim_Type = DIVE;
            v.innerHTML = DIVE.split("=====")[0];

        }
    }

    function setAnimationSize() {
        let e = document.getElementById("fontsize");
        let v = document.getElementById("text-area");
        if (e.value === "Tiny") {
            v.style.fontSize = "7pt";
        } else if (e.value === "Small") {
            v.style.fontSize = "10pt";
        } else if (e.value === "Medium") {
            v.style.fontSize = "12pt";
        } else if (e.value === "Large") {
            v.style.fontSize = "16pt";
        } else if (e.value === "Extra Large") {
            v.style.fontSize = "24pt";
        } else if (e.value === "XXL") {
            v.style.fontSize = "42pt";
        }
    }

    var x = null;
    var i;
    let first_array = "";

    function animationLooper() {
        let v = document.getElementById("text-area");
        let arr = Anim_Type.split("=====");
        first_array = arr[0];
        let s;
        if (document.getElementById("turbo").checked) {
            s = 40;
        } else {
            s = 250;
        }
        x = setInterval(myAnimate, s);

        function myAnimate() {
            if (i === undefined) {
                i = 0;
            } else if (i < (arr.length - 1)) {
                i = i + 1;
            } else if (i === (arr.length - 1)) {
                i = 0;
            }
            v.innerHTML = arr[i];
            document.getElementById("start").disabled = true;
            document.getElementById("animation").disabled = true;
        }
    }

    function animationStopper() {
        clearInterval(x);
        getAnimationPage();
        document.getElementById("text-area").innerHTML = first_array;
        document.getElementById("start").disabled = false;
        document.getElementById("animation").disabled = false;
    }

})();