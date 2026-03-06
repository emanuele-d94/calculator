screenMaxLength = 15;

let num1 = '';
let num2 = '';
let result = '';
let operator = '';

let isFirstDigit = true
let isSecondDigit = false
let isOperator = false
let enableOperators = false

const screen = document.querySelector('.screen-number')
screen.textContent = '0'
const digits = document.querySelector('.digits')
const operators = document.querySelector('.operators')

function prepareDigits() {
    digits.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {

            enableOperators = true

            isOperator = false;
            if(num1 !== '' && !isFirstDigit){
                isSecondDigit = true;
            }
            if(num2 !== '' && !isSecondDigit){
                isFirstDigit = true;
            }

            if(isFirstDigit) {
                if(e.target.className ==='zero' && (num1 === '' || num1 === '0')){
                }  else {
                    isSecondDigit = false;
                    isOperator = false;
                    console.log(e.target.textContent);
                    if(num1.length < screenMaxLength){
                        num1 = num1.concat(e.target.textContent);
                    }
                    updateScreen(num1)
                }
            } else if(isSecondDigit) {
                if(e.target.className ==='zero' && (num2 === '' || num2 === '0')){
                }  else {
                    isFirstDigit = false;
                    isOperator = false;
                    console.log(e.target.textContent);
                    if(num2.length < screenMaxLength){
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

            if(enableOperators){

                isOperator = true;
                isFirstDigit = false;
                isSecondDigit = false;

                switch (e.target.className){
                    case 'equal':
                        if(num1 !== '' && num2 !== ''){
                            doTheMath()
                        }
                        break;
                    case 'clear':
                        clearScreen()
                        break;
                    default:
                        if(num1 !== '' && num2 !== ''){
                            doTheMath()
                        } else{
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
    updateScreen('0')
}

function doTheMath() {

    switch (operator) {
        case 'plus':
            result = (parseInt(num1) + parseInt(num2)).toString().substring(0,15);
            updateScreen(result);
            num1 = result;
            num2 = '';
            isFirstDigit = false;
            isSecondDigit = true;
            isOperator = false;
            break;
        case 'minus':
            result = (parseInt(num1) - parseInt(num2)).toString().substring(0,15);
            updateScreen(result);
            num1 = result;
            num2 = '';
            isFirstDigit = false;
            isSecondDigit = true;
            isOperator = false;
            break;
        case 'times':
            result = (parseInt(num1) * parseInt(num2)).toString().substring(0,15);
            updateScreen(result);
            num1 = result;
            num2 = '';
            isFirstDigit = false;
            isSecondDigit = true;
            isOperator = false;
            break;
        case 'divide':
            result = (parseInt(num1) / parseInt(num2)).toString().substring(0,15);
            updateScreen(result);
            num1 = result;
            num2 = '';
            isFirstDigit = false;
            isSecondDigit = true;
            isOperator = false;
            break;
    }
}

function updateScreen(value) {
    screen.textContent = value;

    console.log('num1',num1);
    console.log('num2',num2);
    console.log('operator',operator);
    console.log('result',result);

}

function main() {
    prepareDigits()
    prepareOperators()
}

main();


