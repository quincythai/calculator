const MAX_NUMBERS = 16;
let displayValue = 0;
let firstValue = 0;
let operator = null;
let timeToResetDisplay = false;
let isDecimal = false;

const screen = document.getElementById('screen-text');
const subtextParagraph = document.getElementById('subtext');

const clearButton = document.getElementById('clear-button');
const numberButtons = document.querySelectorAll('.number-button');
const operationButtons = document.querySelectorAll('.operator-button');
const equalsButton = document.getElementById('equal-button');
const invertSignButton = document.getElementById('inverse-button');
const decimalButton = document.getElementById('decimal-button');

clearButton.addEventListener('click', clearScreen);
numberButtons.forEach((button) => {
  button.addEventListener('click', () => populate(button.textContent));
});
operationButtons.forEach((button) => {
  button.addEventListener('click', () => setOperator(button.textContent));
});
equalsButton.addEventListener('click', evaluate);
invertSignButton.addEventListener('click', swapSigns);
decimalButton.addEventListener('click', decimalButton);

function clearScreen() {
  screen.textContent = "0";
  firstValue = 0;
  displayValue = 0;
  operator = null;
  timeToResetDisplay = false;
  subtextParagraph.textContent = "";
}

function populate(number) {
  if (screen.textContent.length < MAX_NUMBERS || timeToResetDisplay) {
    if (screen.textContent === "0" || timeToResetDisplay) {
      screen.textContent = number;
      timeToResetDisplay = false;
    } else {
      screen.textContent += number;
    }
    displayValue = Number(screen.textContent);
    if (operator != null) {
      subtextParagraph.textContent = `${firstValue} ${operator} ${displayValue}`;
    } else {
      subtextParagraph.textContent = "";
    }
  }
}

function setOperator(op) { 
  if (operator === null && op != "=") { // very first operation
    firstValue = displayValue; // store the firstValue
    displayValue = null;
    operator = op;
    timeToResetDisplay = true;
    subtextParagraph.textContent = `${firstValue} ${operator}`;
  } else { // subsequent operations
    evaluate();
  }
}

// TODO: Figure out how to evaluate a pair first before another operator is processed
// 
function evaluate() {
  // in order to not break equals sign
  if (firstValue != null && operator != null && displayValue != null) {
    // perform calculation and display result
    let result = operate(operator, firstValue, displayValue);
    updateDisplay(result);

    // case: user enters another operator
    if (operator !== "=") {
      subtextParagraph.textContent = `${firstValue} ${operator} ${displayValue} = `;
      firstValue = displayValue;
    } else { // case: user hit = button
      subtextParagraph.textContent = "";
      firstValue = 0;
    }

    displayValue = Number(screen.textContent);
    timeToResetDisplay = true; // next number will clear screen
    operator = null; // reset everytime regardless of outcome
  }
}

function updateDisplay(result) {
  if (result === null) {
    screen.style.fontSize = "26px";
    if (operator === '%') {
      screen.textContent = "Error, cannot % by 0.";
    } else if (operator === '÷') {
      screen.textContent = "Error, cannot ÷ by 0.";
    } else {
      screen.textContent = "Error";
    }
    timeToResetDisplay = true; 
  } else {
    screen.textContent = round(result);
  }
}

function round(value) {
  return parseFloat(value.toFixed(3))
}

function swapSigns() {
  displayValue = -displayValue;
  screen.textContent = displayValue;
}

function addDecimal() {
  if (isDecimal) {
    
  } else {
    
  }
}

// Functions for addition, subtraction, multiplication, division, and modulo
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) return null;
  else return a / b;
}

function modulo(a, b) {
  if (b === 0) return null;
  else return a % b;
}

// Returns the result of using a operator b.
function operate(operator, a, b) {
  switch (operator) {
    case '+':
      return add(a, b);
    case '-':
      return subtract(a, b);
    case 'x':
      return multiply(a, b);
    case '÷':
      return divide(a, b);
    case '%':
      return modulo(a, b);
    default:
      alert("Error");
      return null;
  }
}
