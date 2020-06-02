var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red","blue","green","yellow"];
var level = 0;
var started = false;


function nextsequence(){
  userClickedPattern = [];

  level++;

  $("#level-title").text("Level " + level);
  var RandomNumber = Math.floor(Math.random()*4);

  var RandomChosenColor = buttonColors[RandomNumber];

  gamePattern.push(RandomChosenColor);

  $("#"+RandomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

 playSound(RandomChosenColor);


}

function playSound(name){
  var music = new Audio("sounds/"+ name +".mp3");
  music.play();
}

function animatePress(currentColor){
  $("#"+ currentColor).addClass("pressed");
  setTimeout(function() {
  $("#" + currentColor).removeClass("pressed");
}, 100);
}

function checkAnswer(currentLevel){
if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
  console.log("success");
  if (userClickedPattern.length === gamePattern.length){

    //5. Call nextSequence() after a 1000 millisecond delay.
    setTimeout(function () {
      nextsequence();
    }, 1000);

  }
}
else{
  console.log("wrong");

  //2. In the styles.css file, there is a class called "game-over", apply this class to the body of the website when the user gets one of the answers wrong and then remove it after 200 milliseconds.
  playSound("wrong");

  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);

  //3. Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.
  $("#level-title").text("Game Over, Press Any Key to Restart");

  startOver()
}
}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}


$(document).keypress(function(event){
  if (!started) {
    //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    $("#level-title").text("Level " + level);
    nextsequence();
    started = true;
  }
})

$(".btn").click(function(){
var userChosenColor = $(this).attr("id");
userClickedPattern.push(userChosenColor);
playSound(userChosenColor);
animatePress(userChosenColor);
checkAnswer(userClickedPattern.length-1);
});
