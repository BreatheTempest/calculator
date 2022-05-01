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
let secondNum;

nums.forEach((num) =>
	num.addEventListener('click', () => {
		if (
			display.textContent === '+' ||
			display.textContent === '-' ||
			display.textContent === 'x' ||
			display.textContent === '÷'
		) {
			display.textContent = '';
			history.textContent += operationLog;
		}

		display.textContent += num.textContent;
	})
);
operations.forEach((operation) =>
	operation.addEventListener('click', () => {
		if (
			display.textContent !== '+' &&
			display.textContent !== '-' &&
			display.textContent !== 'x' &&
			display.textContent !== '÷' &&
			typeof +display.textContent === 'number'
		) {
			firstNum = display.textContent;
			history.textContent += firstNum;
			display.textContent = operation.textContent;
			operationLog = operation.textContent;
		}
	})
);

equals.addEventListener('click', () => {
	let operation;
	if (
		typeof +display.textContent === 'number' &&
		typeof +firstNum === 'number' &&
		operationLog !== ''
	) {
		secondNum = display.textContent;
		history.textContent += secondNum;
		if (operationLog === '+') operation = operate(add, +firstNum, +secondNum);

		if (operationLog === '-')
			operation = operate(subtract, +firstNum, +secondNum);

		if (operationLog === 'x')
			operation = operate(multiply, +firstNum, +secondNum);

		if (operationLog === '÷')
			operation = operate(divide, +firstNum, +secondNum);
		if (!Number.isInteger(operation)) operation = operation.toFixed(2);
		display.textContent = operation;
		history.textContent += '=';
	}
});

clear.addEventListener('click', () => {
	firstNum = '';
	secondNum = '';
	operationLog = '';
	history.textContent = '';
	display.textContent = '';
});
