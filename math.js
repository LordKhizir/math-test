var number = [0,1,2];
var boxContent = [0,1,2]; // 1 is first number, 2 is second number, 0 is result
var upTo = [0,10,10];
var guess = 0;
var operation = 'x';
var counterOK = 0;
var counterKO = 0;

const RESULT_DELAY = 1000;

initialize();


function start() {
    upTo[1] = document.getElementById('select-1').value;
    upTo[2] = document.getElementById('select-2').value;
    operation = document.getElementById('select-operation').value;
    counterOK = 0;
    counterKO = 0;
    writeById('counter-ok',counterOK);
    writeById('counter-ko',counterKO);
    writeById('operation', operation);
    document.getElementById('play-area').className = '';
    newOperation();
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function newOperation() {
  number[1] = getRandomInt(0,upTo[1]);
  number[2] = getRandomInt(0,upTo[2]);
  switch(operation) {
    case '+': number[0] = number[1] + number[2];
      break;
    case 'x': number[0] = number[1] * number[2];
        break;
  }
  guess = 0;
  for (var i=0;i<3;i++) {
    boxContent[i] = number[i];
  }
  elementToGuess = getRandomInt(0,2);
  boxContent[elementToGuess]='?';
  for (var i=0;i<=2;i++) {
    showNumberContent(i,boxContent[i]);
  }
  document.getElementById('result').className = 'result pending'
}

function processDigit(digit) {
  guess = guess * 10 + digit;
  showNumberContent(elementToGuess,guess);
  // Same number of digits?
  if (guess.toString().length == number[elementToGuess].toString().length) {
      processResult(guess==number[elementToGuess] || (operation=='x' && number[0]==0 && elementToGuess!=0) );
      setTimeout('newOperation()',RESULT_DELAY);
  }
}

function processResult(result) {
  if (result) {
    document.getElementById('result').className = 'result ok'
    counterOK = counterOK + 1;
    writeById('counter-ok',counterOK);
  } else {
    document.getElementById('result').className = 'result ko'
    counterKO = counterKO + 1;
    writeById('counter-ko',counterKO);
  }
}

function initialize() {
  addEvent(window, "keyup", commandKeyPress);
}

function commandKeyPress(e) {
  const ASCII_0 = 48;
  const ASCII_9 = 57;
  if(e.which >=ASCII_0 && e.which<=ASCII_9){// NUMBER key pressed
    var digit = e.which - ASCII_0;
    processDigit(digit);
  }
}

function addEvent(element, eventName, callback) {
    if (element.addEventListener) {
        element.addEventListener(eventName, callback, false);
    } else if (element.attachEvent) {
        element.attachEvent("on" + eventName, callback);
    }
}

function showNumberContent(index, content) {
  writeById('number-' + index, content);
}

function writeById(id,content) {
  document.getElementById(id).innerHTML = content;
}
