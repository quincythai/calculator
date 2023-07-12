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

function operate(operator, a, b) {
  switch (operator) {
    case '+':
      add(a, b);
      break;
    case '-':
      subtract(a, b);
      break;
    case '*':
      multiply(a, b);
      break;
    case '/':
      divide(a, b);
      break;
    default:
      console.log("Error");
      break;
  }
}

// allows number buttons to display on calculator screen
let displayValue = 0;
const display = document.getElementById('screen-text');
const numberButtons = document.querySelectorAll(".number-button");
numberButtons.forEach(button => {
  button.addEventListener('click', populate);
})

function populate(e) {
  if (displayValue === 0) {
    display.innerHTML = "";
  }
  display.innerHTML += e.target.innerHTML;
  displayValue = parseInt(display.innerHTML);
  console.log(displayValue);
}