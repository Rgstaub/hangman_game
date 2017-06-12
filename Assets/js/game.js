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

var game = {
	catalog: ["abruptly", "absurd", "abyss", "affix", "askew", "avenue", "awkward", 
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
				"yachtsman", "yippee", "yoked", "youthful", "yummy", "zephyr", "zigzag", 
				"zigzagging", "zilch", "zipper", "zodiac", "zombie"],
	solution: [],
	solvedSet: [],
	guessed: [],
	lastGuess: " ",
	lives: 6,
	

	//Initialize the game
	initialize: function() {
		game.solution = game.catalog[Math.floor(Math.random() * game.catalog.length)].split("");
		console.log("Solution: " + game.solution);
		for (i = 0; i < game.solution.length; i++) {
			game.solvedSet[i] = "_";
		}
		game.guessed = [];
		game.lives = 6;
	},

	//check if key pressed is a valid a - z character. Caps are allowed
	validLetterCheck: function(keyCode) {
		if ((keyCode >= 65 && keyCode <= 90) || 
			(keyCode >= 97 && keyCode <= 122)) {
			console.log("valid key");
			game.repeatCheck(game.lastGuess);
		}
		else {
			console.log("invalid key");
			alert("Letters A-Z only!");
		}
	},

	//check if the key pressed has already been guessed. If no, continue to see if the guess is correct.
	repeatCheck: function(letter) {
		if (game.guessed.indexOf(letter) === -1) {
			game.guessed.push(letter);
			console.log("past guesses: " + game.guessed);
			game.correctCheck(letter);
			console.log(letter);
		}
		else {
			alert("You have already guessed '" + letter.toUpperCase() + "'. Guess again.");
			console.log("invalid letter");
		}
	},

	//check if the guess is correct and if so, proceed to uppdate the solvedSet.
	//if not, reduce lives by one
	correctCheck: function(letter) {
		if (game.solution.indexOf(letter) !== -1) {
			console.log("correct guess: " + letter);
			console.log("solution: " + game.solution);
			game.submitToSolvedSet(letter);
		}
		else {
			game.lives--;
			console.log("Incorrect Guess. " + game.lives + " lives remaining");
			game.noLivesCheck();
		}
	},

	//Loop through the solution and to lookup the index(es) of the correct letter.
	//add them to the solvedSet,
	submitToSolvedSet: function(letter) {
		for ( var i = 0; i < game.solution.length; i++) {
			if ( game.solution[i] === letter ) {
				game.solvedSet[i] = letter;
			}
		}
		console.log("Solved set: " + game.solvedSet);
		game.puzzleSolvedCheck();
	},

	//has the puzzle been solved?
	puzzleSolvedCheck: function() {
		if (game.solvedSet.indexOf("_") === -1) {
			game.youWin();
		}
	},

	//You win! Game over
	youWin: function() {
		console.log("Game Over - you win");
		game.initialize();
	},

	//Did you die?
	noLivesCheck: function() {
		if (game.lives === 0) {
			game.youLose();
		}
	},

	//Game over. Try again
	youLose: function() {
		console.log("Game over - you lose");
		game.initialize();
	},
}



	









// Initialize a new game on page load
game.initialize();

//start the game process tree on key release
document.onkeyup = function(event) {
	game.lastGuess = event.key.toLowerCase();
	game.validLetterCheck(event.keyCode);
} 