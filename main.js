function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  if (b === 0) {
    return "Error, division by 0.";
  }
  return a * b;
}

function divide(a, b) {
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
let operator = null;
let pair = false;

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
  display.innerHTML += number;
  displayValue = parseInt(display.innerHTML);
  console.log(displayValue);
}

const operatorButtons = document.querySelectorAll(".operator-button");
operatorButtons.forEach(button => {
  button.addEventListener('click', () => setOperator(button.innerHTML));
});

function setOperator(op) {
    operator = op;
    firstValue = displayValue;
    clearDisplay();
    pair = true;
}

const clearButton = document.getElementById('clear-button');
clearButton.addEventListener('click', clearDisplay);
function clearDisplay() {
  displayValue = 0;
  display.innerHTML = "0";
  console.log(displayValue);
}

function displayResult(value) {
  display.innerHTML = value;
}

const equalButton = document.getElementById('equal-button');
equalButton.addEventListener('click', calculate)

function calculate() {
  secondValue = displayValue;
  debugger
  let result = operate(operator, firstValue, secondValue);
  displayValue = result;
  displayResult(displayValue);
}

function reset() {
  displayValue = 0;
  firstValue = 0;
  secondValue = 0;
  operator = null;
}