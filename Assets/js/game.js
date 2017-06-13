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
	if incorrect, decrease 'health' by 1 and update the display
	if correct, reveal the letter(s)
*/

// The hangman game object
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
				"twelfth", "twelfths", "unknown", "unworthy", "unzip", "uptown", 
				"vaporize", "vixen", "vodka", "voodoo", "vortex", "voyeurism", "walkway", "waltz", 
				"wave", "wavy", "waxy", "wellspring", "wheezy", "whiskey", "whizzing", "whomever", 
				"wimpy", "witchcraft", "wizard", "woozy", "wristwatch", "wyvern", "xylophone", 
				"yachtsman", "yippee", "yoked", "youthful", "yummy", "zephyr", "zigzag", 
				"zigzagging", "zilch", "zipper", "zodiac", "zombie"],
	solution: [],
	solvedSet: [],
	guessed: [],
	health: 6,
	lives: 3,
	level: 1,
	


	//Initialize the game. Reset the variables. Clear the board.
	newGame: function() {
		game.solvedSet = [];
		game.guessed = [];
		game.health = 6;
		game.lives = 3;
		game.solution = game.catalog[Math.floor(Math.random() * game.catalog.length)].split("");
		console.log("Solution: " + game.solution);
		for (i = 0; i < game.solution.length; i++) {
			game.solvedSet[i] = "_";
		}
		game.refreshDisplay();
		// document.getElementById("messageDisplay").innerHTML = "NEW GAME";
	},

	newPuzzle: function() {
		game.solvedSet = [];
		game.guessed = [];
		game.health = 6;
		game.solution = game.catalog[Math.floor(Math.random() * game.catalog.length)].split("");
		console.log("Solution: " + game.solution);
		for (i = 0; i < game.solution.length; i++) {
			game.solvedSet[i] = "_";
		}
		game.refreshDisplay();
		// document.getElementById("messageDisplay").innerHTML = "NEW GAME";
	},

	refreshDisplay: function() {
		document.getElementById("solvedDisplay").innerHTML = game.solvedSet.join("");
		document.getElementById("guessedDisplay").innerHTML = "Already Guessed: " + game.guessed;
		document.getElementById("healthDisplay").innerHTML = "Health Remaining: " + game.health;
		document.getElementById("livesDisplay").innerHTML = "Lives Remaining: " + game.lives;
		document.getElementById("levelDisplay").innerHTML = "Level: " + game.level;
	},

	//check if key pressed is a valid a - z character. Caps are allowed. If yes, pass it on
	//to the next function
	validLetterCheck: function(keyCode) {
		if ((keyCode >= 65 && keyCode <= 90) || 
			(keyCode >= 97 && keyCode <= 122)) {
			console.log("valid key");
			var letter = String.fromCharCode(keyCode).toLowerCase();
			game.repeatCheck(letter);
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
			document.getElementById("guessedDisplay").innerHTML = "Already Guessed: " + game.guessed;
			game.correctCheck(letter);
			console.log(letter);
		}
		else {
			alert("You have already guessed '" + letter.toUpperCase() + "'. Guess again.");
			console.log("invalid letter");
		}
	},

	//check if the guess is correct and if so, proceed to uppdate the solvedSet.
	//if not, reduce health by one
	correctCheck: function(letter) {
		if (game.solution.indexOf(letter) !== -1) {
			console.log("correct guess: " + letter);
			document.getElementById("messageDisplay").innerHTML = "Correct!";
			game.submitToSolvedSet(letter);
		}
		else {
			game.health--;
			console.log("Incorrect Guess. " + game.health + " health remaining");
			document.getElementById("healthDisplay").innerHTML = "Health Remaining: " + game.health;
			document.getElementById("messageDisplay").innerHTML = "Incorrect";
			game.noHealthCheck();
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
		document.getElementById("solvedDisplay").innerHTML = game.solvedSet.join("");
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
		game.level++;
		console.log("level: " + game.level);
		document.getElementById("levelDisplay").innerHTML = "Level: " + game.level;
		document.getElementById("messageDisplay").innerHTML = "NEXT LEVEL";
		game.newGame();
	},

	//Did you die?
	noHealthCheck: function() {
		if (game.health === 0) {
			game.youLose();
		}
	},

	//You died. Try again
	youLose: function() {
		game.lives--;
		if (game.lives === 0) {
			game.gameOver();
		}
		else {
			console.log("Game over - you lose");
			document.getElementById("messageDisplay").innerHTML = "New Life - GET READY!";
			game.newPuzzle();
		}
	},

	//If no lives remain, Game Over.
	gameOver: function() {
		console.log
		document.getElementById("messageDisplay").innerHTML = "GAME OVER";
		game.level = 1;
		game.lives = 3;
		game.newGame();
	},
}


// Click the NEW GAME button to start a new game
document.getElementById("newGameBtn").addEventListener("click", game.newGame); 

// Start the game process tree on key release
document.onkeyup = function(event) {
	game.validLetterCheck(event.keyCode);
}