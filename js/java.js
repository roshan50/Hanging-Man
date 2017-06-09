function(){
var choices = ["DOG","BOOK","BAG","SHOP","APPLE","HOUSE","LIBRARY","OFFICE"];
var randWord;
var correct_space = '';
var wrong = 0;
var interval;

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    interval = setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            gameOver();
        }
    }, 1000);
}

function start() {
    var tenMinutes = 60 * 10;
    display = document.querySelector('#timer');
    startTimer(tenMinutes, display);

    document.querySelector('#wrong').value = '';
    document.querySelector(".message-div").style.top = "-150px";

    randWord = choices[Math.floor(Math.random() * choices.length)];
    for(var i = 0 ; i < randWord.length ; i++){
      correct_space +='_,';
    }
    correct_space = correct_space.slice(0, -1);
    document.querySelector('#answer').value = correct_space;

    // var btn = document.querySelector(".btn-default");
    var btn = document.getElementsByTagName("button");
    for(var i = 0; i < btn.length; i++){
      btn[i].disabled = false;
    }
}

function select_char(letter_btn){
  letter_btn.disabled = true;
  var letter_id = letter_btn.id;
  var index = randWord.indexOf(letter_id);
  if(index > -1){
    replaceAllIndexes(letter_id);
    var not_complete = correct_space.includes("_");
    if(!not_complete){
      show_message('you win!','lightgreen');
      reset();
    }
  }else{
    wrong++;
    document.querySelector('#wrong').value += letter_id;
    document.querySelector('#image').src = "images/hm"+wrong+".gif";
    if(wrong == 10){
      gameOver();
    }
  }
}
function replaceAllIndexes(val) {
    var i = -1;
    while ((i = randWord.indexOf(val, i+1)) != -1){
        index = i*2;
        correct_space = correct_space.substring(0, index) + val + correct_space.substring(index+1);
    }
    document.querySelector('#answer').value = correct_space;
}

function show_message(message,color) {
  var elem = document.querySelector(".message-div");
  var context = document.querySelector(".messages");
  context.innerHTML = message;
  context.style.backgroundColor = color;
  var pos = -150;
  var id = setInterval(frame, 15);
  function frame() {
    if (pos == 5) {
      clearInterval(id);
    } else {
      pos++;
      elem.style.top = pos + 'px';
    }
  }
}

function gameOver(){
  show_message('Game Over!','red');
  reset();
}

function reset(){
  var btn = document.getElementsByTagName("button");
  for(var i = 0; i < btn.length; i++){
    btn[i].disabled = true;
  }
  document.querySelector("#strt").disabled = false;
  clearInterval(interval);
  correct_space = '';
  wrong = 0;
}


}();
