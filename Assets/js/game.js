/*	Pseudo Code:
	
	sttart a game
		reset the counters/display
		Pick a word from the catalog of words
		convert the word to an array
		display the word

	Register a user keypress. 
	Store it as a variable
	check if it is already in our array of previous guesses
	If it is, prompt user for a new entry
	if not, add it to the array and update the display
	check if the guess is correct
	if incorrect, decrease 'lives' by 1 and update the display
	if correct, reveal the letter(s)
		get the indexOf for each match
		update html for according to returned index(es)
		replace matched letters with 'blanks' into the array
*/

var catalog = ["cat", "bat", "rat", "sat"];
var solution = ["t", "e", "s", "t"];
var guessed = [];
var lastGuess;

function validLetterCheck(keyCode) {
	console.log(keyCode);
	if ((keyCode >= 65 && keyCode <= 90) || 
		(keyCode >= 97 && keyCode <= 122)) {
		console.log("valid letter");
		repeatCheck(lastGuess);
	}
	else {
		console.log("invalid letter");
		alert("Letters A-Z only!");
	}
}

function repeatCheck(letter) {
	if (guessed.indexOf(letter) !== -1) {
		alert("You have already guessed '" + letter.toUpperCase() + "'. Guess again.");
		console.log("invalid keypress");
	}
	else {
		guessed.push(letter);
		console.log(guessed);
	}
}

function correctCheck (letter) {
	if (solution.indexOf(letter) === -1) {

	}
}

document.onkeyup = function(event) {
	lastGuess = event.key.toLowerCase();
	validLetterCheck(event.keyCode);
	
}