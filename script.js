let buttons = document.querySelectorAll('button');
let displayCurrent = document.querySelector('.display-current');

buttons.forEach(element => element.addEventListener('click', () => {
    addToMemory(element.getAttribute('data-input'))
}));

function addToMemory(elementDataInput) {
    let displayCurrentText = displayCurrent.textContent;
    displayCurrent.textContent = displayCurrentText + elementDataInput
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