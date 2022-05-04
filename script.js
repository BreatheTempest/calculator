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
function exponential(num1, num2) {
	let num = num1;
	for (let i = 1; i < num2; i++) {
		num *= num1;
	}
	return num;
}
function operate(func, num1, num2) {
	return func(num1, num2);
}

const nums = document.querySelectorAll('.num');
const operations = document.querySelectorAll('.operation');
const display = document.querySelector('.display');
const history = document.querySelector('.history');
const clear = document.querySelector('.clear');
const deleteKey = document.querySelector('.delete');
const equals = document.querySelector('.equals');

let firstNum = '';
let operationLog = '';
let isSign = false;
let isCalculate = false;
let equation = '';
let secondNum;
let ready = false;

function clearFunc() {
	firstNum = '';
	secondNum = '';
	operationLog = '';
	equation = '';
	history.textContent = '';
	display.textContent = '0';
	isSign = false;
	isCalculate = false;
	ready = false;
}

clear.addEventListener('click', clearFunc);

function numFunc(num) {
	let tooLong = display.textContent.length === 13;
	if (tooLong) alert('Number is too long!');

	if (firstNum !== '') ready = true;

	if ((display.textContent === '0' && num !== '.') || isSign) {
		display.textContent = '';
		isSign = false;
		isCalculate = false;
	}
	if (isCalculate && num) {
		let previousAnswer = `${firstNum}${operationLog}${secondNum}=${equation}`;
		clearFunc();
		history.textContent = previousAnswer;
		display.textContent = '';
	}
	if (num !== '.' && !tooLong) display.textContent += num;

	if (num === '.' && display.textContent === '') {
		display.textContent = '0';
	}

	if (num === '.' && !display.textContent.includes('.') && !tooLong)
		display.textContent += num;
}

nums.forEach((num) =>
	num.addEventListener('click', () => numFunc(num.textContent))
);

function calculate() {
	let operation;
	secondNum = display.textContent;
	history.textContent += secondNum;

	if (operationLog === '+') operation = operate(add, +firstNum, +secondNum);

	if (operationLog === '-')
		operation = operate(subtract, +firstNum, +secondNum);

	if (operationLog === 'x')
		operation = operate(multiply, +firstNum, +secondNum);

	if (operationLog === '÷' && secondNum === '0') {
		alert('Why would you do that?');
		return;
	}

	if (operationLog === '÷') operation = operate(divide, +firstNum, +secondNum);

	if (operationLog === '^')
		operation = operate(exponential, +firstNum, +secondNum);

	if (!Number.isInteger(operation)) {
		operation = Number(operation.toFixed(5));
	}
	display.textContent = operation;
}

function signFunc(sign) {
	if (
		typeof +display.textContent === 'number' &&
		typeof +firstNum === 'number' &&
		operationLog !== '' &&
		!isCalculate &&
		!isSign
	) {
		calculate();
		isCalculate = true;
		history.textContent += sign;
		equation = display.textContent;
	}

	if (isCalculate) {
		firstNum = equation;
		history.textContent = display.textContent + sign;
		operationLog = sign;
		isSign = true;
	}

	if (isSign) {
		history.textContent = display.textContent + sign;
		operationLog = sign;
	}

	if (!isSign) {
		history.textContent = '';
		firstNum = display.textContent;
		history.textContent += firstNum + sign;
		operationLog = sign;
		isSign = true;
	}
}

operations.forEach((operation) =>
	operation.addEventListener('click', () => signFunc(operation.textContent))
);

function equalsFunc() {
	if (
		typeof +display.textContent === 'number' &&
		typeof +firstNum === 'number' &&
		operationLog !== '' &&
		!isCalculate &&
		ready
	) {
		calculate();
		isCalculate = true;
		history.textContent += '=';
		equation = display.textContent;
		console.log(firstNum, operationLog, secondNum, '=', equation);
	}
}

equals.addEventListener('click', equalsFunc);

function deleteNum() {
	display.textContent = display.textContent
		.split('')
		.splice(0, display.textContent.length - 1)
		.join('');
	if (display.textContent === '' || display.textContent === '-')
		display.textContent = 0;
}

deleteKey.addEventListener('click', deleteNum);

// Keyboard input
document.addEventListener('keydown', (e) => {
	let key = e.key;
	if (key === 'Delete') clearFunc();
	if (key.match(/[\d\.]/)) numFunc(key);
	if (key.match(/[\+\-\*\/^]/)) {
		if (key === '/') key = '÷';
		if (key === '*') key = 'x';
		signFunc(key);
	}
	if (key === '=') equalsFunc();
	if (key === 'Backspace') deleteNum();
});
