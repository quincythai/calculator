const MAX_NUMBERS = 16;
let displayValue;
let firstValue;
let operator = null;
let timeToResetDisplay = false;

const screen = document.getElementById('screen-text');
const subtextParagraph = document.getElementById('subtext');

const clearButton = document.getElementById('clear-button');
const numberButtons = document.querySelectorAll('.number-button');
const operationButtons = document.querySelectorAll('.operator-button');
const equalsButton = document.getElementById('equal-button');

clearButton.addEventListener('click', clearScreen);
numberButtons.forEach((button) => {
  button.addEventListener('click', () => populate(button.textContent));
});
operationButtons.forEach((button) => {
  button.addEventListener('click', () => setOperator(button.textContent));
});
equalsButton.addEventListener('click', evaluate);

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
    }
  }
}

function setOperator(op) {
  firstValue = displayValue;
  operator = op;
  timeToResetDisplay = true;
  subtextParagraph.textContent = `${firstValue} ${operator}`;
}

function evaluate() {
  if (firstValue != null && operator != null) {
    let result = operate(operator, firstValue, displayValue);
    updateDisplay(result);
    subtextParagraph.textContent = `${firstValue} ${operator} ${displayValue} = `;
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
