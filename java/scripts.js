//Global variables
/*jslint plusplus: true, vars: true, devel: true, browser: true */
/*global $, jQuery */
var tryCount = 10,
    phrases = ['This is a phrase', 'Win phrase 2'],
    winPhrase = 'w w w w x x 3 3 5 ',
    phraseLetters = [],
    phraseLettersDivID = [],
    gameState = 'ready',
    guessesLeft = 3,
    guessedLetters = '',
    phraseMap = {};
    

$(document).ready(function () {
    'use strict';
    
    //Function definitions
    //Function to map number of letter occurances in string passed to it and returns the map
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
    
    //Reset game, pretty self-explanitory.
    function resetGame() {
        var i = 0;
        if (gameState === 'inplay') {
//            for (i = 0; i < $('.phraseLetterDiv').length; i++) {
//                phraseLettersDivID.push('#phraseLetterID' + i);
////                console.log(phraseLettersDivID[i]);
//                $(phraseLettersDivID[i]).css('background-color', 'yellow');
//            }
            //remove all the divs. Ready gamestate.
            for (i = 0; i < winPhrase.length; i++) {
                $('#phraseLetterID' + i).remove();
            }
            $('.gameStartButton').css('background-color', 'green');
            $('.gameStartButton').val('Start Game');
            guessedLetters = [];
            guessesLeft = 3;
            gameState = 'ready';
            alert('YOU DIED');
        }
    }

    //Iterate over guessed letters, if true for all, win the game and reset.
    function checkWinGame() {
        var i = 0;
        
        for (i = 0; i < winPhrase.length; i++) {
            if (guessedLetters.toLowerCase().indexOf(winPhrase[i].toLowerCase()) !== -1) {
                if (i === winPhrase.length - 1) {
                    console.log('Game Won!');
                }
            } else if (guessedLetters.toLowerCase().indexOf(winPhrase[i].toLowerCase()) === -1) {
                return;
            }
        }
        
    } //THIS CODE IS SHITE, REFACTOR/REWRITE IT.
    
    //Controls what happens when a player guesses a letter.
    function guessSubmit() {

        var i = 0,
            j = 0,
            letterIndices = [],
            allLetterDivs = $('.phraseLetterDiv');

        if (winPhrase.toLowerCase().includes($('.inputTextBox').val().toLowerCase()) && gameState === 'inplay' && guessedLetters.toLowerCase().indexOf($('.inputTextBox').val().toLowerCase()) === -1) {
//            alert('YUP'); 
            guessedLetters += $('.inputTextBox').val();

            for (i = 0; i < winPhrase.length; i++) {
                if (winPhrase[i].toLowerCase() === $('.inputTextBox').val().toLowerCase() && $('.inputTextBox').val().toLowerCase() !== ' ') {
                    letterIndices.push(i);
                    letterIndices.push(winPhrase[i]);
//                    console.log(letterIndices);
                    //store index, value, ...
                    //Change div html to value by index stored with content of index
                    for (j = 0; j < letterIndices.length; j += 2) {
                        $(allLetterDivs[letterIndices[j]]).html(letterIndices[j + 1]);
                    }
                }
            }

            checkWinGame();

        } else if (gameState === 'inplay' && guessedLetters.toLowerCase().indexOf($('.inputTextBox').val().toLowerCase()) === -1) {
            if (guessesLeft === 0) {
                //TODO: add div to show game over and reset the game on loss.
                resetGame();
            } else {
                alert('E404: LETTER NOT FOUND');
                guessesLeft -= 1;
            }

        } else if (guessedLetters.toLowerCase().indexOf($('.inputTextBox').val().toLowerCase()) !== -1) {
            alert('LETTER ALREADY GUESSED IDIOT');
        }

        $('.inputTextBox').val('');
    }
    
    //Start game button control section
    $('.gameStartButton').click(function () {
        var i = 0;
        console.log(gameState);
        switch (gameState) {
                
        case 'ready':
            gameState = 'busy';
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
  
});