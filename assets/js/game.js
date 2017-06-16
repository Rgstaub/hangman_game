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
	muted: false,
	hints: 3,
	bonusMode: false, 
	bonusIndex: 0,
	
	toggleSound: function(className) {
		if (className === "glyphicon glyphicon-volume-up") {
			document.getElementById("muteButton").className = "glyphicon glyphicon-volume-off";
			game.muted = true;
			document.getElementById("backGroundMusic").pause();
		}
		else {
			document.getElementById("muteButton").className = "glyphicon glyphicon-volume-up";
			game.muted = false;
			document.getElementById("backGroundMusic").play();
		}
	},


	//Initialize the game. Reset the variables. Clear the board.
	newGame: function() {
		game.solvedSet = [];
		game.guessed = [];
		game.health = 6;
		game.lives = 3;
		game.hints = 3;
		game.level = 1;
		game.solution = game.catalog[Math.floor(Math.random() * game.catalog.length)].split("");
		console.log("Solution: " + game.solution);
		for (i = 0; i < game.solution.length; i++) {
			game.solvedSet[i] = "_";
		}
		if (game.muted === false) {
			document.getElementById("newGameSound").play();
		}
		game.refreshDisplay();
		document.getElementById("hintIcon").className = "hintsOn glyphicon glyphicon-question-sign";
		document.getElementById("messageDisplay").innerHTML = " ";
		// document.getElementById("messageDisplay").innerHTML = "NEW GAME";
	},

	newPuzzle: function() {
		game.solvedSet = [];
		game.guessed = [];
		game.health = 6;
		game.solution = game.catalog[Math.floor(Math.random() * game.catalog.length)].split("");
		console.log("Solution: " + game.solution);
		//Fill the solvedSet with '_' for each letter according to the length of the solution
		for (i = 0; i < game.solution.length; i++) {
			game.solvedSet[i] = "_";
		}
		game.refreshDisplay();
	},

	refreshDisplay: function() {
		document.getElementById("solvedDisplay").innerHTML = game.solvedSet.join("");
		document.getElementById("healthDisplay").innerHTML = "Guesses Remaining: " + game.health;
		document.getElementById("livesDisplay").innerHTML = "Lives Remaining: " + game.lives;
		document.getElementById("levelDisplay").innerHTML = "Level: " + game.level;
		document.getElementById("hintCounter").innerHTML = "Hints Remaining: " + game.hints;
		
		//loop through all of the 'letter'elements to reset the CSS to the un-guessed state
		var alphabet = document.getElementsByClassName("letter");
		for (var i = 0; i < alphabet.length; i++) {
			alphabet[i].className = "unpicked letter col-xs-3";
		}
	},

	hint: function() {
		if(game.hints > 1) {
			game.hints--;
			game.hintParse();
		}
		else if(game.hints === 1) {
			game.hints--;
			game.hintParse();
			document.getElementById("hintIcon").className = "hintsOff glyphicon glyphicon-question-sign";
		}
		else {
			document.getElementById("invalidKeySound").play();
		}	
	},

	hintParse: function() {
		var letterList = document.getElementsByClassName("unpicked");
		document.getElementById("hintSound").play();
		document.getElementById("hintCounter").innerHTML = "Hints Remaining: " + game.hints;
		for (var j = 0; j < letterList.length; j++) {
			if (game.solution.indexOf(letterList[j].id) !== -1) {
				console.log("Omitted correct letter: " + letterList[j].id);
			}
			else if (Math.random() > .5) { 
				letterList[j].classList.add("picked");
				letterList[j].classList.add("omitted");
				game.guessed.push(letterList[j].id);
			}
			else {
				console.log("randomly omitted incorrect letter :" + letterList[j].id)
			}			
		}
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
			if (game.muted === false) {
				document.getElementById("invalidKeySound").play();
			}
			document.getElementById("messageDisplay").innerHTML = "Invalid Key";
		}
	},

	//check if the key pressed has already been guessed. If no, continue to see if the guess is correct.
	repeatCheck: function(letter) {
		if (game.guessed.indexOf(letter) === -1) {
			game.guessed.push(letter);
			console.log("past guesses: " + game.guessed);
			document.getElementById(letter).className = "picked letter col-xs-3";
			console.log(letter);
			if (game.bonusMode === true) {
				game.bonusCorrectCheck(letter);
			}
			else {
				game.correctCheck(letter);
			}
		}
		else {
			if (game.muted === false) {
				document.getElementById("invalidKeySound").play();
			}
			console.log("invalid letter");
			document.getElementById("messageDisplay").innerHTML = "Already Guessed";
		}
	},

	//check if the guess is correct and if so, proceed to uppdate the solvedSet.
	//if not, reduce health by one
	correctCheck: function(letter) {
		if (game.solution.indexOf(letter) !== -1) {
			console.log("correct guess: " + letter);
			document.getElementById("messageDisplay").innerHTML = "Correct!";
			if (game.muted === false) {
				document.getElementById("correctSound").play();
			}
			game.submitToSolvedSet(letter);
		}
		else {
			game.health--;
			console.log("Incorrect Guess. " + game.health + " health remaining");
			document.getElementById("healthDisplay").innerHTML = "Guesses Remaining: " + game.health;
			document.getElementById("messageDisplay").innerHTML = "( " + letter + " )<br> Incorrect";
			if (game.muted === false) {
				document.getElementById("incorrectSound").play();
			}
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
		if (game.muted === false) {
			document.getElementById("nextLevelSound").play();
		}
		if (game.level === 5) {
			game.bonusMode = true;
			game.bonusNewGame();
		}
		else if (game.level > 5) {
			game.bonusNewPuzzle();
		}
		else {
			game.newPuzzle();
		}	
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
		else if (game.bonusMode === true) {
			if (game.muted === false) {
				document.getElementById("diedSound").play();
			}
			document.getElementById("messageDisplay").innerHTML = "<p>YOU LOSE</p>Solution: " + game.solution.join("");
			game.bonusNewPuzzle();
		}
		else {
			if (game.muted === false) {
				document.getElementById("diedSound").play();
			}
			document.getElementById("messageDisplay").innerHTML = "<p>YOU LOSE</p>Solution: " + game.solution.join("");
			game.newPuzzle();
		}
	},

	//If no lives remain, Game Over.
	gameOver: function() {
		console.log
		document.getElementById("messageDisplay").innerHTML = "<p>GAME OVER</p>Solution: " + game.solution.join("");
		game.level = 1;
		game.lives = 3;
		game.newGame();
	},


	bonusNewGame: function() {
		game.solvedSet = [];
		game.guessed = [];
		game.health = 1;
		game.hints = 0;
		game.bonusIndex = 0;
		game.solution = game.catalog[Math.floor(Math.random() * game.catalog.length)].split("");
		console.log("Solution: " + game.solution);
		console.log(game.bonusIndex);
		for (i = 0; i < game.solution.length; i++) {
			game.solvedSet[i] = "_";
		}
		if (game.muted === false) {
			document.getElementById("newGameSound").play();
		}
		game.bonusRefreshDisplay();
		game.bonusParse();
		document.getElementById("hintIcon").className = "hintsOff glyphicon glyphicon-question-sign";
		document.getElementById("messageDisplay").innerHTML = "BONUS MODE<p>Guess the letters in order</p>";
	},

	bonusNewPuzzle: function() {
		game.solvedSet = [];
		game.guessed = [];
		game.health = 1;
		game.bonusIndex = 0;
		game.solution = game.catalog[Math.floor(Math.random() * game.catalog.length)].split("");
		console.log("Solution: " + game.solution);
		console.log(game.bonusIndex);
		//Fill the solvedSet with '_' for each letter according to the length of the solution
		for (i = 0; i < game.solution.length; i++) {
			game.solvedSet[i] = "_";
		}
		game.bonusRefreshDisplay();
		game.bonusParse();
		document.getElementById("hintIcon").className = "hintsOff glyphicon glyphicon-question-sign";
		// document.getElementById("messageDisplay").innerHTML = "BONUS MODE<p>Guess the letters in order</p>";
		game.bonusParse();
		console.log("bonusNewPuzzle");
		console.log(game.bonusMode);
	},

	bonusRefreshDisplay: function() {
		document.getElementById("solvedDisplay").innerHTML = game.solvedSet.join("");
		document.getElementById("healthDisplay").innerHTML = "Guesses Remaining: " + game.health;
		document.getElementById("livesDisplay").innerHTML = "Lives Remaining: " + game.lives;
		document.getElementById("levelDisplay").innerHTML = "Level: " + game.level;
		document.getElementById("hintCounter").innerHTML = "Hints Remaining: " + game.hints;
		
		//loop through all of the 'letter'elements to reset the CSS to the un-guessed state
		var alphabet = document.getElementsByClassName("letter");
		for (var i = 0; i < alphabet.length; i++) {
			alphabet[i].className = "unpicked letter col-xs-3";
		}
	},

	bonusParse: function() {
		var letterList = document.getElementsByClassName("unpicked");
		document.getElementById("hintSound").play();
		document.getElementById("hintCounter").innerHTML = "Hints Remaining: " + game.hints;
		for (var j = 0; j < letterList.length; j++) {
			if (game.solution.indexOf(letterList[j].id) !== -1) {
				console.log("Omitted correct letter: " + letterList[j].id);
			}
			else {
				letterList[j].classList.add("picked");
				letterList[j].classList.add("omitted");
				game.guessed.push(letterList[j].id);
			}
		}
	},

	bonusCorrectCheck: function(letter) {
		//get to the next unsolved letter in the solution
		console.log("bonusCorrectCheck")
		while (game.solvedSet[game.bonusIndex] !== "_") {
			game.bonusIndex++;
		}
		console.log(game.bonusIndex);
		if (letter === game.solution[game.bonusIndex]) {
			game.submitToSolvedSet(letter);
			document.getElementById("messageDisplay").innerHTML = "Correct!";
			if (game.muted === false) {
				document.getElementById("correctSound").play();
			}	

		}
			
		else {
			game.health--;
			game.noHealthCheck();
			if (game.muted === false) {
					document.getElementById("incorrectSound").play();
			}
		}
	},
}

if(game.bonusMode === false) {
	game.newGame();
}


// Click the NEW GAME button to start a new game
// document.getElementById("newGameBtn").addEventListener("click", game.newGame); 

// Start the game process tree on key release
document.onkeyup = function(event) {
	game.validLetterCheck(event.keyCode);
};

//code to enable the tooltip function on the hint icon
$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip(); 
});
