window.addEventListener('load', function() {
    let calculator = new Calculator();
})

class Calculator {
    constructor() {
        this.calculatorBtns = document.querySelector('.calculator-btns');
        this.firstNumText = document.querySelector('.calculator-display__first-num');
        this.displayText = document.querySelector('.calculator-display__text-content');
        this.pointButton = document.querySelector('.calculator-btn-point');
        this.operationFlag = false;
        this.operation = '';
        this.num1 = 0;
        this.num2 = 0;
        this.calcFn = {
            '+': (a, b) => a + b,
            '-': (a, b) => a - b,
            '*': (a, b) => a * b,
            '/': (a, b) => a / b,
            '%': (a, b) => a % b
        }
        this.calculatorBtns.addEventListener('click', this.delegate);
    }

    delegate = evt => {

        if (evt.target.classList.contains('calculator-btn-value')) {
            this.insert(evt.target.dataset.value);
        }
        if (evt.target.classList.contains('calculator-btn-erase')) {
            this.erase();
        }
        if (evt.target.classList.contains('calculator-btn-clear')) {
            this.clear();
        }

        
        if (evt.target.classList.contains('calculator-btn--operation')) {
            this.operate(evt.target.dataset.operation);
        }


        if (evt.target.classList.contains('calculator-btn-equal')) {
            this.equaling();
        }
        if (evt.target.classList.contains('calculator-btn-square')) {
            this.squaring();
        }
        if (evt.target.classList.contains('calculator-btn-inversion')) {
            this.inversing();
        }

    }

    insert(value) {
        if (!(value === '.')) {
            this.zeroBegginingDel();
        }
        this.displayText.textContent += value;
        this.pointButtonLimit();
        if (this.operationFlag === false) {
            this.firstNumText.textContent = this.displayText.textContent;
        }
    }
    erase() {
        if (this.displayText.textContent.length > 1 && this.displayText.textContent != '0') {
            this.displayText.textContent = this.displayText.textContent.slice(0, -1);
        } else {
            this.displayText.textContent = '0';
        }
        if (this.operationFlag === false) {
            this.firstNumText.textContent = this.displayText.textContent;
        }
        this.pointButtonLimit();
    }
    clear() {
        this.displayText.textContent = '0';
        this.firstNumText.textContent = '0';
        this.num1 = 0;
        this.num2 = 0;
        this.operationFlag = false;
    }




    operate(operation) {
        if (this.operationFlag === false) {
            this.operation = operation;
            this.num1 = this.displayText.textContent;
            this.operationFlag = true;
        } 
        else {
            this.num1 = Number(this.firstNumText.textContent.split(' ', 2)[0]);
            this.num2 = Number(this.displayText.textContent);
            this.displayText.textContent = this.truncate(this.calcFn[this.operation](this.num1, this.num2));
            this.operation = operation;
        }
        this.firstNumText.textContent = this.displayText.textContent;
        this.displayText.textContent = '0';
        this.firstNumText.textContent += ' ' + operation;

    }



    equaling() {
        if (this.operationFlag === true) {
            this.num1 = Number(this.firstNumText.textContent.split(' ', 2)[0]);
            this.num2 = Number(this.displayText.textContent);
            this.operationFlag = false;
        } else {
            this.num1 = Number(this.displayText.textContent);
        }
        this.displayText.textContent = this.truncate(this.calcFn[this.operation](this.num1, this.num2));
        this.firstNumText.textContent = this.num1 + ' ' + this.operation + ' ' + this.num2 + ' =';
        this.pointButtonLimit();
    }
    squaring() {
        this.firstNumText.textContent = this.displayText.textContent + ' ' + '**' + ' ' + '2';
        this.displayText.textContent = this.truncate(this.displayText.textContent ** 2);
    }
    inversing() {
        this.displayText.textContent = -Number(this.displayText.textContent);
    }



    zeroBegginingDel() {
        if (this.displayText.textContent[0] === '0' && this.displayText.textContent[1] !== '.') {
            this.displayText.textContent = ''; 
        }
    }
    pointButtonLimit() {
        if (this.displayText.textContent.includes('.')) {
            this.pointButton.disabled = true;
        } else {
            this.pointButton.disabled = false;
        }
    }
    truncate(num) {
        return Math.floor(num * 10000) / 10000;
    }
    numberWithSpaces(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
      
}