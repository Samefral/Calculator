let inputtedText = document.querySelector('.calculator-panel__text-content');
let calculator = document.querySelector('.calculator');
let operButtons = document.querySelectorAll('.calculator-btn--operation');
let numberButtons = document.querySelectorAll('.calculator-btn--number');


let calcFn = {
    sum: (a, b) => a + b,
    sub: (a, b) => a - b,
    mult: (a, b) => a * b,
    div: (a, b) => a / b,
    // square: (a) => a ** 2,
    // remainder: (a, b) => a % b
}

let num = '';
let num1 = '';
let num2 = '';
let operation = '';
let operationFlag = false;
let total = '';
calculator.addEventListener('click', function(evt) {




    evt.target.classList.contains('calculator-btn--delete') ? inputtedText.textContent = inputtedText.textContent.slice(0, -1) : '';
    evt.target.classList.contains('calculator-btn--delete') ? num1 = num1.slice(0, -1) : '';


    if (evt.target.classList.contains('calculator-btn--value') && !operationFlag && !(inputtedText.textContent.length > 11)) {
        insert(evt.target.textContent, inputtedText);
    }


    if (evt.target.classList.contains('calculator-btn--number') && !operationFlag && !(inputtedText.textContent.length > 11)) {
        // inputtedText.textContent === '0' ? inputtedText.textContent = '' : ''; 
        num1 += evt.target.textContent;
        inputtedText.append(evt.target.textContent); 
        // num1 = Number(num);
    }

    if (evt.target.classList.contains('calculator-btn--operation')) {
        operation = evt.target.dataset.operation;
        operationFlag = true;
        // inputtedText.textContent = evt.target.textContent;
    }

    if (evt.target.classList.contains('calculator-btn--number') && operationFlag && !(inputtedText.textContent.length > 11)) {
        inputtedText.textContent === '0' ? inputtedText.textContent = '' : ''; 
        num2 += evt.target.textContent;
        inputtedText.append(evt.target.textContent); 
        // num2 = Number(num);
        total = calcFn[operation](num1, num2);
        console.log(total.toString());
        inputtedText.textContent = total.toString();
        console.log(inputtedText);
    }
    
    // numberWithSpaces(num1, inputtedText);
    // let total = calcFn[evt.target.dataset.operation](num1, num2);
})

function numberWithSpaces(number, place) {
    let separ = number.toString();
    place.textContent = separ.replace(/(\d)(?=(\d{3})+(\D|$))/g, "$1 ");
    return place.textContent;
}

function insert(value, place) {
    place.textContent === '0' ? place.textContent = '' : ''; 
    place.textContent = value;
}