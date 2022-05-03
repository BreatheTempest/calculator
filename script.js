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
const equals = document.querySelector('.equals');

let firstNum;
let operationLog = '';
let isSign = false;
let isCalculate = false;
let equation = '';
let secondNum;

function clearFunc() {
	firstNum = '';
	secondNum = '';
	operationLog = '';
	equation = '';
	history.textContent = '';
	display.textContent = '0';
	isSign = false;
	isCalculate = false;
}

clear.addEventListener('click', clearFunc);

function numFunc(num) {
	let tooLong = display.textContent.length === 13;
	if ((num === '.' && display.textContent === '') || isSign) {
		console.log('.');
		display.textContent += '0';
	}
	if (tooLong) alert('Number is too long!');

	if ((display.textContent === '0' && num !== '.') || isSign) {
		display.textContent = '';
		isSign = false;
		isCalculate = false;
	}
	if (isCalculate && num !== '.') {
		let previousAnswer = `${firstNum}${operationLog}${secondNum}=${equation}`;
		clearFunc();
		history.textContent = previousAnswer;
		display.textContent = '';
	}
	if (num !== '.' && !tooLong) display.textContent += num;
	if (num === '.' && !display.textContent.includes('.'))
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
	// } else if (
	// 	display.textContent !== '+' &&
	// 	display.textContent !== '-' &&
	// 	display.textContent !== 'x' &&
	// 	display.textContent !== '÷' &&
	// 	typeof +display.textContent === 'number'
	// ) {
	// 	firstNum = display.textContent;
	// 	history.textContent += firstNum;
	// 	display.textContent = sign;
	// 	operationLog = sign;
	// }
	// if (isSign) {
	// 	history.textContent = history.textContent.slice(
	// 		0,
	// 		history.textContent.length - 1
	// 	);
	// 	operationLog = sign;
	// 	history.textContent += operationLog;
	// }
	if (isCalculate) {
		console.log('after equation');
		firstNum = equation;
		history.textContent = display.textContent + sign;
		operationLog = sign;
		isSign = true;
	}
	if (!isSign) {
		console.log('assign');
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

equals.addEventListener('click', () => {
	if (
		typeof +display.textContent === 'number' &&
		typeof +firstNum === 'number' &&
		operationLog !== '' &&
		!isCalculate
	) {
		calculate();
		isCalculate = true;
		history.textContent += '=';
		equation = display.textContent;
	}
});

// Keyboard input
document.addEventListener('keydown', (e) => {
	let key = e.key;
	if (key === 'Delete') clearFunc();
	if (key.match(/[\d\.]/)) numFunc(key);
	if (key.match(/[\+\-\*\/]/)) {
		if (key === '/') key = '÷';
		if (key === '*') key = 'x';
		signFunc(key);
	}
});
