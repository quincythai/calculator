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
  return a / b;
}

function modulo(a, b) {
  return a % b;
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

const MAX_NUMBERS = 17;
let displayValue;
const numberButtons = document.querySelectorAll('.number-button');
numberButtons.forEach((button) => {
  button.addEventListener('click', () => populate(button.textContent));
});

const screen = document.getElementById('screen-text');
function populate(number) {
  if (screen.textContent.length < MAX_NUMBERS) {
    if (screen.textContent === "0") {
      screen.textContent = number;
    } else {
      screen.textContent += number;
    }
  }
}

