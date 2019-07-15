const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let begin = false;
let level = 0;
$(document).keypress(function() { 
    if (!begin) {
        $("h1").text(`LEVEL ${level}`);
        nextSequence();
        begin = true;
    }
});



function nextSequence(){
    userClickedPattern = [];
    level++;
    $("h1").text(`LEVEL ${level}`);
    const randomNumber = Math.floor(Math.random()*4);
    const randomChosenColor = buttonColors[randomNumber];    
    gamePattern.push(randomChosenColor);
    playSound(randomChosenColor);
    $("#"+randomChosenColor).toggleClass("pressed");
    setTimeout(function (){
        $("#"+randomChosenColor).toggleClass("pressed");
    }, 150);
    
}


$(".btn").click(function(){
    const userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    $("#"+userChosenColor).toggleClass("pressed");
    setTimeout(function (){
        $("#"+userChosenColor).toggleClass("pressed");
    }, 150);
    checkAnswer(userClickedPattern.length-1);
});



function checkAnswer(currentlevel){
    if (gamePattern[currentlevel] === userClickedPattern[currentlevel]){
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000); 
        }
    } else {
        playSound("wrong")
        $("body").toggleClass("game-over");
        $("h1").text(`Game Over. Press Any Key to Restart`);
        setTimeout(function(){
            $("body").toggleClass("game-over");
        }, 200);
        startOver();
    } 
}

function playSound(sound){
    const aud = new Audio(`sounds/${sound}.mp3`);
    aud.play();
};


function startOver(){
    
    level = 0;
    gamePattern = [];
    begin = false;
}