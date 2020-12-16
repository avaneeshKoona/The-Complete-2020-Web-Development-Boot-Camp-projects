var gamePattern = [];

var userClickedPattern = [];

var level = 0;

var index=0;

var buttonColours = ["red", "blue", "green", "yellow"];




$(document).on("keydown", function(event) {
  if (event.key === "a" && level === 0) {
    level++;
    nextSequence();
  }
});

  $(".btn").on("click", function(event) {

    if(level>0){
      var userChosenColour = event.target.id;
      userClickedPattern.push(userChosenColour);

      $("." + userChosenColour).addClass("pressed");
      setTimeout(function() {
        $("." + userChosenColour).removeClass("pressed");
      }, 50);

      playSound(userChosenColour);
      checkAnswer(index);
    }

  });




function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if(currentLevel===level-1){
          index=0;
          level++;
          userClickedPattern=[];
          setTimeout(nextSequence,1000);
        }
        else{
          index++;
        }
  }
  else{
    userClickedPattern=[];
    gamePattern=[];
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 50);
    $("#level-title").text("game over, press A key");
    index=0;
    level=0;
  }
}


function playSound(randomChosenColour) {
  var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
  audio.play();
}


function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("." + randomChosenColour).fadeOut(50).fadeIn(50);

  playSound(randomChosenColour);
  $("#level-title").text("level " + level);
}
