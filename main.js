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
  if (b === 0) {
    errorByZeroDivison = true;
  }
  return a / b;
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
    case '/':
      return divide(a, b);
    default:
      console.log("Error");
      break;
  }
}

// allows number buttons to display on calculator screen
let displayValue = 0;
let firstValue = 0;
let secondValue = 0;
let result = 0;
let operator = null;
let pendingOperation = false;
let errorByZeroDivison = false;

const display = document.getElementById('screen-text');
const numberButtons = document.querySelectorAll(".number-button");

// can use empty argument and arrow function to avoid passing e to function
// i.e. JS preserves references to the button object
numberButtons.forEach(button => {
  button.addEventListener('click', () => populate(button.innerHTML));
})

function populate(number) {
  if (displayValue === 0) {
    display.innerHTML = "";
  } 

  if (pair) {
    display.innerHTML = number;
  } else {
    display.innerHTML += number;
  }
  displayValue = parseInt(display.innerHTML);
}

const operatorButtons = document.querySelectorAll(".operator-button");
operatorButtons.forEach(button => {
  button.addEventListener('click', () => setOperator(button.innerHTML));
});

function setOperator(op) {
  if (pair) {
    calculate();
  } else {
    operator = op;
    firstValue = displayValue;
    pair = true;
    clearDisplay();
  }
}

const clearButton = document.getElementById('clear-button');
clearButton.addEventListener('click', clearDisplay);
function clearDisplay() {
  displayValue = 0;
  display.innerHTML = "0";
  console.log(displayValue);
}

// Rounds value to 3 decimals
function displayResult(value) {
  // First get decimal (EX: 0.500), then remove trailing 0's
  if (errorByZeroDivison) {
    display.innerHTML = "Error, divison by 0";
  } else {
    display.innerHTML = parseFloat(value.toFixed(3));
  }
}

const equalButton = document.getElementById('equal-button');
equalButton.addEventListener('click', calculate)

function calculate() {
  if (pendingOperation) {
    secondValue = displayValue;
    result = operate(operator, firstValue, secondValue);
    displayResult(result);
  }
}

function reset() {
  displayValue = 0;
  firstValue = 0;
  secondValue = 0;
  operator = null;
  pendingOperation = false;
}