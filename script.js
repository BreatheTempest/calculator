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
let secondNum;

nums.forEach((num) =>
	num.addEventListener('click', () => {
		// if (
		// 	display.textContent === '+' ||
		// 	display.textContent === '-' ||
		// 	display.textContent === 'x' ||
		// 	display.textContent === '÷'
		// ) {
		// 	display.textContent = '';
		// 	history.textContent += operationLog;
		// }
		if ((display.textContent === '0' && num.textContent !== '.') || isSign) {
			display.textContent = '';
			isSign = false;
			isCalculate = false;
		}
		display.textContent += num.textContent;
	})
);

operations.forEach((operation) =>
	operation.addEventListener('click', () => {
		// if (
		// 	typeof +display.textContent === 'number' &&
		// 	typeof +firstNum === 'number' &&
		// 	operationLog !== ''
		// ) {
		// 	calculate();
		// } else if (
		// 	display.textContent !== '+' &&
		// 	display.textContent !== '-' &&
		// 	display.textContent !== 'x' &&
		// 	display.textContent !== '÷' &&
		// 	typeof +display.textContent === 'number'
		// ) {
		// 	firstNum = display.textContent;
		// 	history.textContent += firstNum;
		// 	display.textContent = operation.textContent;
		// 	operationLog = operation.textContent;
		// }
		if (!isSign) {
			firstNum = display.textContent;
			history.textContent += firstNum + operation.textContent;
			operationLog = operation.textContent;
			isSign = true;
		}
	})
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
	}
});

clear.addEventListener('click', () => {
	firstNum = '';
	secondNum = '';
	operationLog = '';
	history.textContent = '';
	display.textContent = '0';
});

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
	if (!Number.isInteger(operation)) operation = operation.toFixed(2);
	display.textContent = operation;
}
