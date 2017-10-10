var number = [0,1,2];
var boxContent = [0,1,2]; // 1 is first multiplier, 2 is second multiplier, 0 is result
var guess = 0;
const RESULT_DELAY = 1000;

initialize();

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function newOperation() {
  number[1] = getRandomInt(0,10);
  number[2] = getRandomInt(0,10);
  number[0] = number[1] * number[2];
  guess = 0;

  for (var i=0;i<3;i++) {
    boxContent[i] = number[i];
  }

  elementToGuess = getRandomInt(0,2);
  boxContent[elementToGuess]='?';

  for (var i=0;i<=2;i++) {
    showNumberContent(i,boxContent[i]);
  }

  document.getElementById('result').className = 'result result-pending'

}

function processDigit(digit) {
  guess = guess * 10 + digit;
  showNumberContent(elementToGuess,guess);
  // Same number of digits?
  if (guess.toString().length == number[elementToGuess].toString().length) {
      processResult(guess==number[elementToGuess]);
      setTimeout('newOperation()',RESULT_DELAY);
  }
}

function processResult(result) {
  if (result) {
    document.getElementById('result').className = 'result result-ok'
  } else {
    document.getElementById('result').className = 'result result-ko'
  }
}

function initialize() {
  addEvent(window, "keyup", commandKeyPress);
  newOperation();
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
  document.getElementById('number-' + index).innerHTML = content;
}
