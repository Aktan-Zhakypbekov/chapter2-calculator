function add(a, b) {
  return Math.round((parseFloat(a) + parseFloat(b)) * 1000) / 1000;
}
function subtract(a, b) {
  return Math.round((parseFloat(a) - parseFloat(b)) * 1000) / 1000;
}
function multiply(a, b) {
  return Math.round(parseFloat(a) * parseFloat(b) * 1000) / 1000;
}
function divide(a, b) {
  if (parseFloat(a) === 0 || parseFloat(b) === 0) return "Unexpeted operation";
  return Math.round((parseFloat(a) / parseFloat(b)) * 1000) / 1000;
}
function pow(a, b) {
  return Math.round(Math.pow(parseFloat(a), parseFloat(b)) * 1000) / 1000;
}
function modulo(a, b) {
  return Math.round((parseFloat(a) % parseFloat(b)) * 1000) / 1000;
}

let calculationDisplayInput = document.querySelector(
  ".calc__display-cont__calculation-display__input"
);
let resultDisplayInput = document.querySelector(
  ".calc__display-cont__result-display__input"
);

let numberButtons = document.querySelectorAll(".number");
let numberInputLamp = document.querySelector(
  ".notifications-cont__panel__number-input-lamp"
);

let operationButtons = document.querySelectorAll(".operation");
let operationInputLamp = document.querySelector(
  ".notifications-cont__panel__operation-input-lamp"
);

let equalsButton = document.querySelector("#equals");
let equalsInputLamp = document.querySelector(
  ".notifications-cont__panel__equals-input-lamp"
);

let cleanButton = document.querySelector(".clean");
let cleanInputLamp = document.querySelector(
  ".notifications-cont__panel__clean-input-lamp"
);

let firstOperand = null;
let secondOperand = null;
let operator = "empty";
let equalsPressed = false;
let result = null;
let array = [];

function pushNumberToArray(i) {
  if (i.target.value === ".") {
    if (array.includes(".")) {
      calculationDisplayInput.textContent += "";
    } else {
      array.push(i.target.value);
      calculationDisplayInput.textContent += i.target.value;
    }
  } else {
    calculationDisplayInput.textContent += i.target.value;
    array.push(i.target.value);
  }
}
function setOperator(i) {
  if (operator == "empty" && firstOperand === null && array.length === 0) {
    calculationDisplayInput.textContent += "";
  } else if (
    operator == "empty" &&
    firstOperand === null &&
    array.length !== 0
  ) {
    operator = i.target.value;
    firstOperand = array.join("");
    array = [];
    calculationDisplayInput.textContent += operator;
  } else if (
    operator != "empty" &&
    firstOperand !== null &&
    array.length === 0
  ) {
    operator = i.target.value;
    calculationDisplayInput.textContent =
      calculationDisplayInput.textContent.substring(
        0,
        calculationDisplayInput.textContent.length - 1
      ) + i.target.value;
  } else if (equalsPressed) {
    operator = i.target.value;
    firstOperand = array.join("");
    array = [];
    calculationDisplayInput.textContent += operator;
    equalsPressed = false;
  } else if (
    operator != "empty" &&
    firstOperand !== null &&
    array.length !== 0
  ) {
    secondOperand = array.join("");
    array = [];
    if (operator == "+") {
      result = add(firstOperand, secondOperand);
    } else if (operator == "-") {
      result = subtract(firstOperand, secondOperand);
    } else if (operator == "x") {
      result = multiply(firstOperand, secondOperand);
    } else if (operator == "/") {
      result = divide(firstOperand, secondOperand);
    } else if (operator == "^") {
      result = pow(firstOperand, secondOperand);
    } else if (operator == "%") {
      result = modulo(firstOperand, secondOperand);
    } else if (operator == "^") {
      result = fact(firstOperand);
    }
    calculationDisplayInput.textContent = String(result);
    resultDisplayInput.textContent = calculationDisplayInput.textContent;
    array.push(String(result));
    firstOperand = array.join("");
    operator = i.target.value;
    calculationDisplayInput.textContent += operator;
    array = [];
  }
}

function calculateResult() {
  if (operator == "empty" && firstOperand === null && array.length === 0) {
    calculationDisplayInput.textContent += "";
  } else if (
    operator == "empty" &&
    firstOperand === null &&
    array.length !== 0
  ) {
    calculationDisplayInput.textContent += "";
  } else if (
    operator != "empty" &&
    firstOperand !== null &&
    array.length === 0
  ) {
    calculationDisplayInput.textContent += "";
  } else if (equalsPressed && firstOperand !== null && array.length !== 0) {
    calculationDisplayInput.textContent += "";
  } else {
    secondOperand = array.join("");
    array = [];
    if (operator == "+") {
      result = add(firstOperand, secondOperand);
    } else if (operator == "-") {
      result = subtract(firstOperand, secondOperand);
    } else if (operator == "x") {
      result = multiply(firstOperand, secondOperand);
    } else if (operator == "/") {
      result = divide(firstOperand, secondOperand);
    } else if (operator == "^") {
      result = pow(firstOperand, secondOperand);
    } else if (operator == "%") {
      result = modulo(firstOperand, secondOperand);
    }
    calculationDisplayInput.textContent = String(result);
    resultDisplayInput.textContent = calculationDisplayInput.textContent;
    array.push(...String(result).split(""));
    operator = "empty";
    equalsPressed = true;
  }
}

function cleanData() {
  firstOperand = null;
  secondOperand = null;
  operator = "empty";
  equalsPressed = false;
  result = null;
  array = [];
  calculationDisplayInput.textContent = "";
  resultDisplayInput.textContent = "";
}

numberButtons.forEach((numberButton) => {
  numberButton.addEventListener("mousedown", (e) => {
    numberInputLamp.style.cssText =
      "background-color: rgb(50, 170, 2); box-shadow: 0 0 6px rgb(80, 230, 2)";
    e.target.style.cssText =
      "color: rgb(50, 170, 2); text-shadow: 0 0 5px rgb(80, 230, 2)";
  });
  numberButton.addEventListener("mouseup", (e) => {
    numberInputLamp.style.cssText = "";
    e.target.style.cssText = "";
  });
  numberButton.addEventListener("click", (e) => {
    pushNumberToArray(e);
  });
});

operationButtons.forEach((operationButton) => {
  operationButton.addEventListener("mousedown", (e) => {
    operationInputLamp.style.cssText =
      "background-color: rgb(240, 140, 6); box-shadow: 0 0 6px rgb(253, 154, 6)";
    e.target.style.cssText =
      "color: rgb(240, 140, 6); text-shadow: 0 0 5px rgb(253, 154, 6)";
  });
  operationButton.addEventListener("mouseup", (e) => {
    operationInputLamp.style.cssText = "";
    e.target.style.cssText = "";
  });
  operationButton.addEventListener("click", (e) => {
    setOperator(e);
  });
});

equalsButton.addEventListener("mousedown", (e) => {
  equalsInputLamp.style.cssText =
    "background-color: rgb(255, 50, 53); box-shadow: 0 0 7px rgb(255, 50, 53)";
  e.target.style.cssText =
    "color: rgb(255, 50, 53); text-shadow: 0 0 5px rgb(255, 50, 53)";
});
equalsButton.addEventListener("mouseup", (e) => {
  equalsInputLamp.style.cssText = "";
  e.target.style.cssText = "";
});
equalsButton.addEventListener("click", (e) => {
  calculateResult();
});

cleanButton.addEventListener("mousedown", (e) => {
  cleanInputLamp.style.cssText =
    "background-color: rgb(15, 100, 250); box-shadow: 0 0 6px rgb(25, 120, 255)";
  e.target.style.cssText =
    "color: rgb(15, 100, 250); text-shadow: 0 0 5px rgb(25, 120, 255)";
});
cleanButton.addEventListener("mouseup", (e) => {
  cleanInputLamp.style.cssText = "";
  e.target.style.cssText = "";
});
cleanButton.addEventListener("click", (e) => {
  cleanData();
});
