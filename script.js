
  
//js for timer 4-116
const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 30;
const ALERT_THRESHOLD = 15;

const COLOR_CODES = {
  info: {
    color: "green"
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD
  }
};

const TIME_LIMIT = 60;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;
let remainingPathColor = COLOR_CODES.info.color;

document.getElementById("app").innerHTML = `
<div class="base-timer">
  <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer__circle">
      <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
      <path
        id="base-timer-path-remaining"
        stroke-dasharray="283"
        class="base-timer__path-remaining ${remainingPathColor}"
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
      ></path>
    </g>
  </svg>
  <span id="base-timer-label" class="base-timer__label">${formatTime(timeLeft)}</span>
</div>
`;



function onTimesUp() {
  clearInterval(timerInterval);
  check();
}
let executed=false;

function startTimer() {
  
  if(executed==true){
    return;
  }
  executed=true;
  timerInterval = setInterval(() => {
    timePassed = timePassed += 1;
    timeLeft = TIME_LIMIT - timePassed;
    document.getElementById("base-timer-label").innerHTML = formatTime(
      timeLeft
    );
    setCircleDasharray();
    setRemainingPathColor(timeLeft);

    if (timeLeft === 0) {
      onTimesUp();
    }
  }, 1000);
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${minutes}:${seconds}`;
}

function setRemainingPathColor(timeLeft) {
  const { alert, warning, info } = COLOR_CODES;
  if (timeLeft <= alert.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(warning.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(alert.color);
  } else if (timeLeft <= warning.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(info.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(warning.color);
  }
}

function calculateTimeFraction() {
  const rawTimeFraction = timeLeft / TIME_LIMIT;
  return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
  const circleDasharray = `${(
    calculateTimeFraction() * FULL_DASH_ARRAY
  ).toFixed(0)} 283`;
  document
    .getElementById("base-timer-path-remaining")
    .setAttribute("stroke-dasharray", circleDasharray);
}
let i=0, accuracy=0,wordsPerMin = 0, charPerMin = 0,txtArr;
let firstspace = false,spaces = 0,display = "",mytxt,txt,text;
var gettxt  = function (){
    $.ajax({
      url:'./para.txt',
      success: function (data){
        mytxt = data.split('\n');
        text = "";
        text = (mytxt[Math.floor(Math.random() * mytxt.length)]);
        text1();

      }
    });
  }();

function text1(){
  txtArr = text.split(' ');
  console.log(txtArr);
  while(spaces != 6){
    display += " ";
    display += txtArr[spaces];
    spaces++;
  }
  document.getElementById('displayText').innerHTML = '<h2>'+ display+'<h2>';
}
function checkword(letter){
  startTimer();
  var str = letter.value;
  var res = str.charAt(str.length-1);
  if( res == " "){
    wordsPerMin++;
    document.getElementById('inputTexts').value = "";
    if(str == (txtArr[i]+" ")){
      accuracy++;
    }
    
    display += " ";
    display += txtArr[spaces++];
    let display2 = display.split(' ');
    if(firstspace == false){
      display2.shift();
      firstspace = true;
    }
    display2.shift();
    display = display2.join(' ');
    var typeWord = display2[0];
    display2.shift();
    display2 = " "+display2.join(' '); 
   
    
    document.getElementById('displayText').innerHTML = '<p class= "typeWord" id="typeWord">' + typeWord + '</p><p class="restWord">' + display2 + '</p>';
    i++;
  }else{
    charPerMin++;
  }
  document.getElementById('wordsPerMin').innerHTML = accuracy+ '<h5>words/min</h5>';
  document.getElementById('charPerMin').innerHTML = charPerMin +'<h5>no. of key strokes</h5>';
  document.getElementById('accuracy').innerHTML = parseInt((accuracy/wordsPerMin)*100) + '<h5>accuracy</h5>';
}
let messageToBeDisplay;
function check(){
  console.log("check");
  document.getElementById('message').style.display="flex";
  document.getElementById('container').style.opacity= 0.5;
  document.getElementById('inputTexts').style.display = "none";
  if(accuracy <= 35){
    document.getElementById('image1').style.display= "block";
    messageToBeDisplay = "You're a Turtle.";
  }else if(accuracy <= 42 ){
    document.getElementById('image2').style.display= "block";
    messageToBeDisplay = "You're a Rabbit";
  }else{
    document.getElementById('image3').style.display= "block";
    messageToBeDisplay = "You're a Tiger";
  }
  document.getElementById('message-div').innerHTML='<h2>'+messageToBeDisplay+'</h2><h3>Well... You type with the speed of '+ accuracy +' WPM. Your accuracy was '+ parseInt((accuracy/wordsPerMin)*100)+'%. It could be better!</h3>';
}
function tryAgain(){
  window.location.reload();
}
