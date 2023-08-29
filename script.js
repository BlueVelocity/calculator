let buttons = document.querySelectorAll('button');
let displayCurrent = document.querySelector('.display-current');

let operantOne = null;
let operantTwo = null;
let operator = null;

buttons.forEach(element => element.addEventListener('click', () => {
    outputToDisplay(element.getAttribute('data-input'))
}));

function outputToDisplay(elementDataInput) {
    let displayCurrentText = displayCurrent.textContent;
    displayCurrent.textContent = displayCurrentText + elementDataInput
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
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}