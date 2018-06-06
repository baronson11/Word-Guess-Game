// Globals
let gamesList = ["metalgearsolid", "elderscrollsonline", "callofduty",
"supermariobros", "thewitcher", "watchdogs", "supermeatboy",
"skyrim", "playerunknownbattlegrounds", "overwatch", "fallout", "tombraider", "thedivision"];
let chosenGame = "";
let letters = [];
let blanks = 0;
let blanksAndWins = [];
let wrongGuesses = [];
let lettersGuessed = "";

// Counters
let wins = 0;
let losses = 0;
let numGuesses = 10;

// Functions

// prints results to section
function printResults() {
  document.getElementById("guesses-left").innerHTML = numGuesses;
  document.getElementById("word-blanks").innerHTML = blanksAndWins.join(" ");
  document.getElementById("wrong-guesses").innerHTML = wrongGuesses.join(" ");
}

// starts game
function startGame() {
  numGuesses = 10;
  chosenGame = gamesList[Math.floor(Math.random() * gamesList.length)];
  letters = chosenGame.split("");
  blanks = letters.length;
  blanksAndWins = [];
  wrongGuesses = [];

  for (let i = 0; i < blanks; i++) {
    blanksAndWins.push("_");
  }
  printResults();
}

// checks letters for each guess
function checkLetters(letter) {
  var letterInWord = false;
  for (let i = 0; i < blanks; i++) {
    if (chosenGame[i] === letter) {
      letterInWord = true;
    }
  }
  if (letterInWord) {
    for (let j = 0; j < blanks; j++) {
      if (chosenGame[j] === letter) {
        blanksAndWins[j] = letter;
      }
    }
    console.log(blanksAndWins);
  } else {
    wrongGuesses.push(letter);
    numGuesses--;
  }
}

//determines wins and losses, plays sound
function roundComplete() {
  printResults();
  if (letters.toString() === blanksAndWins.toString()) {
    new Audio('assets/sounds/winning.mp3').play();
    wins++;
    document.getElementById("status").innerHTML = 'You Win!';
    document.getElementById("win-counter").innerHTML = wins;
    startGame();
  }
  else if (numGuesses === 0) {
    new Audio('assets/sounds/losing.mp3').play();
    losses++;
    document.getElementById("status").innerHTML = 'You Lose!';
    document.getElementById("loss-counter").innerHTML = losses;
    startGame();
  }
}

// Start game and listen for event
startGame();
document.onkeyup = function(event) {
  lettersGuessed = String.fromCharCode(event.which).toLowerCase();
  checkLetters(lettersGuessed);
  roundComplete();
};
