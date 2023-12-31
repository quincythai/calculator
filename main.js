const MAX_NUMBERS = 12;
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
const cButton = document.getElementById('c-button');


clearButton.addEventListener('click', clearScreen);
numberButtons.forEach((button) => {
  button.addEventListener('click', () => populate(button.textContent));
});
operationButtons.forEach((button) => {
  button.addEventListener('click', () => setOperator(button.textContent));
});
equalsButton.addEventListener('click', evaluate);
invertSignButton.addEventListener('click', swapSigns);
decimalButton.addEventListener('click', addDecimal);
cButton.addEventListener('click', deleteNumber);
document.addEventListener('keydown', handleKeyPress);

function clearScreen() {
  screen.textContent = "0";
  subtextParagraph.textContent = "";
  firstValue = 0;
  displayValue = 0;
  operator = null;
  timeToResetDisplay = false;
  isDecimal = false;
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
  if (operator === null && op != "=") { // first operation
    firstValue = displayValue;
    operator = op;
    timeToResetDisplay = true;
    displayValue = 0;
    isDecimal = false;
    subtextParagraph.textContent = `${firstValue} ${operator}`;
  } else { // subsequent operations
    evaluate();
  }
}

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
    isDecimal = false;
  }
}

function updateDisplay(result) {
  if (result === null) {
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
  if (!isDecimal) {
    if (displayValue === 0) {
      displayValue = Number(0);
      timeToResetDisplay = false;
    }
    let str = displayValue + ".";
    displayValue = Number(displayValue);
    screen.textContent = str;
    isDecimal = true;
  }
}

function deleteNumber() {
  if (displayValue !== 0) {
    let str = displayValue.toString(); // Convert displayValue to string
    str = str.substring(0, str.length - 1); // Remove the last character
    displayValue = Number(str); // Convert back to number
    screen.textContent = displayValue;
  }
}

// keydown is an event, we need to access its info with .key
function handleKeyPress(event) {
  const key = event.key;
  console.log(key)

  // Handle number keys
  if (/^[0-9]$/.test(key)) {
    populate(key);
  }
  // Handle operator keys
  else if (/^[+\-x/%]$/.test(key)) {
    if (key === "/") {
      setOperator('÷');
    } else {
      setOperator(key);
    }
  }
  // Handle "=" key
  else if (key === "=" || key === "Enter") {
    evaluate();
  }
  // Handle "C" key
  else if (key === "C" || key === "c") {
    clearScreen();
  }
  // Handle "." key for decimal point
  else if (key === ".") {
    addDecimal();
  }
  // Handle Backspace key
  else if (key === "Backspace") {
    deleteNumber();
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
