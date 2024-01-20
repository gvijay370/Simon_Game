
var buttonColours = ['green', 'red', 'yellow', 'blue' ];
var gamePattern = [];
var level = 1;
var flag = 0;
var i =0;
var started = false;


function nextSequence(){
    
    if (started == false)    {  
        i = 0;
        flag=0;
        $('h1').text("level "+level);
        var randomNumber = rand();
        var randomChosenColour = buttonColours[randomNumber]
        gamePattern.push(randomChosenColour);
        
        
        $("."+randomChosenColour).fadeOut(100);
        $("."+randomChosenColour).fadeIn(100);
      
        soundplay(randomChosenColour);
        started = true;
        
    }
}

$(document).keypress(function(){
    nextSequence();
});



$('[type=button]').click(function(){
   
    animatePress($(this).attr('id'));

   soundplay($(this).attr('id'));

   afterclick($(this).attr('id'));

   
});

function afterclick(color){
    if (flag == 1){
        game_over();
    }
    
    else if(i<gamePattern.length && color == gamePattern[i] ){
            i++;
            
    }
    else{
            game_over();
        }
    
        if(flag==0 && i==gamePattern.length){
            level++;
            started=false;
            nextSequence();
        }
    
}




function rand(){

    return Math.floor(Math.random()*4);
}

function soundplay(color){
    var audio = new Audio("./sounds/"+color+".mp3");
    audio.play();
}

function animatePress(color){
    $('.'+color).addClass("pressed");
    setTimeout(function(){
        $('.'+color).removeClass("pressed");
    }, 100);
}


function game_over(){
    $('h1').text("Game Over, Press Any Key to Restart");

    $('body').addClass("game-over");
setTimeout(function(){
    $('body').removeClass("game-over");
}, 200);

    soundplay('wrong');
    flag = 1;
    level = 1;
    started=false;
    gamePattern=[];
}