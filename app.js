let gameSeq = [];
let userSeq = [];
let btns = ["yellow", "red", "purple", "green"];
let started = false;
let level = 0;

// Select the h3 element to update level text
let h3 = document.querySelector("h3");

// Start the game on keypress
document.addEventListener("keypress", function() {
    if (!started) {
        console.log("Game started");
        started = true;
        levelUp();
    }
});

// Button flash function
function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

// Function to handle level up
function levelUp() {
    level++;
    h3.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4); // Changed from 3 to 4
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);

    console.log(randIdx);
    console.log(randColor);
    console.log(randBtn);

    gameSeq.push(randColor); // Add the random color to game sequence
    btnFlash(randBtn);

    // Play the sound corresponding to the color
    playSound(randColor);
}

// Function to handle button click by user
document.querySelectorAll(".btn").forEach(button => {
    button.addEventListener("click", function() {
        let userChosenColor = this.classList[1];
        userSeq.push(userChosenColor);
        playSound(userChosenColor);
        btnFlash(this);
        checkAnswer(userSeq.length - 1);
    });
});

// Function to check the user's answer
function checkAnswer(currentLevel) {
    if (gameSeq[currentLevel] === userSeq[currentLevel]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(() => {
                userSeq = [];
                levelUp();
            }, 1000);
        }
    } else {
        playSound("wrong");
        document.querySelector("h3").innerText = "Game Over, Press Any Key to Restart";
        startOver();
    }
}

// Function to play sound
function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// Function to start over
function startOver() {
    level = 0;
    gameSeq = [];
    userSeq = [];
    started = false;
}
