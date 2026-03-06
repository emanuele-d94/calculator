screenMaxLength = 15;

let number = '';
let numberTemp = '';
let operator = ''
let result = '';
let previousResult = ''
let screenNumber = ''


const screen = document.querySelector('.screen-number')
screen.textContent = '0'
const digits = document.querySelector('.digits')
const operators = document.querySelector('.operators')

function prepareDigits() {
    digits.addEventListener('click', (e) => {
        //console.log(e.target.tagName);
        //console.log(e.target.className);
        if (e.target.tagName === 'BUTTON') {
            switch (e.target.className) {
                case 'zero':
                    // Se premo 0 all'inizio non succede niente
                    if (number !== '' && number !== '0' && number.length !== 0) {
                        if(number.length < screenMaxLength){
                            number = number.concat(e.target.textContent);
                            screenNumber = number
                            updateScreen(screenNumber);
                        }
                    }
                    break;
                default:
                    if(number.length < screenMaxLength){

                        if(number === '0'){
                            number = '';
                        }

                        number = number.concat(e.target.textContent);
                        screenNumber = number
                        updateScreen(screenNumber);
                    }
            }
        }
    });
}

function prepareOperators() {

    operators.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {

            switch (e.target.className){
                case 'equal':
                    doTheMath()
                    break;
                case 'clear':
                    clearScreen()
                    break;
                default:
                    if(previousResult.length>0){
                        // SE SONO GIA' ALLA SECONDA OPERAZIONE
                        doTheMath()
                    } else{
                        numberTemp = number
                        number = ''
                        operator = e.target.className;
                        updateScreen(e.target.textContent);
                    }
                    break;
            }
        }
    })
}

function clearScreen() {
    numberTemp = ''
    number = ''
    result = ''
    previousResult = ''
    screenNumber = '0'
    operator = ''
    updateScreen(screenNumber);
}

function doTheMath() {
    if(operator.length > 0){
        if(number.length > 0 && numberTemp.length > 0){
            switch (operator){
                case 'plus':
                    previousResult = (parseInt(number) + parseInt(numberTemp)).toString();
                    number = ''
                    numberTemp = ''
                    result = ''
                    updateScreen(previousResult);
            }
        }
    }
}

function updateScreen(value) {
    screen.textContent = value;
    console.log('- - -')
    console.log('Number',number)
    console.log('NumberTemp',numberTemp)
    console.log('Operator',operator)
    console.log('Result',result)
}

function main() {
    prepareDigits();
    prepareOperators();
}

main();


