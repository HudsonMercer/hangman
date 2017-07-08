$(document).ready(function(){
//Global variables
    var tryCount = 10;
    var winPhrase = 'This is a really long test string.';
    var phraseLetters = [];
    var phraseLettersDivID = [];
    var gameState = 'ready';
                  
    (winPhrase.indexOf('a')>-1) ? console.log('Yes') : console.log('No');
                  
//get all the letters in the target phrase and then create that many divs inside of the phrase container
//then populate the divs with either an underscore or a letter if that div has been clicked.
$('.gameStartButton').click(function(){
    console.log(gameState);
    switch(gameState){
            
        case 'ready':
            gameState = 'busy';
            for(i=0; i < winPhrase.length; i++){
                setTimeout(function(){
                $('.phraseContainer').append('<div class="phraseLetterDiv" id="phraseLetterID' + i + '">_</div>');
                }, i*100);
            }
            
            setTimeout(function(){
                var allLetterDivs = $('.phraseLetterDiv');
                
                for(i=0; i < winPhrase.length; i++){
                    $(allLetterDivs[i]).attr('id', 'phraseLetterID'+i);
                }
                gameState = 'inplay';
            }, ((winPhrase.length)*100)+50);
            
            $('.gameStartButton').css('background-color', 'red');
        break;
            
        case 'inplay':
            for(i=0; i < $('.phraseLetterDiv').length; i++){
                phraseLettersDivID.push('#phraseLetterID' + i);
                console.log(phraseLettersDivID[i]);
                $(phraseLettersDivID[i]).css('background-color', 'yellow');
                
            }
            //remove all the divs. Ready gamestate.
            for(i=0; i < winPhrase.length; i++){
                $('#phraseLetterID'+i).remove();
                }

            gameState = 'ready';
        break;
            
        case 'busy':
        break;
        
        default:
        break;
    }

});
    //Letter guess control section
    
    
    $('.inputTextBox').keyup(function(e){
        if(e.keyCode === 13){
            guessSubmit();
        } else {
            $('.testDiv').html($('.inputTextBox').val());
        }
    });
    
    //clear on click/focus
    $('.inputTextBox').on('click focusin', function(){
        this.value='';
    });
    
//    $('.inputSubmitButton, .inputTextBox').submit(function(){
//        console.log('sum text');
//    });
    
    function guessSubmit(){
        alert(($('.inputTextBox').val()));
        
        if(winPhrase.includes($('.inputTextBox').val())){
            alert('YUP');
        } else {
            alert('NOPE');
        }
        
    }
    
  
});