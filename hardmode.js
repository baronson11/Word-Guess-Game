const hangman = {
  gamesList: [],
  chosenGame: "",
  letters: [],
  blanks: 0,
  blanksAndWins: [],
  wrongGuesses: [],
  lettersGuessed: "",
  wins: 0,
  losses: 0,
  numGuesses: 0,

  printResults: function() {
    document.getElementById("guesses-left").innerHTML = hangman.numGuesses;
    document.getElementById("word-blanks").innerHTML = hangman.blanksAndWins.join(" ");
    document.getElementById("wrong-guesses").innerHTML = hangman.wrongGuesses.join(" ");
  }

  startGame: function() {
    hangman.numGuesses = 10;
    hangman.chosenGame = hangman.gamesList[Math.floor(Math.random() * gamesList.length)];
    hangman.letters = hangman.chosenGame.split("");
    hangman.blanks = hangman.letters.length;
    hangman.blanksAndWins = [];
    hangman.wrongGuesses = [];

    for (var i = 0; i < hangman.blanks; i++) {
      hangman.blanksAndWins.push("_");
    }
    hangman.printResults();
  }

  checkLetters: function(letter) {
    var letterInWord = false;
    for (var i = 0; i < blanks; i++) {
      if (hangman.chosenGame[i] === letter) {
        letterInWord = true;
      }
    }
    if (letterInWord) {
      for (var j = 0; j < blanks; j++) {
        if (hangman.chosenGame[j] === letter) {
          hangman.blanksAndWins[j] = letter;
        }
      }
      console.log(hangman.blanksAndWins);
    } else {
      hangman.wrongGuesses.push(letter);
      hangman.numGuesses--;
    }
  }

  roundComplete: function() {
    hangman.printResults();
    if (hangman.letters.toString() === hangman.blanksAndWins.toString()) {
      hangman.wins++;
      alert("You win!");
      document.getElementById("win-counter").innerHTML = hangman.wins;
      startGame();
    } else if (hangman.numGuesses === 0) {
      hangman.losses++;
      alert("You lose");
      document.getElementById("loss-counter").innerHTML = hangman.losses;
      startGame();
    }
  }
}

hangman.startGame();
document.onkeyup = function(event) {
  hangman.lettersGuessed = String.fromCharCode(event.which).toLowerCase();
  hangman.checkLetters(hangman.lettersGuessed);
  hangman.roundComplete();
};
