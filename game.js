
var gamePattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var userClickedPattern=[];

var toggleFirst = true;
var level = 0;

$(document).on("keypress", function(e){
    if (toggleFirst == true){
        nextSequence();
        toggleFirst = false;
    }
});

function playSound(name){
    var audio = new Audio('sounds/'+name+".mp3");
    audio.play();
}

function nextSequence(){
    userClickedPattern = [];
   var randomNumber =  Math.floor(Math.random() * 4);
   var randomChosenColour = buttonColours[randomNumber];
   gamePattern.push(randomChosenColour);

   level++;
   $("h1").text("Level "+ level);

   $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
   playSound(randomChosenColour)

}

$(".btn").click(function(e){
    var userChosenColour = $(e.target).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);

    console.log(userClickedPattern);
    console.log(gamePattern);  

})

function checkAnswer(present){
    
    if(userClickedPattern[present] == gamePattern[present]){
        console.log("success");

        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }else{
        console.log("wrong");
        var GO = new Audio("sounds/wrong.mp3");
        GO.play();

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200)

        $("h1").text("Game Over, Press Any Key to Restart")
        
        startOver()
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    toggleFirst = true;
}

function animatePress(currentColour) {
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100)
}

