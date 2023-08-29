const numberButtons = document.querySelectorAll('.button-number');
const operatorButtons = document.querySelectorAll('.button-operator');
const clearButton = document.getElementById('button-clear');
const clearAllButton = document.getElementById('button-clear-all');
const decimalButton = document.getElementById('button-decimal');
const equalsButton = document.getElementById('button-equals');
const displayCurrent = document.querySelector('.display-current');
const displayPrevious = document.querySelector('.display-previous');

const memory = {
    operantOne: "",
    operantTwo: "",
    leftoverOperant: false,
    decimalPresent: false,
    operator: "",
}

numberButtons.forEach(numberElement => {
    numberElement.addEventListener('click', () => addToOperant(numberElement));
});

operatorButtons.forEach(operatorElement => {
    operatorElement.addEventListener('click', () => { 
        if (memory.operator === "") {;
            outputToCurrentDisplay(operatorElement);
            commitOperator(operatorElement);
        }
    })
});

clearButton.addEventListener('click', clearCurrent);

clearAllButton.addEventListener('click', clearAll);

decimalButton.addEventListener('click', () => {
    if (memory.decimalPresent === false) {
        addToOperant(decimalButton);
        memory.decimalPresent = true;
    }
});

equalsButton.addEventListener('click', equals);

function equals() {
    displayPrevious.textContent = displayCurrent.textContent;
    displayCurrent.textContent = calculate(memory.operantOne, memory.operantTwo, memory.operator);
    memory.operantOne = displayCurrent.textContent;
    memory.operantTwo = "";
    memory.operator = "";
    memory.leftoverOperant = true;
}

function clearCurrent() {
    memory.operantOne = "";
    memory.operantTwo = "";
    memory.operator = "";
    memory.decimalPresent = false;
    displayCurrent.textContent = "";
}

function clearAll() {
    clearCurrent();
    displayPrevious.textContent = "";
}

function clearLeftoverOperant() {
    if (memory.leftoverOperant === true) {
        memory.leftoverOperant = false;
        displayCurrent.textContent = "";
        memory.operantOne = "";
    }
}

function addToOperant(numberElement) {
    if (memory.operator === "") {
        clearLeftoverOperant();
        commitOperantOne(numberElement);
    } else {
        commitOperantTwo(numberElement);
    }
    outputToCurrentDisplay(numberElement);
}

function commitOperantOne(numberElement) {
    memory.operantOne += numberElement.getAttribute('data-input');
}

function commitOperantTwo(numberElement) {
    memory.operantTwo += numberElement.getAttribute('data-input');
}

function commitOperator(operatorElement) {
    memory.operator = operatorElement.getAttribute('data-input');
    memory.decimalPresent = false
}

function outputToCurrentDisplay(element) {
    let inputData = element.getAttribute('data-input');
    let displayCurrentText = displayCurrent.textContent;
    displayCurrent.textContent = displayCurrentText + inputData;
}

function calculate(operantOne, operantTwo, operator) {
    switch(operator) {
        case '+':
            return add(operantOne, operantTwo);
        case '-':
            return subtract(operantOne, operantTwo);
        case '*':
            return multiply(operantOne, operantTwo);
        case '/':
            return divide(operantOne, operantTwo);
    }
}

function add(num1, num2) {
    return parseFloat(num1) + parseFloat(num2);
}

function subtract(num1, num2) {
    return parseFloat(num1) - parseFloat(num2);
}

function multiply(num1, num2) {
    return parseFloat(num1) * parseFloat(num2);
}

function divide(num1, num2) {
    return parseFloat(num1) / parseFloat(num2);
}