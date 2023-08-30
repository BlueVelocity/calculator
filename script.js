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
    operator: "",
    isInt: true,
    tauntOne: "fool",
    tauntTwo: "gigafool"
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
    let existingOperation = elements.displayCurrent.textContent;
    let calculatedNumber = calculate(memory.operantOne, memory.operantTwo, memory.operator);
    memory.operantOne = calculatedNumber;
    if (calculatedNumber > 999999) {
        calculatedNumber = Number.parseFloat(calculatedNumber).toExponential(2);
        elements.displayPrevious.textContent = existingOperation;
        elements.displayCurrent.textContent = calculatedNumber;
    } else {
        elements.displayPrevious.textContent = elements.displayCurrent.textContent;
        elements.displayCurrent.textContent = calculatedNumber;
    }
    memory.operantTwo = "";
    memory.operator = "";
    memory.leftoverOperant = true;
}

function backspace() {
    if (elements.displayCurrent.textContent === memory.tauntOne || elements.displayCurrent.textContent == memory.tauntTwo) {
        clearCurrent();
    } else {
        let tempString = elements.displayCurrent.textContent;
        tempString = tempString.slice(0, -1);
        elements.displayCurrent.textContent = tempString;
    }
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
    let operantOneProxy = parseIntOrFloat(operantOne);
    let operantTwoProxy = parseIntOrFloat(operantTwo);
    
    if (operantOne === "") {
        operantOneProxy = 0;
    } 
    
    if (operantTwo === "") {
        operantTwoProxy = 0;
    }

    if (checkIfFool(operantOne, operantTwo, operator) === false) {
        switch(operator) {
            case '+':
                return add(operantOneProxy, operantTwoProxy);
            case '-':
                return subtract(operantOneProxy, operantTwoProxy);
            case '*':
                return multiply(operantOneProxy, operantTwoProxy);
            case '/':
                return divide(operantOneProxy, operantTwoProxy);
            default:
                return operantOne;
        }
    } else {
        return checkIfFool(operantOne, operantTwo, operator);
    }
}

function add(num1, num2) {
    if (isInt((num1+num2)) === false) {
        return (num1 + num2).toFixed(2);
    } else {
        return num1 + num2;
    }
}

function subtract(num1, num2) {
    if (isInt((num1-num2)) === false ) {
        return (num1 - num2).toFixed(2);
    } else {
        return num1 - num2;
    }
}

function multiply(num1, num2) {
    if (isInt((num1*num2)) === false) {
        return (num1 * num2).toFixed(2);
    } else {
        return num1 * num2;
    }
}

function divide(num1, num2) {
    if (isInt((num1/num2)) === false) {
        return (num1 / num2).toFixed(2);
    } else {
        return num1 / num2;
    }
}

function isInt(operant) {
    return operant % 1 === 0;
}

function parseIntOrFloat(operant) {
    if (operant % 1 === 0) {
        return parseInt(operant);
    } else {
        return parseFloat(operant);
    }
}

function checkIfFool(input1, input2, operator) {
    if (parseFloat(input2) == 0 && operator == '/' && input1 != memory.tauntTwo && input1 != memory.tauntOne) {
        return memory.tauntOne;
    } else if (input1 == memory.tauntOne || input1 == memory.tauntTwo)  {
        return memory.tauntTwo;
    } else {
        return false;
    }
}