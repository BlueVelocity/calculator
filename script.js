const numberButtons = document.querySelectorAll('.button-number');
const operatorButtons = document.querySelectorAll('.button-operator');
const displayCurrent = document.querySelector('.display-current');

let operantOne = null;
let operantTwo = null;
let operator = null;

numberButtons.forEach(element => {
    element.addEventListener('click', () => outputToCurrentDisplay(element))
});

operatorButtons.forEach(element => {
    element.addEventListener('click', () => isOperatorAlreadySelected(element))
});

function isOperatorAlreadySelected(element) {
    if (operator === null) {
        operator = element.getAttribute('data-input');
        return outputToCurrentDisplay(element);
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