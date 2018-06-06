// Globals
let gamesList = ["metalgearsolid", "elderscrollsonline", "callofduty",
"supermariobros", "thewitcher", "watchdogs", "supermeatboy",
"skyrim"];
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

// DOM
// const begin = document.getElementById('begin');
// begin.addEventListener('keypress' () => {
//   begin.style.display = 'none';
// });

// Funcs

function printResults() {
  document.getElementById("guesses-left").innerHTML = numGuesses;
  document.getElementById("word-blanks").innerHTML = blanksAndWins.join(" ");
  document.getElementById("wrong-guesses").innerHTML = wrongGuesses.join(" ");
}

function startGame() {
  numGuesses = 10;
  chosenGame = gamesList[Math.floor(Math.random() * gamesList.length)];
  letters = chosenGame.split("");
  blanks = letters.length;
  blanksAndWins = [];
  wrongGuesses = [];

  for (var i = 0; i < blanks; i++) {
    blanksAndWins.push("_");
  }
  printResults();
}

function checkLetters(letter) {
  var letterInWord = false;
  for (var i = 0; i < blanks; i++) {
    if (chosenGame[i] === letter) {
      letterInWord = true;
    }
  }
  if (letterInWord) {
    for (var j = 0; j < blanks; j++) {
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

function roundComplete() {
  printResults();
  if (letters.toString() === blanksAndWins.toString()) {
    wins++;
    alert("You win!");
    document.getElementById("win-counter").innerHTML = wins;
    startGame();
  }
  else if (numGuesses === 0) {
    losses++;
    alert("You lose");
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
