var number = [0,1,2];
var boxContent = [0,1,2]; // 1 is first number, 2 is second number, 0 is result
var upTo = [0,10,10];
var guess = 0;
var operation = 'x';
var counterOK = 0;
var counterKO = 0;
var resultTable;

const RESULT_DELAY = 1000;

initialize();

function initialize() {
  addEvent(window, "keyup", commandKeyPress);
  upTo[1] = getParameterByName('firstNumber',10);
  alert(upTo[1]);
  upTo[2] = getParameterByName('secondNumber',10);
  var operationCode = getParameterByName('operation','MULT');
  if (operationCode=='MULT') {
    operation = 'x'
  } else {
    operation = '+'
  }
  counterOK = 0;
  counterKO = 0;
  writeById('counter-ok',counterOK);
  writeById('counter-ko',counterKO);
  writeById('operation', operation);
  document.getElementById('play-area').className = '';
  generateResultTable(upTo[1],upTo[2]);
  newOperation();
}


function newOperation() {
  number[1] = getRandomInt(0,upTo[1]);
  number[2] = getRandomInt(0,upTo[2]);
  var gotBackOnce = 0;
  // ONLY use this number if it has not been asked yet
  while (resultTable[number[1]][number[2]]!=0) {
    console.log(number[1] + ',' + number[2]);
    if (number[1]<upTo[1]) {
      number[1]++;
    } else if (number[2]<upTo[2]) {
      number[1]=0;
      number[2]++;
    } else {
      if (gotBackOnce==1) {
          alert('Se acabó!')
          break;
      } else {
        number[1]=0;
        number[2]=0;
        gotBackOnce = 1;
      }
    }
  }
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
  var resultCellKey = 'result-' + number[1] + '-' + number[2];
  if (result) {
    document.getElementById(resultCellKey).className = 'cell-ok';
    resultTable[number[1]][number[2]] = 1;
    document.getElementById('result').className = 'result ok';
    counterOK = counterOK + 1;
    writeById('counter-ok',counterOK);
  } else {
    document.getElementById(resultCellKey).className = 'cell-ko';
    resultTable[number[1]][number[2]] = -1;
    document.getElementById('result').className = 'result ko';

    counterKO = counterKO + 1;
    writeById('counter-ko',counterKO);
  }
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

/* Generate result table, PLUS its representation */
function generateResultTable(firstNumber, secondNumber) {
  resultTable = new Array(firstNumber);
  var table = document.getElementById('result-table');
  for (var y=0;y<=firstNumber;y++) {
    var row = table.insertRow(y);
    resultTable[y] = new Array(secondNumber);
    for (var x=0;x<=secondNumber;x++) {
      resultTable[y][x] = 0; // 0 means "not set yet"
      var cell = row.insertCell(x);
      cell.id = 'result-' + y + '-' + x;
      cell.innerHTML = y + 'x' + x;
      cell.className = 'cell-pending';
    }
  }
}

/* Utils functions - domain agnostic */


function writeById(id,content) {
  document.getElementById(id).innerHTML = content;
}

function getParameterByName(name, defaultValue) {
    var url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return defaultValue;
    if (!results[2]) return defaultValue;
    var paramValue = decodeURIComponent(results[2].replace(/\+/g, " "));
    if (paramValue) {
      return paramValue;
    } else {
      return defaultValue;
    }
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
