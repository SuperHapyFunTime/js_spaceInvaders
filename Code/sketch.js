var ship;
var leftShield = [];
var middleShield = [];
var rightShield = [];
var indavders = [];
var bullets = [];
var shipLives = [];
var stars = [];

var oldSchoolFont;
var millisecond;
var seconds;
var canShoot;
var hitEdge;
var hasGameStarted;
var invaderY;
var invaderXPos;
var invaderRadius;
var invaderValue;
var numOfInvadersPerLine;
var mainLogo;
var shipSprite;
var shipSpriteXPos;
var shipSpriteYPos;
var lifesLeft;
var starMoveSpeed;
var isDead;
var scoreboardDiv;

function setup() {
    scoreboardDiv = document.getElementById('scoreboardContainer');
    scoreboardDiv.style.display = 'none';
    firebaseSetup();
    // Move the canvas so it's inside our <div id="sketch-holder">.

    isDead = false;
    hasGameStarted = false;
    canShoot = 0;
    shipSpriteXPos = 25;
    shipSpriteYPos = 677.5;
    lifesLeft = 4;
    invaderY = 30;
    invaderXPos = 100;
    invaderRadius = 15;
    invaderValue = 10;
    numOfInvadersPerLine = 14;
    starMoveSpeed = 0;
    var cnv = createCanvas(800, 700);
    cnv.parent("myContainer");

    makeStars();
    createShields(50, 520, 5, leftShield);
    createShields(325, 520, 5, middleShield);
    createShields(575, 520, 5, rightShield);
    scoreboardDiv = document.getElementById('scoreboardContainer');
    mainLogo = loadImage("/Sprites/Space_Invaders_log_V2.png");
    shipSprite = loadImage("/Sprites/HeroLives.png");
    ship = new Ship();
    creatingLineOfInvaders(invaderXPos, invaderY, invaderRadius, invaderValue, "RED");
    textFont(oldSchoolFont);


}

function draw() {
    background(0);
    stroke(0, 255, 0);
    fill(0, 255, 0);
    showStars();
    isGameOver();
    drawLineScoreDivide();
    displayShipSprites(lifesLeft, shipSpriteXPos, shipSpriteYPos);

    millisecond = millis();
    seconds = second();
    hitEdge = false;

    if (!hasGameStarted && !isDead) {
        ship.show();
        imageMode(CENTER);
        image(mainLogo, width / 2, height / 3.5, mainLogo.width * 1.1, mainLogo.height * 1.1);
        displayCreditText();

        displayStartButton();
    }
    if (hasGameStarted && !isDead) {
        starMoveSpeed = 10;
        displayScore()
        ship.show();
        ship.move();
        movementsForInvaders()
        removingBulletsIfHitInvader();
        removeInvaderIfHitWithBullet(leftShield);
        showShields(leftShield);
        showShields(middleShield);
        showShields(rightShield);
    }
}

function preload() {
    oldSchoolFont = loadFont("/fonts/freaky-fonts_service-games-oldskool/Oldskool_Hollow.ttf");
}

function keyPressed() {
    if (key === " ") {
        if (millisecond >= canShoot) {
            var bullet = new Bullet(ship.x, height - 90);
            bullets.push(bullet);
            canShoot = millisecond + 650;
        }
    }
    if (key === " " && !hasGameStarted) {
        hasGameStarted = true;
    }

    if (keyIsDown(RIGHT_ARROW) && !keyIsDown(LEFT_ARROW)) {
        ship.setDir(1);
    }
    if (keyIsDown(LEFT_ARROW) && !keyIsDown(RIGHT_ARROW)) {
        ship.setDir(-1);
    }
    if (keyIsDown(RIGHT_ARROW) && keyIsDown(LEFT_ARROW)) {
        ship.setDir(0);
    }

}

function keyReleased() {
    if (keyCode === RIGHT_ARROW && !keyIsDown(LEFT_ARROW)) {
        ship.setDir(0);
    }

    if (keyCode === LEFT_ARROW && !keyIsDown(RIGHT_ARROW)) {
        ship.setDir(0);
    }
}

function atEdgeOfWindow(whichOne, invader) {
    if (invader[whichOne].x >= width || invader[whichOne].x <= 0) {
        hitEdge = true;
    }
}

function dropDown() {
    if (hitEdge) {
        for (var i = 0; i < indavders.length; i++) {
            indavders[i].changeDir();
            indavders[i].shiftDown();
        }
    }
    hitEdge = false;
}

function removingBulletsIfHitInvader() {
    for (var i = bullets.length - 1; i >= 0; i--) {
        if (bullets[i].shotInvader) {
            bullets.splice(i, 1);
        }

        for (var j = indavders.length - 1; j >= 0; j--) {
            if (indavders[j].gotShot) {
                indavders.splice(j, 1);
            }
        }
    }
}

function removeInvaderIfHitWithBullet(shieldArray) {
    for (var i = 0; i < bullets.length; i++) {
        bullets[i].show();
        bullets[i].move();

        for (var j = 0; j < indavders.length; j++) {
            if (bullets[i].hits(indavders[j])) {
                indavders[j].die();
                ship.updateScore(indavders[j].invaderValue);
                bullets[i].hitAInvader();
            }
        }

        for (var k = 0; k < shieldArray.length; k++) {
            if (bullets[i].hits(shieldArray[k])) {
                shieldArray[k].hit();
                bullets[i].hitAInvader();
            }
        }

    }
}

function movementsForInvaders() {
    for (var i = 0; i < indavders.length; i++) {
        indavders[i].show();
        indavders[i].move();

        atEdgeOfWindow(i, indavders);
        dropDown(hitEdge);
    }
}

function creatingLineOfInvaders(xPos, yPos, radius, invaderValue, invaderColour) {
    var xReset = xPos;
    for (var j = 0; j < 51; j++) {
        xPos += radius * 4;
        indavders[j] = new Invader(xPos, yPos, radius, invaderValue, invaderColour);

        switch (true) {
            case (j >= 0 && j < 10):
                invaderColour = "RED";
                invaderValue = 30;
                break;
            case (j >= 10 && j < 20):
                invaderColour = "PINK";
                invaderValue = 25;
                break;
            case (j >= 18 && j < 30):
                invaderColour = "NEON";
                invaderValue = 20;
                break;
            case (j >= 18 && j < 40):
                invaderColour = "GREEN";
                invaderValue = 15;
                break;
            case (j >= 18 && j < 50):
                invaderColour = "BLUE";
                invaderValue = 10;
                break;
        }

        if (j % 10 === 0 && j != 0) {
            xPos = xReset;
            yPos += radius * 4;
        }
    }
    indavders.splice(10, 1);
}

function displayShipSprites(numberOfLives, xPos, yPos) {
    numberOfLives += -1;
    for (var i = 0; i < numberOfLives; i++) {
        shipLives[i] = shipSprite;
        image(shipLives[i], xPos, yPos, shipSprite.width / 12.5, shipSprite.height / 12.5);
        xPos += 50;
    }

}

function isGameOver() {
    if (lifesLeft <= 0) {
        gameOver();
    }
}

function gameOver() {
    isDead = true;
    fill(255, 0, 0);
    strokeWeight(0);
    textSize(75);
    text("GAME OVER", 75, 275)
    displayStartButton();
    displayAgain();

    scoreboardDiv.style.display = 'block';
}


function displayScore() {
    strokeWeight(0);
    textSize(20);
    text("Score: " + ship.score, 590, height - 10)
}

function drawLineScoreDivide() {
    beginShape();
    strokeWeight(2);
    vertex(0, height - 45);
    vertex(800, height - 45);
    endShape();
}

function displayStartButton() {
    if (seconds % 2 === 0) {
        fill(255);
        strokeWeight(0);
        textSize(25);
        text("Press Space", 275, 475); // x, y
        text("to Start", 315, 515);

    }
}

function displayAgain() {
    if (seconds % 2 === 0) {
        fill(255);
        strokeWeight(0);
        textSize(25);
        text("...again", 315, 575);
    }
}

function displayCreditText() {
    strokeWeight(0);
    textSize(20);
    text("CREDIT: 01", 590, 690)
}

function makeStars() {
    for (var i = 0; i < 800; i++) {
        stars[i] = new Star();
    }
}

function showStars() {
    push();
    translate(width / 2, height / 2);

    for (var i = 0; i < stars.length; i++) {
        stars[i].update();
        stars[i].show();
    }
    pop();
}

function showShields(array) {
    for (var i = 0; i < array.length; i++) {
        array[i].show();
        if (array[i].shouldDestroy) {
            array.splice(i, 1);
        }
    }
}

function createShields(xPos, yPos, radius, array) {
    var xReset = xPos;
    for (var i = 0; i <= 4; i++) {
        for (var j = i * 15; j < i * 15 + 15; j++) {
            array[j] = new ShieldFragment(xPos, yPos, radius);
            xPos += radius * 2.2;
        }
        xPos = xReset;
        yPos += radius * 2.2;
    }
}

function firebaseSetup() {
    var config = {
        apiKey: "AIzaSyD0lt14oHGnaRhPzaRWr2clt9j3BLRoU8E",
        authDomain: "space-invaders-1b663.firebaseapp.com",
        databaseURL: "https://space-invaders-1b663.firebaseio.com",
        projectId: "space-invaders-1b663",
        storageBucket: "space-invaders-1b663.appspot.com",
        messagingSenderId: "490087430080"
    };
    firebase.initializeApp(config);
    // console.log(firebase);

    // var database = firebase.database();
    // var ref = database.ref('highscorelist');
    // ref.on('value', gotData, errData);

    // var playersRef = firebase.database().ref("highscorelist");


    // playersRef.orderByChild("score").on("child_added", function(data) {
    //     highScoreList.push([data.val().name, data.val().score]);
    // });

    // var ref = firebase.database().ref("highscorelist");
    // var listOfScores = [];
    // var lisOfNames = [];
    //
    //
    // ref.once('value')
    //     .then(function () {
    //         ref.orderByChild("score").on("child_added", function (data) {
    //             listOfScores.push(data.val().score);
    //             lisOfNames.push(data.val().name)
    //             console.log(data.val().name, data.val().score);
    //         });
    //         console.log("This needs to come after the array");
    //     })
    //     .catch(function (err) {
    //         console.log('Error', err.code);
    //     });
    

    //gotData();
    // var data = {
    // name : "Aaron",
    // 	score : 220
    // }
    // ref.push(data);
}

function getHighscore() {
    var leaderboardSize = 6;

    var rootRef = new Firebase('https://space-invaders-1b663.firebaseio.com');
    var highestScoreRef = rootRef.child("highscorelist")


    var highestScoreRef = highestScoreRef.limit(leaderboardSize);
}

function gotData(ref) {









    // var scorelist = data.val();
    // var scorelistCopy = scorelist;
    // var keys = Object.keys(scorelist);
    // var highestScore = 0;
    // var highestScoreKey;
    //
    // for (var i = 0; i < keys.length; i++) {
    //     var k = keys[i];
    //     var name = scorelistCopy[k].name;
    //     var score = scorelistCopy[k].score;
    //
    //     if (highestScore < score) {
    //         highestScore = score;
    //         highestScoreObject = scorelistCopy[k];
    //         highestScoreKey = k;
    //     }
    // }
    //
    // for(var i = 0; i < scorelistCopy.length; i++) {
    //     if(scorelistCopy[i].id === id) {
    //         data.splice(i, 1);
    //         break;
    //     }
    // }
}

function errData(err) {
    console.log('Error');
    console.log(err);
}