var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
//Create a new variable called level and start at level 0.
var level=0;
// -----new----
/* You'll need a way to keep track of wether if the game
has started or not,so you call nextSequence() on the first keypress
*/
var started=false;

$(".btn").click(function(){

  var userChosenColour=$(this).attr("id");
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer((userClickedPattern.length)-1);

  // setTimeout(nextSequence(),3000);

});
//
function playSound(name){
  var audio = new Audio('sounds/'+name+'.mp3');
  audio.play();
}
/*
Use jQuery to detect when a keyboard key has pressed,
when that happens for the fist time,call nextSequence().
*/
$(document).keydown(function(){
  /*
  3.the h1title starts out saying "Press A Key to Start",
  when the games has started,change this to say "Level 0".
  */
  if(!started){
  $("#level-title").text("Level "+level);
  nextSequence();
  started=true;
  }
});


function nextSequence(){
  userClickedPattern=[];
  level++
  $("#level-title").text("Level "+level);

  var randomNumber=Math.floor(Math.random()*4);
  var randomChosenColor=buttonColours[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}




function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel){
  if (userClickedPattern[currentLevel]===gamePattern[currentLevel]) {
    console.log("Success");
    if(userClickedPattern.length===gamePattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }else{
    console.log("Wrong");
    var audio = new Audio('sounds/wrong.mp3');
    audio.play();
    $("body").addClass("game-over");
    $("#level-title").text("Game Over,Press Any Key");
    setTimeout(function(){
      $("body").removeClass("game-over");},200
    );
    startOver();
  }
}
function startOver(){
  level=0;
  gamePattern=[];
  userClickedPattern=[];
  started=false;
}
