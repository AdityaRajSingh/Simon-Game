var gamePattern=[];
 var buttonColors=["red","blue","green","yellow"];
var userClickedPattern=[];
 var level=0;

var levelMax=0;
 var started = false;




$(document).keypress(function(){
    if(!started)
    {
    $("#level-title").text("Level "+level);
    nextSequence();
    started=true;
    }
});
 


$(".btn").click(function() {
var userChosenColor=$(this).attr("id");
userClickedPattern.push(userChosenColor);

animatePress(userChosenColor);
playSound(userChosenColor);
checkAnswer((userClickedPattern.length)-1);
});

function checkAnswer(currentLevel)
{
if(userClickedPattern[currentLevel]===gamePattern[currentLevel])
{
    if(userClickedPattern.length===gamePattern.length)
    {
    setTimeout(function(){ nextSequence();
    }, 1000);

    if(level>levelMax)
    {
        levelMax=level;
    }
    showLevel(levelMax);
    } 
        
}
else
{
    
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    playSound("wrong");
    startOver();
        setInterval(function(){
        $("body").removeClass("game-over");},200);
    showLevel(levelMax);
}
}


function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+level);
    var  randomNumber=Math.floor(Math.random()*4);
    var randomChosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    animatePress(randomChosenColor);
    playSound(randomChosenColor);
}

function playSound(name){
    var path="sounds/"+name+".mp3";
    var audio = new Audio(path);
    audio.play();
}

function animatePress(currentColor){
    $("#"+currentColor).fadeIn(100).fadeOut(100).fadeIn(100);
    $("#"+currentColor).addClass("pressed");
    setInterval(function(){
        $("#"+currentColor).removeClass("pressed");},100);
}

function startOver(){
level=0;
gamePattern=[];
started=false;
}

function showLevel(levelMax)
{
    $("#level").text("Highest Level Crossed: "+levelMax);
}