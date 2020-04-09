var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var level = 0;
var started = false;

//On Start
$(document).keypress(function() {
  if (!started) {
    nextSequence();
    started = true;
  }
})

function nextSequence() {
  //Reset user input each level
  userClickedPattern = [];

  //Display Level
  level++;
  $("#level-title").text("level " + level);

  //Choosing Colour
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  //Animation and Sound of buttton
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

//When user clicks button
$(".btn").click(function() {
  if (!started) {
    nextSequence();
    started = true;
  } else {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
  }
});

function playSound(name) {
  var audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("." + currentColour).addClass("pressed");
  setTimeout(function() {
    $("." + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {

  //Check if users choice is correct
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("Success");
    //Check if pattern is complete
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  }
  //If user is wrong
  else {
    console.log("Wrong Answer");
    userWrong();
  }
}

function userWrong() {
  var wrongAudio = new Audio("./sounds/wrong.mp3");
  wrongAudio.play();
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over")
  }, 200);
  $("h1").text("Game Over, Press Any Key To Restart");
  startOver();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}