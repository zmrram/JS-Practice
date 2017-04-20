'use strict';

var words = window.words;
var newWord = Math.floor(Math.random() * (words.length - 1));
var gameState = {
  correctCount: 0,
  incorrectGuesses: [],
  guessesRemaining: 10
};

function chooseWord() {
  return words[newWord];
}

function createWordTiles(word) {
  for (var i = 0; i < word.length; i++) {
    var div = document.createElement('div');
    div.className = 'letter';
    var word_div = document.getElementById('word');
    word_div.appendChild(div);
  }
}

function validate(guess) {
  var validated = false;
  if (guess.length == 1) {
    validated = true;
  }
  return validated;
}

function testGuess(guess) {
  var testWord = chooseWord();
  var indexArr = [];
  for (var i = 0; i < testWord.length; i++) {
    if (guess == testWord.charAt(i)) {
      indexArr.push(i);
      gameState.correctCount++;
    }
  }
  if (indexArr.length == 0){
    gameState.incorrectGuesses.push(guess+ " ");
  }
  else{
    gameState.incorrectGuesses.push("");
  }
  return indexArr;
}

function updateWordTiles(guess,indices) {
  var guess_box = document.getElementById('word').children;
  for (var i = 0; i < indices.length; i++) {
    guess_box[indices[i]].innerHTML = guess;
  }
}

function updateScoreboard(callback) {
  var incorrect = document.getElementById('incorrect');
  var remain = document.getElementById('remain-guess');
  incorrect.innerHTML += gameState.incorrectGuesses[gameState.incorrectGuesses.length - 1];
  remain.innerHTML = gameState.guessesRemaining;
  callback();
}

function winlose() {
  if (gameState.guessesRemaining == 0) {
    document.getElementById('guess-box').remove();
    document.getElementById('game-message').innerHTML += "<h1>YOU LOSE</h1>";
  } else if (gameState.correctCount == chooseWord().length) {
    document.getElementById('guess-box').remove();
    document.getElementById('game-message').innerHTML += "<h1>YOU WIN</h1>";
  }
}

function listen() {
  var input = document.getElementById('guess');
  var submit = document.getElementById('submit');
  var guess = null;
  submit.onclick = function (e) {
    e.preventDefault();
    guess = input.value;
    if (guess != null) {
      if (validate(guess) == true) {
        gameState.guessesRemaining -= 1;
        updateWordTiles(guess,testGuess(guess));
        updateScoreboard(winlose);
      } else {
        alert('Wrong input');
      }
    }
  };
}

function init() {
  createWordTiles(chooseWord());
  console.log(chooseWord());
  listen();
}
init();