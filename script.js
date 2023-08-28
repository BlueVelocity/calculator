let buttons = document.querySelectorAll('button');
let display = document.querySelector('.display');

buttons.forEach(element => element.addEventListener('click', () => {
    addToMemory(element.getAttribute('data-input'))
}));

function addToMemory(elementDataInput) {
    let currentDisplayText = display.textContent;
    display.textContent = currentDisplayText + elementDataInput
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