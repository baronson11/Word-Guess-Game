// Globals
let gamesList = ["metalgearsolid", "elderscrollsonline", "callofduty",
"supermariobros", "thewitcher", "watchdogs", "supermeatboy",
"skyrim", "playerunknownbattlegrounds", "overwatch", "fallout", "tombraider", "thedivision"];
let letters = [];
let blanks = 0;
let blanksAndWins = [];
let wrongGuesses = [];
let lettersGuessed = "";
let chosenGame = "";

// Counters
let wins = 0;
let losses = 0;
let numGuesses = 10;


// Prints results to page
function printResults() {
  document.getElementById("guesses-left").innerHTML = numGuesses;
  document.getElementById("word-blanks").innerHTML = blanksAndWins.join(" ");
  document.getElementById("wrong-guesses").innerHTML = wrongGuesses.join(" ");
}

// Object with methods to start and end the game
const hangman = {

  startGame: function() {
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
  },

  endGame: function() {
    printResults();
    if (letters.toString() === blanksAndWins.toString()) {
      new Audio('assets/sounds/winning.mp3').play();
      wins++;
      document.getElementById("status").innerHTML = 'You Win!';
      document.getElementById("win-counter").innerHTML = wins;
      hangman.startGame();
    } else if (numGuesses === 0) {
      new Audio('assets/sounds/losing.mp3').play();
      losses++;
      document.getElementById("status").innerHTML = 'You Lose!';
      document.getElementById("loss-counter").innerHTML = losses;
      hangman.startGame();
    }
  }
};
// end hangman object

// function to check each letter for matches
 function checkLetters(letter) {
    let letterInWord = false;
    for (var i = 0; i < blanks; i++) {
      if (chosenGame[i] === letter) {
        letterInWord = true;
      }
    }
    if (letterInWord) {
      for (var x = 0; x < blanks; x++) {
        if (chosenGame[x] === letter) {
          blanksAndWins[x] = letter;
        }
      }
    } else {
      wrongGuesses.push(letter);
      numGuesses--;
    }
  }

// Run program!
hangman.startGame();
document.onkeyup = function(event) {
  lettersGuessed = String.fromCharCode(event.which).toLowerCase();
  checkLetters(lettersGuessed);
  hangman.endGame();
};
