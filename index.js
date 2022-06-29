
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
start();
//call the next sequence
function nextSequence() {
  randomNumber = Math.floor((Math.random() * 4));

  var chosenColor = buttonColors[randomNumber];
  //adding chosen color to gamePattern
  gamePattern.push(chosenColor);
  //making button flash
  $("#"+chosenColor).fadeOut(100).fadeIn(100);
  //playing audio
  var audio = new Audio("sounds/"+chosenColor+".mp3");
  audio.play();
  //increasing level
  level++
  $("h1").text("Level " + level);

  console.log(gamePattern);
}

//On click, call sound and button animation
$(".btn").click(function(event) {
  var userChosenColor = (this.id);
  userClickedPattern.push(userChosenColor);
  animatePress(userChosenColor);
  playSound(userChosenColor);
  console.log(userClickedPattern);
  checkPatterns(userClickedPattern.length-1);

});

//play sound
function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

//Animaate when user clicks button
function animatePress(currentColor){
  $( "."+currentColor).addClass( "pressed");
  setTimeout(function(){
    $( "."+currentColor).removeClass("pressed");
  }, 100);
}

//starting the game when user presses "A"
function start(){
$(document).keypress(function(event) {
  var pressedKey = (event.key);
  if (pressedKey == "a"){
    nextSequence();
  }
});
}

function checkPatterns(currentLevel){
  if (gamePattern[currentLevel] == userClickedPattern[currentLevel]){
    if (gamePattern.length == userClickedPattern.length) {
    userClickedPattern = [];
    setTimeout(function(){
      nextSequence();
    },1000);
  }
  }
  else{
    audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    $("h1").text("Game Over, Press any Key to restart");
    startOver();
  }
  }

    //restart the game if user presses a key
function startOver(){
    $(document).keypress(function(event) {
      gamePattern = [];
      level = 0;
      userClickedPattern = [];
      $("body").removeClass("game-over");
      nextSequence();
    });
  }
