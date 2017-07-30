//Global variables
/*jslint plusplus: true, vars: true, devel: true, browser: true */
/*global $, jQuery */
var tryCount = 10,
    phrases = ['There is no time like the present.', 'Nobody loves you.', 'If you never fail, try harder.', 'War is good for absolutely nothing.', 'Winter'],
    winPhrase = 'This is a regular test phrase.',
    phraseLetters = [],
    phraseLettersDivID = [],
    gameState = 'ready',
    guessesLeft = 6,
    guessesGiven = 6,
    guessedLetters = '',
    phraseMap = {};
    
$(document).ready(function () {
    'use strict';
    $('.winFrame').hide();
    $('.loseFrame').hide();
    
    
    //Function definitions
    //Maps random number from range arg2-arg3 to arg4-arg5 from arg1.
    function mapNumber(numberIn, minIn, maxIn, minOut, maxOut) {
        var y = (numberIn - minIn) / (maxIn - minIn) * (maxOut - minOut) + minOut;
        return Math.round(y);
    }
    //Function to set the win phrase.
    function startGame() {
        var i = Math.random(),
            j = 0;
        console.log(i);
        i = mapNumber(i, 0, 1, 0, phrases.length - 1);
        console.log(i);
        i = Math.round(i);
        
        console.log(i);
        console.log(phrases[i]);
        winPhrase = phrases[i];
    }
    //Function to map number of letter occurances in string passed to it and returns the map.
    function testFunction(inputString) {
        var i = 0;
        for (i = 0; i < inputString.length; i++) {
            phraseMap[inputString[i]] = inputString.match(new RegExp(inputString[i], 'g')).length;
        }
        return phraseMap;
    }
    //Adds a letter div to the phrase container with the ID of phraseLetterDiv(i) when called.
    function addLetterDiv(i) {
        $('.phraseContainer').append('<div class="phraseLetterDiv" id="phraseLetterID' + i + '">_</div>');
    }
    
    //Reset game, pretty self-explanitory. Called when you need to reset the game.
    function resetGame() {
        var i = 0;
        if (gameState === 'inplay' || 'busy') {
            for (i = 0; i < winPhrase.length; i++) {
                $('#phraseLetterID' + i).remove();
            }
            $('.gameStartButton').css('background-color', 'green');
            $('.gameStartButton').val('Start Game');
            $('.hangmanGraphic').css('background-color', 'dodgerblue');
            guessedLetters = [];
            guessesLeft = guessesGiven;
            gameState = 'ready';
        }
    }
    
    //Called to win the game
    function winGame() {
        $('.winFrame').show();
        gameState = 'busy';
    }
    
    //Called to lose the game
    function loseGame() {
        $('.loseFrame').show();
        gameState = 'busy';
    }

    //Iterate over guessed letters, if true for all, win the game and reset.
    function checkWinGame() {
        var i = 0;
        
        for (i = 0; i < winPhrase.length; i++) {
            if (guessedLetters.toLowerCase().indexOf(winPhrase[i].toLowerCase()) !== -1) {
                if (i === winPhrase.length - 1) {
                    console.log('Game Won!');
                    winGame();
                }
            } else if (guessedLetters.toLowerCase().indexOf(winPhrase[i].toLowerCase()) === -1) {
                return;
            }
        }
        
    }
    
    //Controls what happens when a player guesses a letter.
    function guessSubmit() {

        var i = 0,
            j = 0,
            letterIndices = [],
            allLetterDivs = $('.phraseLetterDiv'),
            bodyParts = $('.hangmanGraphic');
        //if the text in the input box matches a character in the win string while the game is 'inplay' and the player has not already guessed the letter...
        if (winPhrase.toLowerCase().includes($('.inputTextBox').val().toLowerCase()) && gameState === 'inplay' && guessedLetters.toLowerCase().indexOf($('.inputTextBox').val().toLowerCase()) === -1) {
            
            guessedLetters += $('.inputTextBox').val().toString();
            //Run through the winPhrase and see if where the character falls at, then add the index and value to letterIndicies in that order.
            for (i = 0; i < winPhrase.length; i++) {
                if (winPhrase[i].toLowerCase() === $('.inputTextBox').val().toLowerCase() && $('.inputTextBox').val().toLowerCase() !== ' ') {
                    letterIndices.push(i);
                    letterIndices.push(winPhrase[i]);
                    //store index, value, ...
                    //Change letter div html to value, by index, to stored content at given index to reveal the letter to the player.
                    for (j = 0; j < letterIndices.length; j += 2) {
                        $(allLetterDivs[letterIndices[j]]).html(letterIndices[j + 1]);
                    }
                }
            }

            checkWinGame();
          //If the player guessed a letter that is NOT in the winPhrase string, remove a guess, change the corrisponding hangman graphic and then add the letter to the guessed letters string.
        } else if (gameState === 'inplay' && guessedLetters.toLowerCase().indexOf($('.inputTextBox').val().toLowerCase()) === -1) {
            guessesLeft -= 1;
            guessedLetters += $('.inputTextBox').val().toString();
            //TODO: Add sound/visual alert to the player failing to guess a correct letter.
            for (i = 0; i <= guessesGiven - guessesLeft; i++) {
                $(bodyParts[i]).css('background-color', 'red');
            }
            
            if (guessesLeft === 0) {
                loseGame();
            }
                
          //If the player guesses a letter that has already been guessed, tell them so. No penalty.
        } else if (guessedLetters.toLowerCase().indexOf($('.inputTextBox').val().toLowerCase()) !== -1 && gameState === 'inplay') {
            //TODO: add sound/visual alert that the player has already guessed that letter or it was given to them for free.
            alert('LETTER ALREADY GUESSED IDIOT');
        }

        $('.inputTextBox').val('');
    }
    
    //Start game button control section
    $('.gameStartButton').click(function () {
        var i = 0;
//        console.log(gameState);
        switch (gameState) {
                
        case 'ready':
            gameState = 'busy';
            startGame();
            for (i = 0; i < winPhrase.length; i++) {
                setTimeout(addLetterDiv, i * 100, i);
            }
            setTimeout(function () {
                var allLetterDivs = $('.phraseLetterDiv');
                //Fill in special characters for free and add them to the guessed letters list.
                for (i = 0; i < winPhrase.length; i++) {
                    $(allLetterDivs[i]).attr('id', 'phraseLetterID' + i);
                    if (winPhrase[i] === ' ') {
                        $(allLetterDivs[i]).html('&nbsp');
                        guessedLetters += ' ';
                    } else if (winPhrase[i].match(/[!@#$%\^&*()\-+=_';":?.,]/) !== null) {
                        $(allLetterDivs[i]).html(winPhrase[i]);
                        guessedLetters += $(allLetterDivs[i]).html();
                    }
                }
                gameState = 'inplay';
            }, ((winPhrase.length) * 100) + 50);

            $(this).css('background-color', 'red');
            $(this).val('Stop Game');
            break;

        case 'inplay':
            //TODO: Indicate game has been lost and give player button to reset the game instead of just resetting the game automatically without output.
            resetGame();
            break;

        case 'busy':
            break;

        default:
            break;
        }

    });
    
    //Textbox input button control section
    $('.inputSubmitButton').click(function () {
        guessSubmit();
        $('.inputTextBox').val('');
    });
    
    //Clean up code to keep the text box clear of unnessicary characters and starting text
    $('.inputTextBox').keyup(function (e) {
        if (e.keyCode === 13) {
            //Guess a letter the player pressed enter.
            guessSubmit();
        } else {
            $('.testDiv').html($('.inputTextBox').val());
        }
    });
    
    //Clear on click/focus for text input box
    $('.inputTextBox').on('click focusin', function () {
        this.value = '';
    });
    
    //Reset the game when the player wins and clicks on the win banner.
    $('.winFrame').click(function () {
        resetGame();
        $('.winFrame').hide();
    });
    
    //Reset the game when the player loses and clicks on the win banner.
    $('.loseFrame').click(function () {
        resetGame();
        $('.loseFrame').hide();
    });
    
  
});