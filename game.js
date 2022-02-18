var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;
var highScore = 0;

$(document).keypress(function () {
    if (!started){
        $("h1").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".simon").on("click", function()
{
    var userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);
    
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
})

function checkAnswer(currentLevel)
{
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel])
    {
        if (userClickedPattern.length === gamePattern.length)
        {
            setTimeout(() => {
               nextSequence(); 
            }, 1000);
        }
    }
    else
    {
        playSound("wrong");
        $("body").addClass("game-over");
        $("h1").text("Game Over, Press Any Key to Restart");

        setTimeout(() => {
           $("body").removeClass("game-over"); 
        }, 200);

        if (level > highScore)
        {
            $("h2").text("Highscore: " + (level-1)); 
        }

        startOver();
    }
}

function nextSequence()
{
    userClickedPattern = [];
    level++;
    $("h1").text("Round " + level);
    var randomNumber = getRandomInt(0,3);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    
    flashEffect(randomChosenColour);
    playSound(randomChosenColour);

}

function startOver() 
{
    level = 0;
    gamePattern = [];
    started = false;
}

function animatePress(color)
{
    $("#"+color).addClass("pressed");
    setTimeout(function() {
        $("#"+color).removeClass("pressed");
    }, 100);
}
function playSound(color)
{
    var sound = new Audio("sounds/"+color+".mp3");
    sound.play();
}
function flashEffect(color)
{
    $("#" + color).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}
function getRandomInt(min, max) 
{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}