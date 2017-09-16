var letters = "abcdefghijklmnopqrstuvwxyz";
var guesses = 10;
var wins = 0;
var guessesArray = [];
var wordNameArray = [];
var displayedNameArray = [];
var guessedWordsArray = [];
var wordIndex = Math.floor(Math.random() * (7 - 0)) + 0;
var isStarted = false
var displayedWord;
var themeMusic = new Audio('assets/sounds/CantinaTheme.mp3');
var gamOverMusic = new Audio('assets/sounds/game-over.mp3');
var successChime = new Audio('assets/sounds/success.mp3');

var words = {
    // Words to Guess and Hints
    0: {
        name: "anakin skywalker",
        hint: "There is no justifying... my actions"     
    },

    1: {
        name: "sheev palpatine",
        hint: "Everything is proceeding as I have foreseen"
    },
    2: {
        name: "wilhuff tarkin",
        hint: "Evacuate? In our moment of triumph? I think you overestimate their chances."     
    },

    3: {
        name: "lando calrissian",
        hint: "Why you slimy, double-crossing, no-good swindler."
    },
    4: {
        name: "jango fett",
        hint: "I am the best. Always was."     
    },

    5: {
        name: "mon mothma",
        hint: "Many Bothans died to bring us this information."
    },
    6: {
        name: "wedge antilles",
        hint: "Copy, Gold Leader. I'm already on my way out."     
    },

    7: {
        name: "admiral ackbar",
        hint: "It's a trap!"
    },
    8: {
        name: "leia organa",
        hint: "Would it help if I got out and pushed?"
    },
    9: {
        name: "maz kanata",
        hint: "If you live long enough, you see the same eyes in different people."     
    },

    10: {
        name: "supreme leader snoke",
        hint: "There has been an awakening. Have you felt it?"
    },
    11: {
        name: "general grievous",
        hint: "You Fool. I have been trained in your Jedi Arts"
    },
    12: {
        name: "poe dameron",
        hint: "I can fly anything."     
    },

    13: {
        name: "lor san tekka",
        hint: "Something far worse has happened to you."
    },
    // letter guessing rules
    guessedLetter: function(letter){
        var isCorrect = false;
        for (var i = 0; i < wordNameArray.length; i++){
            if (wordNameArray[i] === letter){
                displayedNameArray[i] = wordNameArray[i];
                displayedWord = displayedNameArray.join("");
                isCorrect = true;
            }
        }
        if (!isCorrect){
            guesses--;
        }
        words.updateBoard();
    },
    // Update displayed data
    updateBoard: function(){
        if (displayedWord === wordNameArray.join("")){
   
            words.nextWord();
            return;
        }
        var guessesHtml = "<td>GUESSES REMAINING</td> <td>" + guesses + "</td>";
        document.querySelector('#guesses-left').innerHTML = guessesHtml;
        var winsHtml = "<td>WINS</td> <td>" + wins + "</td>";
        document.querySelector('#wins').innerHTML = winsHtml;
        document.querySelector('#character-name').innerHTML = displayedWord;
        document.querySelector('#letters-used').innerHTML = guessesArray.join("  ");

        //game over rule
        if (guesses === 0){
            words.resetGame();
            document.getElementById("game-over").className = "";  
            document.getElementById("table").className = "hidden";
        }
    },
    // Start game rules
    startGame: function(){
        themeMusic.play();
        gamOverMusic.pause();
        
        isStarted = true;
        
        // set board
        var guessesHtml = "<td>GUESSES REMAINING</td> <td>" + guesses + "</td>";
        document.querySelector('#guesses-left').innerHTML = guessesHtml;
        var winsHtml = "<td>WINS</td> <td>" + wins + "</td>";
        document.querySelector('#wins').innerHTML = winsHtml;
        
        // get word
        var thisWord = words[wordIndex]
        wordNameArray = thisWord.name.split("");
        
        // Create array with unguessed letters
        for (var i = 0; i < wordNameArray.length; i++){
            if (letters.indexOf(wordNameArray[i]) !== -1){
                displayedNameArray.push("_");
            } else {
                displayedNameArray.push(" ");
            }
        }
        // display unguessed letters
        displayedWord = displayedNameArray.join("");
        document.querySelector('#character-name').innerHTML = displayedWord;
        document.querySelector('#hint').innerHTML = thisWord.hint;
        document.getElementById("game-over").className = "hidden";
        document.getElementById("press-to-start").className = "hidden";  
        document.getElementById("table").className = "";
        document.querySelector('#letters-used').innerHTML = guessesArray.join("");    
    },
    // next word
    nextWord: function(){
        themeMusic.play();
        guessedWordsArray.push(words[wordIndex])
        // if all guessed reset array
        if (guessedWordsArray.length === 13){
            guessedWordsArray = [];
        }
        // get next random word
        let currentIndex = wordIndex
        do {
            wordIndex = Math.floor(Math.random() * (13 - 0)) + 0;
        } 
        while (wordIndex == currentIndex || guessedWordsArray.indexOf(words[wordIndex]) !== -1)       

        wins++;
        guesses = 6;
        var guessesHtml = "<td>GUESSES REMAINING</td> <td>" + guesses + "</td>";
        document.querySelector('#guesses-left').innerHTML = guessesHtml;
        var winsHtml = "<td>WINS</td> <td>" + wins + "</td>";
        document.querySelector('#wins').innerHTML = winsHtml;
        var thisWord = words[wordIndex]
        wordNameArray = thisWord.name.split("");
        // reset word and guessed letters
        displayedNameArray = [];
        guessesArray = [];
        // Create array with unguessed letters
        for (var i = 0; i < wordNameArray.length; i++){
            if (letters.indexOf(wordNameArray[i]) !== -1){
                displayedNameArray.push("_");
            } else {
                displayedNameArray.push(" ");
            }
        }
        // display unguessed name
        displayedWord = displayedNameArray.join("");
        document.querySelector('#character-name').innerHTML = displayedWord;
        document.querySelector('#hint').innerHTML = thisWord.hint;
        document.querySelector('#letters-used').innerHTML = guessesArray.join("");
        successChime.play();
    },   
    resetGame: function(){
        // reset variables
        isStarted = false;
        guesses = 10;
        wins = 0;
        wordIndex = 0;
        wordNameArray = [];
        guessesArray = [];
        displayedWord =  "";
        displayedNameArray = [];
        themeMusic.pause();
        gamOverMusic.play();
    }
}

// Captures Key Clicks
document.onkeyup = function(event) {
    // if game isn't started set up the game
    if (!isStarted){
        words.startGame();
        return;
    }
    // Determines which exact key was selected. Makes it lowercase
    var userGuess = String.fromCharCode(event.keyCode).toLowerCase();
    // check letters used
    if (guessesArray.indexOf(userGuess) !== -1){
        alert("You already guessed '" + userGuess.toUpperCase() + "'");
        return;
    }
    // If user didn't press a letter return
    if (letters.indexOf(userGuess) === -1){
        return;
    } 
    
    
    guessesArray.push(userGuess);
    words.guessedLetter(userGuess)
    
}