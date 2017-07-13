/*jslint plusplus: true, vars: true, devel: true, browser: true */
/*global $, jQuery */

$(document).ready(function () {
    'use strict';
//Global variables
    var tryCount = 10,
        winPhrase = 'This is a really long test string.',
        phraseLetters = [],
        phraseLettersDivID = [],
        gameState = 'ready',
        guessesLeft = 3;
                  
//get all the letters in the target phrase and then create that many divs inside of the phrase container
//then populate the divs with either an underscore or a letter if that div has been clicked.
    function addLetterDiv(i) {
        $('.phraseContainer').append('<div class="phraseLetterDiv" id="phraseLetterID' + i + '">_</div>');
    }
    
    $('.gameStartButton').click(function () {
        console.log(gameState);
        switch (gameState) {
        case 'ready':
            gameState = 'busy';
            for (i = 0; i < winPhrase.length; i++) {
                setTimeout(addLetterDiv(i), i * 100);
            }

            setTimeout(function () {
                var allLetterDivs = $('.phraseLetterDiv');
                for (i = 0; i < winPhrase.length; i++) {
                    $(allLetterDivs[i]).attr('id', 'phraseLetterID' + i);
                }
                gameState = 'inplay';
            }, ((winPhrase.length) * 100) + 50);

            $('.gameStartButton').css('background-color', 'red');
                
            break;

        case 'inplay':
            for (i = 0; i < $('.phraseLetterDiv').length; i++) {
                phraseLettersDivID.push('#phraseLetterID' + i);
                console.log(phraseLettersDivID[i]);
                $(phraseLettersDivID[i]).css('background-color', 'yellow');

            }
            //remove all the divs. Ready gamestate.
            for (i = 0; i < winPhrase.length; i++) {
                $('#phraseLetterID' + i).remove();
            }

            gameState = 'ready';
            break;

        case 'busy':
            break;

        default:
            break;
        }

    });
    
    //Function for letter guess control
    function guessSubmit() {
        if (winPhrase.includes($('.inputTextBox').val())) {
            alert('YUP');
        } else {
            alert('NOPE');
            guessesLeft -= 1;
            if (guessesLeft === 0) {
                //show the div for game over and reset the game
                alert('Man has been hung.');
            }
        }
        
    }
    
    //Textbox input button control section
    $('.inputSubmitButton').click(function () {
        guessSubmit();
        $('.inputTextBox').val('');
    });
    
    $('.inputTextBox').keyup(function (e) {
        if (e.keyCode === 13) {
            guessSubmit();
        } else {
            $('.testDiv').html($('.inputTextBox').val());
        }
    });
    
    //clear on click/focus for text input box
    $('.inputTextBox').on('click focusin', function () {
        this.value = '';
    });
  
});