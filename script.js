const numberButtons = document.querySelectorAll('.button-number');
const operatorButtons = document.querySelectorAll('.button-operator');
const clearAllButton = document.getElementById('button-clear-all');
const equalsButton = document.getElementById('button-equals');
const displayCurrent = document.querySelector('.display-current');
const displayPrevious = document.querySelector('.display-previous');

let operantOne = "";
let operantTwo = "";
let operator = "";
let previousOperation = "";

numberButtons.forEach(numberElement => {
    numberElement.addEventListener('click', () => {
        outputToCurrentDisplay(numberElement)
        if (isOperatorAlreadySelected() === false) {
            commitOperantOne(numberElement);
        } else if (isOperatorAlreadySelected() === true) {
            commitOperantTwo(numberElement);
        }
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

clearAllButton.addEventListener('click', clearAll);

equalsButton.addEventListener('click', equals);

function equals() {
    displayPrevious.textContent = displayCurrent.textContent;
    displayCurrent.textContent = calculate(operantOne, operantTwo, operator);
    operantOne = displayCurrent.textContent;
    operantTwo = "";
    operator = "";
}

function clearAll() {
    operantOne = "";
    operantTwo = "";
    operator = "";
    displayCurrent.textContent = "";
}

function commitOperantOne(numberElement) {
    operantOne += numberElement.getAttribute('data-input');
    console.log(`OperantOne = ${operantOne}`)
}

function commitOperantTwo(numberElement) {
    operantTwo += numberElement.getAttribute('data-input');
    console.log(`OperantTwo = ${operantTwo}`)
}

function commitOperator(operatorElement) {
    operator = operatorElement.getAttribute('data-input');
}

function isOperatorAlreadySelected() {
    if (operator === "") {
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