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

const clearButton = document.getElementById('clear-button');
clearButton.addEventListener('click', clearScreen);

function clearScreen() {
  screen.textContent = "0";
  firstValue = 0;
  displayValue = 0;
  operator = null;
  timeToResetDisplay = false;
  subtextParagraph.textContent = "";
}

const MAX_NUMBERS = 16;
let displayValue;
const numberButtons = document.querySelectorAll('.number-button');
numberButtons.forEach((button) => {
  button.addEventListener('click', () => populate(button.textContent));
});

const screen = document.getElementById('screen-text');
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

const operationButtons = document.querySelectorAll('.operator-button');
operationButtons.forEach((button) => {
  button.addEventListener('click', () => setOperator(button.textContent));
})

let firstValue;
let operator = null;
let timeToResetDisplay = false;
function setOperator(op) {
  firstValue = displayValue;
  operator = op;
  console.log(operator);
  timeToResetDisplay = true;
  subtextParagraph.textContent = `${firstValue} ${operator}`;
}

const equalsButton = document.getElementById('equal-button');
equalsButton.addEventListener('click', evaluate);

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

const subtextParagraph = document.getElementById('subtext');

function round(value) {
  return parseFloat(value.toFixed(3))
}