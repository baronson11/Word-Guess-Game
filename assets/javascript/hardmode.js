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

// More Globals - Counters
let wins = 0;
let losses = 0;
let numGuesses = 10;


// IMPORTANT: Prints results to page - leave this above object so that when startGame runs
// this is already loaded!!!

function printResults() {
  document.getElementById("guesses-left").innerHTML = numGuesses;
  document.getElementById("word-blanks").innerHTML = blanksAndWins.join(" ");
  document.getElementById("wrong-guesses").innerHTML = wrongGuesses.join(" ");
}

// Hangman object with methods to start game, check letters and end the game
const hangman = {

  startGame: function() {
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
  },

  checkLetters: function(letter) {
     let letterInWord = false;
     for (let i = 0; i < blanks; i++) {
       if (chosenGame[i] === letter) {
         letterInWord = true;
       }
     }
     if (letterInWord) {
       for (let x = 0; x < blanks; x++) {
         if (chosenGame[x] === letter) {
           blanksAndWins[x] = letter;
         }
       }
     } else {
       wrongGuesses.push(letter);
       numGuesses--;
     }
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


// Run program! leave this here!!!! must be able to refer to methods in object
// object needs to load first
hangman.startGame();
document.onkeyup = function(event) {
  lettersGuessed = String.fromCharCode(event.which).toLowerCase();
  hangman.checkLetters(lettersGuessed);
  hangman.endGame();
};
