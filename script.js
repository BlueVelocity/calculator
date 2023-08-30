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

document.addEventListener('keyup', node => {
    if (node.key >= 0 && node.key <= 9) {
        addToOperant(node.key)
    } else if (node.key == '+' || node.key == '-' || node.key == '*' || node.key == '/') {
        if (memory.operator === "") {
            commitOperator(node.key);
        }
    } else if (node.key === '.') {
        addToOperant(node.key);
        memory.decimalPresent = true;
    } else if (node.key === 'Enter') {
        equals();
    } else if (node.key === 'Delete') {
        clearCurrent()
    } else if (node.key === 'c') {
        clearAll();
    }
});

elements.numberButtons.forEach(numberElement => {
    numberElement.addEventListener('click', () => {
        addToOperant(numberElement.getAttribute('data-input'))}
    );
});

elements.operatorButtons.forEach(operatorElement => {
    operatorElement.addEventListener('click', () => { 
        if (memory.operator === "") {
            commitOperator(operatorElement.getAttribute('data-input'));
        }
    })
});

elements.backButton.addEventListener('click', backspace);

elements.clearButton.addEventListener('click', clearCurrent);

elements.clearAllButton.addEventListener('click', clearAll);

elements.decimalButton.addEventListener('click', () => {
    if (memory.decimalPresent === false) {
        addToOperant(elements.decimalButton.getAttribute('data-input'));
        memory.decimalPresent = true;
    }
});

elements.equalsButton.addEventListener('click', equals);

function equals() {
    let existingOperation = elements.displayCurrent.textContent;
    let calculatedNumber = calculate(memory.operantOne, memory.operantTwo, memory.operator);
    
    //introduces bigInts if the calculated number is too big
    if (calculatedNumber > 99999) {
        calculatedNumber = `${Number.parseFloat(calculatedNumber).toExponential(2)}n`;
        memory.operantOne = calculatedNumber;
        elements.displayPrevious.textContent = `${existingOperation} =`;
        elements.displayCurrent.textContent = calculatedNumber.slice(0, -1);
    } else {
        elements.displayPrevious.textContent = `${existingOperation} =`;
        elements.displayCurrent.textContent = calculatedNumber;
        memory.operantOne = calculatedNumber;
    }
    memory.operantTwo = "";
    memory.operator = "";
    memory.leftoverOperant = true;
}

function backspace() {
    if (memory.operantOne != "" && memory.operator === "") {
        memory.operantOne = memory.operantOne.slice(0, -1);
        backspaceDisplay();
    } else if (memory.operator != "" && memory.operantTwo === ""){
        memory.operator = "";
        backspaceDisplay();
    } else if (memory.operantTwo != "") {
        memory.operantTwo = memory.operantTwo.slice(0, -1);
        backspaceDisplay();
    }

    function backspaceDisplay() {
        if (elements.displayCurrent.textContent === memory.tauntOne || elements.displayCurrent.textContent == memory.tauntTwo) {
            clearCurrent();
        } else {
            let tempString = elements.displayCurrent.textContent;
            tempString = tempString.slice(0, -1);
            elements.displayCurrent.textContent = tempString;
        }
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

function addToOperant(number) {
    if (memory.operator === "") {
        clearLeftoverOperant();
        commitOperantOne(number);
    } else {
        commitOperantTwo(number);
    }
    outputToCurrentDisplay(number);
}

function commitOperantOne(number) {
    memory.operantOne += number;
}

function commitOperantTwo(number) {
    memory.operantTwo += number;
}

function commitOperator(operator) {
    memory.operator = operator;
    memory.decimalPresent = false
    outputToCurrentDisplay(operator);
}

function outputToCurrentDisplay(number) {
    let inputData = number;
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

    if (checkIfFool(operantOneProxy, operantTwoProxy, operator) === false) {
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
        return checkIfFool(operantOneProxy, operantTwoProxy, operator);
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