const numberButtons = document.querySelectorAll('.button-number');
const operatorButtons = document.querySelectorAll('.button-operator');
const clearButton = document.getElementById('button-clear');
const clearAllButton = document.getElementById('button-clear-all');
const equalsButton = document.getElementById('button-equals');
const displayCurrent = document.querySelector('.display-current');
const displayPrevious = document.querySelector('.display-previous');

const memory = {
    operantOne: "",
    operantTwo: "",
    leftoverOperant: false,
    operator: "",
}

numberButtons.forEach(numberElement => {
    numberElement.addEventListener('click', () => {
        if (isOperatorAlreadySelected() === false) {
            clearLeftoverOperant();
            commitOperantOne(numberElement);
        } else if (isOperatorAlreadySelected() === true) {
            commitOperantTwo(numberElement);
        }
        outputToCurrentDisplay(numberElement)
    })
});

operatorButtons.forEach(operatorElement => {
    operatorElement.addEventListener('click', () => { 
        if (isOperatorAlreadySelected() === false) {;
            outputToCurrentDisplay(operatorElement);
            commitOperator(operatorElement);
        }
    })
});

clearButton.addEventListener('click', clearCurrent);

clearAllButton.addEventListener('click', clearAll);

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
    displayCurrent.textContent = "";
}

function clearAll() {
    memory.operantOne = "";
    memory.operantTwo = "";
    memory.operator = "";
    displayCurrent.textContent = "";
    displayPrevious.textContent = "";
}

function clearLeftoverOperant() {
    if (memory.leftoverOperant === true) {
        memory.leftoverOperant = false;
        displayCurrent.textContent = "";
        memory.operantOne = "";
    }
}

function commitOperantOne(numberElement) {
    memory.operantOne += numberElement.getAttribute('data-input');
    console.log(`memory.OperantOne = ${memory.operantOne}`)
}

function commitOperantTwo(numberElement) {
    memory.operantTwo += numberElement.getAttribute('data-input');
    console.log(`memory.OperantTwo = ${memory.operantTwo}`)
}

function commitOperator(operatorElement) {
    memory.operator = operatorElement.getAttribute('data-input');
}

function isOperatorAlreadySelected() {
    if (memory.operator === "") {
        return false;
    } else {
        return true;
    }
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
    return parseInt(num1) + parseInt(num2);
}

function subtract(num1, num2) {
    return parseInt(num1) - parseInt(num2);
}

function multiply(num1, num2) {
    return parseInt(num1) * parseInt(num2);
}

function divide(num1, num2) {
    return parseInt(num1) / parseInt(num2);
}