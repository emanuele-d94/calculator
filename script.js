screenMaxLength = 15;

let num1 = '0';
let num2 = '';
let result = '';
let operator = '';

let isFirstDigit = true
let isSecondDigit = false
let isOperator = false
let enableOperators = false

let hasFirstDigitComma = false
let hasSecondDigitComma = false

const screen = document.querySelector('.screen-number')
screen.textContent = '0'
const digits = document.querySelector('.digits')
const operators = document.querySelector('.operators')

function prepareDigits() {
    digits.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {

            enableOperators = true
            isOperator = false;
            if (num1 !== '' && !isFirstDigit) {
                isSecondDigit = true;
            }
            if (num2 !== '' && !isSecondDigit) {
                isFirstDigit = true;
            }

            if (isFirstDigit) {
                // comma
                if(e.target.className === 'comma'){
                    if(num1.length > 0 && !hasFirstDigitComma){
                        num1 = num1.concat(e.target.textContent);
                        hasFirstDigitComma = true
                        updateScreen(num1)
                    }
                } else {
                    // no doppi zeri all'inizio
                    if (num1 === '0') {
                        num1 = '';
                    }
                    isSecondDigit = false;
                    isOperator = false;
                    console.log(e.target.textContent);
                    if (num1.length < screenMaxLength) {
                        num1 = num1.concat(e.target.textContent);
                        updateScreen(num1)
                    }
                }
            } else if (isSecondDigit) {
                // comma
                if(e.target.className === 'comma'){
                    if(num2.length > 0 && !hasSecondDigitComma){
                        num2 = num2.concat(e.target.textContent);
                        hasSecondDigitComma = true
                        updateScreen(num2)
                    }
                } else {
                    if (num2 === '0') {
                        num2 = '';
                    }
                    isFirstDigit = false;
                    isOperator = false;
                    console.log(e.target.textContent);
                    if (num2.length < screenMaxLength) {
                        num2 = num2.concat(e.target.textContent);
                    }
                    updateScreen(num2)
                }
            }
        }
    });
}

function prepareOperators() {

    operators.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {

            if (enableOperators) {

                isOperator = true;
                isFirstDigit = false;
                isSecondDigit = false;

                switch (e.target.className) {
                    case 'equal':
                        if (num1 !== '' && num2 !== '') {
                            doTheMath()
                        }
                        break;
                    case 'clear':
                        clearScreen()
                        break;
                    default:
                        if (num1 !== '' && num2 !== '') {
                            doTheMath()
                        } else {
                            operator = e.target.className;
                            updateScreen(e.target.textContent);
                        }
                        break;
                }
            }
        }
    })
}

function clearScreen() {
    num1 = ''
    num2 = ''
    result = ''
    operator = ''
    isFirstDigit = true;
    isSecondDigit = false;
    isOperator = false;
    enableOperators = false;
    hasFirstDigitComma = false;
    hasSecondDigitComma = false;
    updateScreen('0')
}

function doTheMath() {

    switch (operator) {
        case 'plus':
            result = (parseFloat(num1) + parseFloat(num2)).toString().substring(0, 15);
            updateScreen(result);
            break;
        case 'minus':
            result = (parseFloat(num1) - parseFloat(num2)).toString().substring(0, 15);
            break;
        case 'times':
            result = (parseFloat(num1) * parseFloat(num2)).toString().substring(0, 15);
            break;
        case 'divide':
            result = (parseFloat(num1) / parseFloat(num2)).toString().substring(0, 15);
            break;
    }
    updateScreen(result);
    num1 = result;
    num2 = '';
    isFirstDigit = false;
    isSecondDigit = true;
    isOperator = false;
    hasFirstDigitComma = false;
    hasSecondDigitComma = false;
}

function updateScreen(value) {
    screen.textContent = value;

    console.log('num1', num1);
    console.log('num2', num2);
    console.log('operator', operator);
    console.log('result', result);

}

function main() {
    prepareDigits()
    prepareOperators()
}

main();


