const displayHead = document.querySelector('.head');
const display = document.querySelector('.main');
const buttons = document.querySelectorAll('.btn');

buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
        characterAssessment(button.innerHTML)
    });
});
document.addEventListener('keydown', (e) => {
    characterAssessment(e.key)
})

function characterAssessment(char) {
    list = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    if (char in list) calculator(char, "num");
    else if (char == '.') calculator('.', "num");

    else if (char == '%') calculator('%', "operator");
    else if (char == '+') calculator('+', "operator");
    else if (char == '-') calculator('-', "operator");
    else if (char == '*') calculator('*', "operator");
    else if (char == '/') calculator('/', "operator");
    else if (char == '×') calculator('*', "operator");
    else if (char == '÷') calculator('/', "operator");

    else if (char == '=') calculator('=', "equal");
    else if (char == 'Enter') calculator('=', "equal");

    else if (char == 'AC') control('AC', "control");
    else if (char == 'DEL') control('DEL', "control");
    else if (char == 'Backspace') control('DEL', "control");

    else if (char == '+/-') sign();
}
let flag = 1;
let num1 = "";
let operator = "";
let num2 = "";

function calculator(char, type) {
    if (num1.length + num2.length > 8) return;
    if (type == "num" && flag == 1 && char == '.') {
        if (num1 == '' || num1 == '-') {
            char = '0.';
        }
    } else if (type == "num" && flag == 0 && char == '.') {
        if (num2 == '' || num2 == '-') {
            char = '0.';
        }
    }

    if (type == "num" && flag == 1) num1 += char;
    else if (type == "num" && flag == 0) num2 += char;
    else if (type == "operator" && flag == 1) {
        if (num1 != "") {
            operator = char;
            flag = 0;
        } else if (char == '-') {
            num1 += char;
        }
    }
    else if (type == "operator" && flag == 0) {
        if (num1[num1.length - 1] == '.') num1 = num1.slice(0, -1);
        if (num2[num2.length - 1] == '.') num2 = num2.slice(0, -1);
        if (num2 == '') {
            operator = char;
        } else {
            changeDisplayHead()
            if (operator == '+') num1 = add(parseFloat(num1), parseFloat(num2));
            if (operator == '-') num1 = subtract(parseFloat(num1), parseFloat(num2));
            if (operator == '*') num1 = multiply(parseFloat(num1), parseFloat(num2));
            if (operator == '/') num1 = divide(parseFloat(num1), parseFloat(num2));
            if (operator == '%') num1 = remainder(parseFloat(num1), parseFloat(num2));
            operator = char;
            num2 = '';
        }


    }
    else if (type == "equal" && flag == 1) { return }
    else if (type == "equal" && flag == 0) {
        if (num1[num1.length - 1] == '.') num1 = num1.slice(0, -1);
        if (num2[num2.length - 1] == '.') num2 = num2.slice(0, -1);
        if (num2 != '') {
            changeDisplayHead()
            if (operator == '+') num1 = add(parseFloat(num1), parseFloat(num2));
            if (operator == '-') num1 = subtract(parseFloat(num1), parseFloat(num2));
            if (operator == '*') num1 = multiply(parseFloat(num1), parseFloat(num2));
            if (operator == '/') num1 = divide(parseFloat(num1), parseFloat(num2));
            if (operator == '%') num1 = remainder(parseFloat(num1), parseFloat(num2));
            operator = '';
            num2 = '';
            flag = 1;
        }
    }
    changeDisplay()
}

function control(char, type) {
    if (type == "control" && flag == 1) {
        if (char == 'AC') {
            num1 = '';
            operator = '';
            num2 = '';
            flag = 1;
            changeDisplayHead()
        } else if (char == 'DEL') {
            num1 = num1.slice(0, -1);
        }
    }
    else if (type == "control" && flag == 0) {
        if (char == 'AC') {
            num1 = '';
            operator = '';
            num2 = '';
            flag = 1;
            changeDisplayHead()
        } else if (char == 'DEL') {
            if (num2 == '') {
                operator = ''
                flag = 1;
            } else {
                num2 = num2.slice(0, -1)
            }
        }
    }
    changeDisplay()
}

function sign() {
    if (flag == 1) {
        if (num1[0] == '-') {
            num1 = num1.slice(1);
        } else {
            num1 = '-' + num1;
        }
    } else if (flag == 0) {
        if (num2[0] == '-') {
            num2 = num2.slice(1)
        } else {
            num2 = '-' + num2;
        }

    }
    changeDisplay()
}

const add = (n, m) => { return parseFloat((n + m).toFixed(3)) }
const subtract = (n, m) => { return parseFloat((n - m).toFixed(3)) }
const multiply = (n, m) => { return parseFloat((n * m).toFixed(3)) }
const divide = (n, m) => { return parseFloat((n / m).toFixed(3)) }
const remainder = (n, m) => { return parseFloat((n % m).toFixed(3)) }


function changeDisplay() {
    let displayOperator = operator;
    if (operator == '/') displayOperator = '÷';
    if (operator == '*') displayOperator = '×';
    display.innerHTML = `${num1}${displayOperator}${num2}`;
}
function changeDisplayHead() {
    let displayOperator = operator;
    if (operator == '/') displayOperator = '÷';
    if (operator == '*') displayOperator = '×';
    displayHead.innerHTML = `${num1}${displayOperator}${num2}`;
}


