var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var roundCounter = gamePattern.length;
var userClickedPattern = [];
var roundValidations = 0;

$("body").one("keypress", function () {
    console.log("game start!");
    $("h1").text("Round " + roundCounter);
    nextSequence();
});

function checkIfUserRight(userChosenColour, roundValidations)
{
    if (gamePattern[roundValidations] == userChosenColour)
    {
        console.log(gamePattern[roundValidations] + " game pattern");
        console.log(userChosenColour + " user chosen colour");
        roundValidations++;
    }
    else
    {
        $("h1").text("Game Over!");
        console.log("mistake");
        playSound("wrong");
    }
}

$(".simon").on("click", function(event)
{
    var userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);
    
    playSound(userChosenColour);
    animatePress(userChosenColour);
    
    checkIfUserRight(userChosenColour);
    if (roundCounter === roundValidations+1)
    {
       console.log(roundValidations + " round validations");
       console.log(roundCounter + " round counter");
       nextSequence();
   }
})

function nextSequence()
{
    var roundValidations = 0;
    userClickedPattern = [];
    var randomNumber = getRandomInt(0,3);
    var randomChosenColour = buttonColours[randomNumber];
    console.log("next sequence color: " + randomChosenColour);
    gamePattern.push(randomChosenColour);
    
    playSound(randomChosenColour);
    flashEffect(randomChosenColour);

    roundCounter++;
    $("h1").text("Round " + roundCounter);
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
