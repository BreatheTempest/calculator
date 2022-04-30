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
console.log(operate(add, 4, 5));

const nums = document.querySelectorAll('.num');
const display = document.querySelector('.display');

let firstNum;
let operation;
let secondNum;

nums.forEach((num) =>
	num.addEventListener('click', () => {
		firstNum = num.textContent;
		display.textContent += num.textContent;
	})
);
