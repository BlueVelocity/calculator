const elements = {
    numberButtons: document.querySelectorAll('.button-number'),
    operatorButtons: document.querySelectorAll('.button-operator'),
    backButton: document.getElementById('button-backspace'),
    clearButton:  document.getElementById('button-clear'),
    clearAllButton: document.getElementById('button-clear-all'),
    decimalButton: document.getElementById('button-decimal'),
    equalsButton: document.getElementById('button-equals'),
    displayCurrent: document.querySelector('.display-current'),
    displayPrevious: document.querySelector('.display-previous')
}

const memory = {
    operantOne: "",
    operantTwo: "",
    leftoverOperant: false,
    decimalPresent: false,
    operator: ""
}

elements.numberButtons.forEach(numberElement => {
    numberElement.addEventListener('click', () => addToOperant(numberElement));
});

elements.operatorButtons.forEach(operatorElement => {
    operatorElement.addEventListener('click', () => { 
        if (memory.operator === "") {
            outputToCurrentDisplay(operatorElement);
            commitOperator(operatorElement);
        }
    })
});

elements.backButton.addEventListener('click', () => {
    if (memory.operantOne != "" && memory.operator === "") {
        memory.operantOne = memory.operantOne.slice(0, -1);
        backspace();
    } else if (memory.operator != "" && memory.operantTwo === ""){
        memory.operator = "";
        backspace();
    } else if (memory.operantTwo != "") {
        memory.operantTwo = memory.operantTwo.slice(0, -1);
        backspace();
    }
});

elements.clearButton.addEventListener('click', clearCurrent);

elements.clearAllButton.addEventListener('click', clearAll);

elements.decimalButton.addEventListener('click', () => {
    if (memory.decimalPresent === false) {
        addToOperant(elements.decimalButton);
        memory.decimalPresent = true;
    }
});

elements.equalsButton.addEventListener('click', equals);

function equals() {
    elements.displayPrevious.textContent = elements.displayCurrent.textContent;
    elements.displayCurrent.textContent = calculate(memory.operantOne, memory.operantTwo, memory.operator);
    memory.operantOne = elements.displayCurrent.textContent;
    memory.operantTwo = "";
    memory.operator = "";
    memory.leftoverOperant = true;
}

function backspace() {
    let tempString = elements.displayCurrent.textContent;
    tempString = tempString.slice(0, -1);
    elements.displayCurrent.textContent = tempString;
}

function clearCurrent() {
    memory.operantOne = "";
    memory.operantTwo = "";
    memory.operator = "";
    memory.decimalPresent = false;
    elements.displayCurrent.textContent = "";
}

function clearAll() {
    clearCurrent();
    elements.displayPrevious.textContent = "";
}

function clearLeftoverOperant() {
    if (memory.leftoverOperant === true) {
        memory.leftoverOperant = false;
        elements.displayCurrent.textContent = "";
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
    let displayCurrentText = elements.displayCurrent.textContent;
    elements.displayCurrent.textContent = displayCurrentText + inputData;
}

function calculate(operantOne, operantTwo, operator) {
    if (checkIfFool(operantOne, operantTwo, operator) === false) {
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
    } else {
        return checkIfFool(operantOne, operantTwo, operator);
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

function checkIfFool(input1, input2, operator) {
    if (parseFloat(input2) == 0 && operator == '/' && input1 != "gigafool" && input1 != "fool") {
        return "fool"
    } else if (input1 == "fool" || input1 == "gigafool")  {
        return "gigafool";
    } else {
        return false;
    }
}