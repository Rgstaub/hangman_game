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

var game = {}
var catalog = ["abruptly", "absurd", "abyss", "affix", "askew", "avenue", "awkward", 
				"axiom", "azure", "bagpipes", "bandwagon", "banjo", "bayou", "beekeeper", 
				"bikini", "blitz", "blizzard", "boggle", "bookworm", "boxcar", 
				"buckaroo", "buffalo", "buffoon", "buxom", "buzzard", "buzzing", "buzzwords", 
				"cobweb", "cockiness", "croquet", "crypt", "curacao", "cycle", 
				"daiquiri", "disavow", "dizzying", "duplex", "dwarves", "embezzle", 
				"equip", "espionage", "exodus", "faking", "fishhook", "fixable", 
				"fjord", "flapjack", "flopping", "fluffiness", "flyby", "foxglove", "frazzled", 
				"fuchsia", "funny", "gabby", "galaxy", "galvanize", "gazebo", 
				"gizmo", "glowworm", "glyph", "gnarly", "gossip", 
				"grogginess", "haiku", "haphazard", "hyphen", "icebox", "injury", 
				"ivory", "ivy", "jackpot", "jaundice", "jawbreaker", "jaywalk", "jazziest", 
				"jazzy", "jelly", "jigsaw", "jinx", "jiujitsu", "jockey", "jogging", "joking", 
				"jovial", "joyful", "juicy", "jukebox", "jumbo", "kayak", "kazoo", "keyhole", 
				"khaki", "kilobyte", "kiosk", "kitsch", "klutz", "knapsack", 
				"larynx", "lengths", "lucky", "luxury", "lymph", "marquis", "matrix", 
				"megahertz", "microwave", "mnemonic", "mystify", "nightclub", 
				"nowadays", "numbskull", "nymph", "onyx", "ovary", "oxidize", "oxygen", 
				"pajama", "peekaboo", "phlegm", "pixel", "pizazz", "pneumonia", "polka", "pshaw", 
				"psyche", "puppy", "puzzling", "quartz", "queue", "quips", "quixotic", "quiz", 
				"quizzes", "quorum", "razzmatazz", "rhubarb", "rhythm", "rickshaw", "schnapps", 
				"scratch", "shiv", "snazzy", "sphinx", "spritz", "squawk", "staff", "strength", 
				"strengths", "stretch", "stronghold", "stymied", "subway", "swivel", "syndrome", 
				"thriftless", "thumbscrew", "topaz", "transcript", "transgress", "transplant", 
				"triphthong", "twelfth", "twelfths", "unknown", "unworthy", "unzip", "uptown", 
				"vaporize", "vixen", "vodka", "voodoo", "vortex", "voyeurism", "walkway", "waltz", 
				"wave", "wavy", "waxy", "wellspring", "wheezy", "whiskey", "whizzing", "whomever", 
				"wimpy", "witchcraft", "wizard", "woozy", "wristwatch", "wyvern", "xylophone", 
				"yachtsman", "yippee", "yoked", "youthful", "yummy", "zephyr", "zigzag", "zigzagging", "zilch", "zipper", "zodiac", "zombie"];
var solution = [];
var solvedSet = [];
var guessed = [];
var lastGuess;
var lives = 6;

//Initialize the game
function initialize() {
	var rng = Math.floor(Math.random() * catalog.length);
	solution = catalog[rng].split("");
	console.log("Solution: " + solution);
	for (i = 0; i < solution.length; i++) {
		solvedSet[i] = "_";
	}
	guessed = [];
	lives = 6;
}


//check if key pressed is a valid a - z character. Caps are allowed
function validLetterCheck(keyCode) {
	if ((keyCode >= 65 && keyCode <= 90) || 
		(keyCode >= 97 && keyCode <= 122)) {
		console.log("valid key");
		repeatCheck(lastGuess);
	}
	else {
		console.log("invalid key");
		alert("Letters A-Z only!");
	}
}

//check if the key pressed has already been guessed. If no, continue to see if the guess is correct.
function repeatCheck(letter) {
	if (guessed.indexOf(letter) === -1) {
		guessed.push(letter);
		console.log(guessed);
		correctCheck(letter);
		console.log(letter);
	}
	else {
		alert("You have already guessed '" + letter.toUpperCase() + "'. Guess again.");
		console.log("invalid letter");
	}
}

//check if the guess is correct and if so, proceed to uppdate the solvedSet.
//if not, reduce lives by one
function correctCheck(letter) {
	if (solution.indexOf(letter) !== -1) {
		console.log("correct guess: " + letter);
		console.log("solution: " + solution);
		submitToSolvedSet(letter);
	}
	else {
		lives--;
		console.log("Incorrect Guess. " + lives + " lives remaining");
		noLivesCheck();
	}
}

//Loop through the solution and to lookup the index(es) of the correct letter.
//add them to the solvedSet,
function submitToSolvedSet(letter) {
	for ( var i = 0; i < solution.length; i++) {
		if ( solution[i] === letter ) {
			solvedSet[i] = letter;
		}
	}
	console.log("Solved set: " + solvedSet);
	puzzleSolvedCheck();
}

//has the puzzle been solved?
function puzzleSolvedCheck() {
	if (solvedSet.indexOf("_") === -1) {
		youWin();
	}
}

//You win! Game over
function youWin() {
	console.log("Game Over - you win");
	initialize();
}

//Did you die?
function noLivesCheck() {
	if (lives === 0) {
		youLose();
	}
}

//Game over. Try again
function youLose() {
	console.log("Game over - you lose");
	initialize();
}

// Initialize a new game on page load
initialize();

//start the game process tree on key release
document.onkeyup = function(event) {
	lastGuess = event.key.toLowerCase();
	validLetterCheck(event.keyCode);
} 