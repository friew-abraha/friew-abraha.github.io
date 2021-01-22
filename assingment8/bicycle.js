(function() {
    "use strict";

    // DOM Elements
    let display;
    let creatBikeButton;
    let createMountainBikeButton;
    let bikeListWindow;
    let mountainBikeListWindow;
    let bikeSpeedUpButton;
    let bikeApplyBrakeButton;
    let mountainBikeSpeedUpButton;
    let mountainBikeApplyBrakeButton;
    let mountainBikeChangeGearButton;

    let bikeList = [];
    let mountainBikeList = [];

    let bikePrototype = createBicyclePrototype();
    let moutainBikePrototype = createMountainBikePrototype(bikePrototype);

    function createBicyclePrototype() {
        return {
            speed: 0,
            applyBrake: function(value) {
                if (value > this.speed)
                    this.speed = 0;
                else
                    this.speed -= value;
            },
            speedUp: function(value) { this.speed += value; },
            toString: function() { return "Bike | speed: " + this.speed; }
        };
    }

    function createMountainBikePrototype(prototype) {
        let bike = Object.create(prototype);
        bike.gear = 1;
        bike.setGear = function(value) {
            this.gear = value;
        };
        bike.toString = function() {
            return ("MountainBike | speed: " + this.speed + "  gear: " + this.gear);
        };
        return bike;
    }

    function create(prototype) {
        return function() {
            let bicycle = Object.create(prototype);
            if (bicycle.__proto__ == moutainBikePrototype) {
                mountainBikeList.push(bicycle);
            } else {
                bikeList.push(bicycle);
            }
            log();
            update();
        };
    }

    function update() {
        let option = document.createElement("option");
        if (bikeListWindow.children.length < bikeList.length) {
            option.text = "Bike " + (bikeList.length);
            bikeListWindow.add(option);
        } else if (mountainBikeListWindow.children.length < mountainBikeList.length) {
            option.text = "MountainBike " + (mountainBikeList.length);
            mountainBikeListWindow.add(option);
        }
    }

    function changeSpeed(prototype, decrease = false) {
        let speed;

        let getSelections = function(selectionWindow) {
            let optionList = selectionWindow.children;
            let selections = [];
            for (let optionIndex in optionList) {
                if (optionList[optionIndex].selected)
                    selections.push(optionIndex);
            }
            return selections;
        };

        let applySpeed = function(selections, list) {
            for (let selection of selections) {
                if (decrease)
                    list[selection].applyBrake(speed);
                else
                    list[selection].speedUp(speed);
            }
        };

        return function() {
            if (prototype == bikePrototype) {
                if (decrease) {
                    speed = parseInt((document.getElementsByName("brakeVal")[0]).value);
                } else {
                    speed = parseInt((document.getElementsByName("speedVal")[0]).value);
                }
                applySpeed(getSelections(bikeListWindow), bikeList);
            } else {
                if (decrease) {
                    speed = parseInt((document.getElementsByName("brakeVal")[1]).value);
                } else {
                    speed = parseInt((document.getElementsByName("speedVal")[1]).value);
                }
                applySpeed(getSelections(mountainBikeListWindow), mountainBikeList);
            }
            log();
        };

    }

    function changeGear() {
        let gear = parseInt((document.getElementsByName("gearVal")[0]).value);
        let selections = [];
        let optionList = mountainBikeListWindow.children;
        for (let optionIndex in optionList) {
            if (optionList[optionIndex].selected)
                selections.push(optionIndex);
        }
        for (let selection of selections) {
            mountainBikeList[selection].setGear(gear);
        }
        log();
    }

    function log() {
        display.value = "---BIKES-----";
        for (let bike of bikeList) {
            display.value += "\n" + bike.toString();
        }
        display.value += "\n\n---MOUNTAIN BIKES------------";
        for (let bike of mountainBikeList) {
            display.value += "\n" + bike.toString();
        }
    }

    function init() {
        display = document.getElementById("display").getElementsByTagName("textarea")[0];

        creatBikeButton = document.getElementsByClassName("create")[0];
        bikeListWindow = document.getElementsByClassName("list")[0];
        bikeSpeedUpButton = document.getElementsByName("speedup")[0];
        bikeApplyBrakeButton = document.getElementsByName("brake")[0];

        createMountainBikeButton = document.getElementsByClassName("create")[1];
        mountainBikeListWindow = document.getElementsByClassName("list")[1];
        mountainBikeSpeedUpButton = document.getElementsByName("speedup")[1];
        mountainBikeApplyBrakeButton = document.getElementsByName("brake")[1];
        mountainBikeChangeGearButton = document.getElementsByName("gear")[0];

        creatBikeButton.onclick = create(bikePrototype);
        createMountainBikeButton.onclick = create(moutainBikePrototype);

        bikeSpeedUpButton.onclick = changeSpeed(bikePrototype);
        mountainBikeSpeedUpButton.onclick = changeSpeed(moutainBikePrototype);

        bikeApplyBrakeButton.onclick = changeSpeed(bikePrototype, true);
        mountainBikeApplyBrakeButton.onclick = changeSpeed(moutainBikePrototype, true);

        mountainBikeChangeGearButton.onclick = changeGear;

        log();
    }

    window.onload = init;
})();