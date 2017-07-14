//Global variables
/*jslint plusplus: true, vars: true, devel: true, browser: true */
/*global $, jQuery */
var tryCount = 10,
    winPhrase = 'This is a regular String.',
    phraseLetters = [],
    phraseLettersDivID = [],
    gameState = 'ready',
    guessesLeft = 3;

$(document).ready(function () {
    'use strict';
/*get all the letters in the win phrase and then create that many divs inside of the phrase container
then populate the divs with either an underscore or a letter if that div has been clicked. */
    function addLetterDiv(i) {
        $('.phraseContainer').append('<div class="phraseLetterDiv" id="phraseLetterID' + i + '">_</div>');
    }
    
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
                for (i = 0; i < winPhrase.length; i++) {
                    $(allLetterDivs[i]).attr('id', 'phraseLetterID' + i);
                }
                gameState = 'inplay';
            }, ((winPhrase.length) * 100) + 50);

            $(this).css('background-color', 'red');
            $(this).val('Stop Game');
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
            $(this).css('background-color', 'green');
            $(this).val('Start Game');
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
        
        var i = 0,
            j = 0,
            letterIndices = [],
            allLetterDivs = $('.phraseLetterDiv');
        
        if (winPhrase.toLowerCase().includes($('.inputTextBox').val().toLowerCase()) && gameState === 'inplay') {
//            alert('YUP');
            for (i = 0; i < winPhrase.length; i++) {
                if (winPhrase[i].toLowerCase() === $('.inputTextBox').val().toLowerCase()) {
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
        } else if (gameState === 'inplay') {
            alert('NOPE');
            guessesLeft -= 1;
            if (guessesLeft === 0) {
                //show the div for game over and reset the game
                alert('Man has been hung.');
                guessesLeft = 3;
            }
        }
        $('.inputTextBox').val('');
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